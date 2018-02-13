pragma solidity ^0.4.18;

import "./lib/tokens/contracts/eip20/EIP20.sol";
import "./Parameterizer.sol";
import "./PLCRVoting.sol";

contract Registry {

    // ------
    // EVENTS
    // ------

    event _Application(string  indexed moduleName, uint indexed deposit, string data);
    event _Challenge(string  indexed moduleName, uint indexed deposit, uint indexed pollID, string data);
    event _Deposit(string  indexed moduleName, uint indexed added, uint indexed newTotal);
    event _Withdrawal(string  indexed moduleName, uint indexed withdrew, uint indexed newTotal);
    event _NewListingWhitelisted(string  indexed moduleName);
    event _ApplicationRemoved(string  indexed moduleName);
    event _ListingRemoved(string  indexed moduleName);
    event _ChallengeFailed(uint indexed challengeID);
    event _ChallengeSucceeded(uint indexed challengeID);
    event _RewardClaimed(address indexed voter, uint indexed challengeID, uint indexed reward);

    struct Listing {
        uint applicationExpiry; // Expiration date of apply stage
        bool whitelisted;       // Indicates registry status
        address owner;          // Owner of Listing
        uint unstakedDeposit;   // Number of tokens in the listing not locked in a challenge
        uint challengeID;       // Corresponds to a PollID in PLCRVoting
    }

    struct Challenge {
        uint rewardPool;        // (remaining) Pool of tokens to be distributed to winning voters
        address challenger;     // Owner of Challenge
        bool resolved;          // Indication of if challenge is resolved
        uint stake;             // Number of tokens at stake for either party during challenge
        uint totalTokens;       // (remaining) Number of tokens used in voting by the winning side
        mapping(address => bool) tokenClaims; // Indicates whether a voter has claimed a reward yet
    }

    // Maps challengeIDs to associated challenge data
    mapping(uint => Challenge) public challenges;

    // Maps moduleHash to associated moduleName data
    mapping(bytes32 => Listing) public listings;

    // Global Variables
    EIP20 public token;
    PLCRVoting public voting;
    Parameterizer public parameterizer;
    string public version = "1";

    // ------------
    // CONSTRUCTOR:
    // ------------

    /**
    @dev Contructor         Sets the addresses for token, voting, and parameterizer
    @param _tokenAddr       Address of the TCR's intrinsic ERC20 token
    @param _plcrAddr        Address of a PLCR voting contract for the provided token
    @param _paramsAddr      Address of a Parameterizer contract 
    */
    function Registry(address _tokenAddr, address _plcrAddr, address _paramsAddr) public {
        token = EIP20(_tokenAddr);
        voting = PLCRVoting(_plcrAddr);
        parameterizer = Parameterizer(_paramsAddr);
    }

    // --------------------
    // PUBLISHER INTERFACE:
    // --------------------

    /**
    @dev                Allows a user to start an application. Takes tokens from user and sets apply stage end time.
    @param _moduleName  The moduleName of a potential listing a user is applying to add to the registry
    @param _amount      The number of ERC20 tokens a user is willing to potentially stake
    @param _data        Extra data relevant to the application. Think IPFS hashes.
    */
    function apply(string _moduleName, uint _amount, string _data) external {
        require(token.balanceOf(msg.sender) >= _amount);
        require(!isWhitelisted(_moduleName));
        require(!appWasMade(_moduleName));
        require(_amount >= parameterizer.get("minDeposit"));

        // Sets owner
        Listing storage listing = listings[keccak256(_moduleName)];
        listing.owner = msg.sender;

        // Transfers tokens from user to Registry contract
        require(token.transferFrom(listing.owner, this, _amount));

        // Sets apply stage end time
        listing.applicationExpiry = block.timestamp + parameterizer.get("applyStageLen");
        listing.unstakedDeposit = _amount;

        _Application(_moduleName, _amount, _data);
    }

    /**
    @dev                Allows the owner of a moduleName to increase their unstaked deposit.
    @param _moduleName  A moduleName msg.sender is the owner of
    @param _amount      The number of ERC20 tokens to increase a user's unstaked deposit
    */
    function deposit(string _moduleName, uint _amount) external {
        Listing storage listing = listings[keccak256(_moduleName)];

        require(listing.owner == msg.sender);
        require(token.transferFrom(msg.sender, this, _amount));

        listing.unstakedDeposit += _amount;

        _Deposit(_moduleName, _amount, listing.unstakedDeposit);
    }

    /**
    @dev                Allows the owner of a moduleName to decrease their unstaked deposit.
    @param _moduleName  A moduleName msg.sender is the owner of.
    @param _amount      The number of ERC20 tokens to withdraw from the unstaked deposit.
    */
    function withdraw(string _moduleName, uint _amount) external {
        Listing storage listing = listings[keccak256(_moduleName)];

        require(listing.owner == msg.sender);
        require(_amount <= listing.unstakedDeposit);
        require(listing.unstakedDeposit - _amount >= parameterizer.get("minDeposit"));

        require(token.transfer(msg.sender, _amount));

        listing.unstakedDeposit -= _amount;

        _Withdrawal(_moduleName, _amount, listing.unstakedDeposit);
    }

    /**
    @dev                Allows the owner of a moduleName to remove the moduleName from the whitelist
                        Returns all tokens to the owner of the moduleName
    @param _moduleName  A moduleName msg.sender is the owner of.
    */
    function exit(string _moduleName) external {
        Listing storage listing = listings[keccak256(_moduleName)];

        require(msg.sender == listing.owner);
        require(isWhitelisted(_moduleName));

        // Cannot exit during ongoing challenge
        require(listing.challengeID == 0 || challenges[listing.challengeID].resolved);

        // Remove moduleName & return tokens
        resetListing(_moduleName);
    }

    // -----------------------
    // TOKEN HOLDER INTERFACE:
    // -----------------------

    /**
    @dev                Starts a poll for a moduleName which is either in the apply stage or
                        already in the whitelist. Tokens are taken from the challenger and the
                        applicant's deposits are locked.
    @param _moduleName  The moduleName being challenged, whether listed or in application
    @param _data        Extra data relevant to the challenge. Think IPFS hashes.
    */
    function challenge(string _moduleName, string _data) external returns (uint challengeID) {
        Listing storage listing = listings[keccak256(_moduleName)];
        uint deposit = parameterizer.get("minDeposit");

        // Listing must be in apply stage or already on the whitelist
        require(appWasMade(_moduleName) || listing.whitelisted);
        // Prevent multiple challenges
        require(listing.challengeID == 0 || challenges[listing.challengeID].resolved);

        if (listing.unstakedDeposit < deposit) {
            // Not enough tokens, moduleName auto-delisted
            resetListing(_moduleName);
            return 0;
        }

        // Takes tokens from challenger
        require(token.transferFrom(msg.sender, this, deposit));

        // Starts poll
        uint pollID = voting.startPoll(
            parameterizer.get("voteQuorum"),
            parameterizer.get("commitStageLen"),
            parameterizer.get("revealStageLen")
        );

        challenges[pollID] = Challenge({
            challenger: msg.sender,
            rewardPool: ((100 - parameterizer.get("dispensationPct")) * deposit) / 100,
            stake: deposit,
            resolved: false,
            totalTokens: 0
        });

        // Updates moduleName to store most recent challenge
        listing.challengeID = pollID;

        // Locks tokens for moduleName during challenge
        listing.unstakedDeposit -= deposit;

        _Challenge(_moduleName, deposit, pollID, _data);
        return pollID;
    }

    /**
    @dev                Updates a moduleName's status from 'application' to 'listing' or resolves a challenge if one exists.
    @param _moduleName  The moduleName whose status is being updated
    */
    function updateStatus(string _moduleName) public {
        if (canBeWhitelisted(_moduleName)) {
            whitelistApplication(_moduleName);
            _NewListingWhitelisted(_moduleName);
        } else if (challengeCanBeResolved(_moduleName)) {
            resolveChallenge(_moduleName);
        } else {
            revert();
        }
    }

    // ----------------
    // TOKEN FUNCTIONS:
    // ----------------

    /**
    @dev                Called by a voter to claim their reward for each completed vote. Someone must call updateStatus() before this can be called.
    @param _challengeID The PLCR pollID of the challenge a reward is being claimed for
    @param _salt        The salt of a voter's commit hash in the given poll
    */
    function claimReward(uint _challengeID, uint _salt) public {
        // Ensures the voter has not already claimed tokens and challenge results have been processed
        require(challenges[_challengeID].tokenClaims[msg.sender] == false);
        require(challenges[_challengeID].resolved == true);

        uint voterTokens = voting.getNumPassingTokens(msg.sender, _challengeID, _salt);
        uint reward = voterReward(msg.sender, _challengeID, _salt);

        // Subtracts the voter's information to preserve the participation ratios
        // of other voters compared to the remaining pool of rewards
        challenges[_challengeID].totalTokens -= voterTokens;
        challenges[_challengeID].rewardPool -= reward;

        require(token.transfer(msg.sender, reward));

        // Ensures a voter cannot claim tokens again
        challenges[_challengeID].tokenClaims[msg.sender] = true;

        _RewardClaimed(msg.sender, _challengeID, reward);
    }

    // --------
    // GETTERS:
    // --------

    /**
    @dev                Calculates the provided voter's token reward for the given poll.
    @param _voter       The address of the voter whose reward balance is to be returned
    @param _challengeID The pollID of the challenge a reward balance is being queried for
    @param _salt        The salt of the voter's commit hash in the given poll
    @return             The uint indicating the voter's reward
    */
    function voterReward(address _voter, uint _challengeID, uint _salt) public view returns (uint) {
        uint totalTokens = challenges[_challengeID].totalTokens;
        uint rewardPool = challenges[_challengeID].rewardPool;
        uint voterTokens = voting.getNumPassingTokens(_voter, _challengeID, _salt);
        return (voterTokens * rewardPool) / totalTokens;
    }

    /**
    @dev                Determines whether the given moduleName be whitelisted.
    @param _moduleName  The moduleName whose status is to be examined
    */
    function canBeWhitelisted(string _moduleName) view public returns (bool) {
        bytes32 moduleNameHash = keccak256(_moduleName);
        uint challengeID = listings[moduleNameHash].challengeID;

        // Ensures that the application was made,
        // the application period has ended,
        // the moduleName can be whitelisted,
        // and either: the challengeID == 0, or the challenge has been resolved.
        if (appWasMade(_moduleName) && listings[moduleNameHash].applicationExpiry < now && !isWhitelisted(_moduleName) && (challengeID == 0 || challenges[challengeID].resolved == true)) { 
            return true;
        }

        return false;
    }

    /**
    @dev                Returns true if the provided moduleName is whitelisted
    @param _moduleName  The moduleName whose status is to be examined
    */
    function isWhitelisted(string _moduleName) view public returns (bool whitelisted) {
        return listings[keccak256(_moduleName)].whitelisted;
    }

    /**
    @dev                Returns true if apply was called for this moduleName
    @param _moduleName  The moduleName whose status is to be examined
    */
    function appWasMade(string _moduleName) view public returns (bool exists) {
        return listings[keccak256(_moduleName)].applicationExpiry > 0;
    }

    /**
    @dev                Returns true if the application/moduleName has an unresolved challenge
    @param _moduleName  The moduleName whose status is to be examined
    */
    function challengeExists(string _moduleName) view public returns (bool) {
        uint challengeID = listings[keccak256(_moduleName)].challengeID;
        return (listings[keccak256(_moduleName)].challengeID > 0 && !challenges[challengeID].resolved);
    }

    /**
    @dev                Determines whether voting has concluded in a challenge for a given moduleName. Throws if no challenge exists.
    @param _moduleName  A moduleName with an unresolved challenge
    */
    function challengeCanBeResolved(string _moduleName) view public returns (bool) {
        uint challengeID = listings[keccak256(_moduleName)].challengeID;
        require(challengeExists(_moduleName));
        return voting.pollEnded(challengeID);
    }

    /**
    @dev                Determines the number of tokens awarded to the winning party in a challenge.
    @param _challengeID The challengeID to determine a reward for
    */
    function determineReward(uint _challengeID) public view returns (uint) {
        require(!challenges[_challengeID].resolved && voting.pollEnded(_challengeID));

        // Edge case, nobody voted, give all tokens to the challenger.
        if (voting.getTotalNumberOfTokensForWinningOption(_challengeID) == 0) {
            return 2 * challenges[_challengeID].stake;
        }

        return (2 * challenges[_challengeID].stake) - challenges[_challengeID].rewardPool;
    }

    /**
    @dev                Getter for Challenge tokenClaims mappings
    @param _challengeID The challengeID to query
    @param _voter       The voter whose claim status to query for the provided challengeID
    */
    function tokenClaims(uint _challengeID, address _voter) public view returns (bool) {
        return challenges[_challengeID].tokenClaims[_voter];
    }

    // ----------------
    // PRIVATE FUNCTIONS:
    // ----------------

    /**
    @dev                Determines the winner in a challenge. Rewards the winner tokens and
                        either whitelists or de-whitelists the moduleName.
    @param _moduleName A moduleName with a challenge that is to be resolved
    */
    function resolveChallenge(string _moduleName) private {
        uint challengeID = listings[keccak256(_moduleName)].challengeID;

        // Calculates the winner's reward, which is:
        // (winner's full stake) + (dispensationPct * loser's stake)
        uint reward = determineReward(challengeID);

        // Records whether the moduleName is a moduleName or an application
        bool wasWhitelisted = isWhitelisted(_moduleName);

        // Case: challenge failed
        if (voting.isPassed(challengeID)) {
            whitelistApplication(_moduleName);
            // Unlock stake so that it can be retrieved by the applicant
            listings[keccak256(_moduleName)].unstakedDeposit += reward;

            _ChallengeFailed(challengeID);
            if (!wasWhitelisted) {
                _NewListingWhitelisted(_moduleName);
            }
        } else {
            // Case: challenge succeeded
            resetListing(_moduleName);
            // Transfer the reward to the challenger
            require(token.transfer(challenges[challengeID].challenger, reward));

            _ChallengeSucceeded(challengeID);
            if (wasWhitelisted) {
                _ListingRemoved(_moduleName);
            } else { 
                _ApplicationRemoved(_moduleName);
            }
        }

        // Sets flag on challenge being processed
        challenges[challengeID].resolved = true;

        // Stores the total tokens used for voting by the winning side for reward purposes
        challenges[challengeID].totalTokens = voting.getTotalNumberOfTokensForWinningOption(challengeID);
    }

    /**
    @dev                Called by updateStatus() if the applicationExpiry date passed without a
                        challenge being made. Called by resolveChallenge() if an
                        application/listing beat a challenge.
    @param _moduleName  The moduleName of an application/moduleName to be whitelisted
    */
    function whitelistApplication(string _moduleName) private {
        listings[keccak256(_moduleName)].whitelisted = true;
    }

    /**
    @dev                Deletes a moduleName from the whitelist and transfers tokens back to owner
    @param _moduleName  The listing hash to delete
    */
    function resetListing(string _moduleName) private {
        Listing storage listing = listings[keccak256(_moduleName)];

        // Transfers any remaining balance back to the owner
        if (listing.unstakedDeposit > 0)
            require(token.transfer(listing.owner, listing.unstakedDeposit));

        delete listings[keccak256(_moduleName)];
    }
}