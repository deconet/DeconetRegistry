async function startApp() {
    // Check For correct Network
    await checkNetwork();
    // Configure the ABIs
    await initDApp();
    // Get the Required Account Details
    await fetchAccountDetails();
    // Get my current Voting Rights
    await getMyVotingRights();
    // Subscribe To Voting Events
    // await subscribeToVotingEvents();
}

// Get my current Voting Rights

async function getMyVotingRights() {
    let walletETHBalance = await getVotingTokenBalance(walletAddress);
    document.getElementById('myVotingRights').innerHTML = walletETHBalance;
}

// Get Voting Token Balance

function getVotingTokenBalance(voterAddress) {
    return new Promise(resolve => {
        PLCRVotingContract.methods.voteTokenBalance(voterAddress).call((error, result) => {
            if (!error) {
                console.log(web3.utils.fromWei(result, "ether"));
                resolve(web3.utils.fromWei(result, "ether"));
            } else {
                resolve(error);
            }
        });
    });
}

// Approve to spend the tokens

function doDCOSpendApprovalToPLCRVotingContract(tokenValue) {
    return new Promise(resolve => {
        DeconetTokenContract.methods.approve(PLCRVotingContractAddress, tokenValue).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

// Get Voting Rights

function requestVotingRights(tokensToRequestVoting) {
    return new Promise(resolve => {
        PLCRVotingContract.methods.requestVotingRights(tokensToRequestVoting).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function getVotingRights() {
    let tokenToGetVotingRights = document.getElementById('tokenAmountToGetVotingRights').value;
    let tokenToGetVotingRightsInDecoWei = web3.utils.toWei(tokenToGetVotingRights, "ether");
    let tokenSpendApproval = await doDCOSpendApprovalToPLCRVotingContract(tokenToGetVotingRightsInDecoWei);
    let getVotingRightsResponse = await requestVotingRights(tokenToGetVotingRightsInDecoWei);
    document.getElementById('getVotingRightsResponse').innerHTML = getVotingRightsResponse;
}

// Revoke Voting Rights

function withdrawVotingRights(tokensToRevokeVoting) {
    return new Promise(resolve => {
        PLCRVotingContract.methods.withdrawVotingRights(tokensToRevokeVoting).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function revokeVotingRights() {
    let tokenToRevokeVotingRights = document.getElementById('tokenAmountToRevokeVotingRights').value;
    let tokenToRevokeVotingRightsInDecoWei = web3.utils.toWei(tokenToRevokeVotingRights, "ether");
    let tokenSpendApproval = await doDCOSpendApprovalToPLCRVotingContract(tokenToRevokeVotingRightsInDecoWei);
    let revokeVotingRightsResponse = await withdrawVotingRights(tokenToRevokeVotingRightsInDecoWei);
    document.getElementById('revokeVotingRightsResponse').innerHTML = revokeVotingRightsResponse;
}

// Called by a voter to claim their reward for each completed vote. updateStatus() must have been called earlier

function claimRewardByChallengeID(challengeID, salt) {
    return new Promise(resolve => {
        RegistryContract.methods.claimReward(challengeID, salt).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function voterCanClaimReward() {
    let challengeIDToClaimReward = document.getElementById('challengeIDToClaimReward').value;
    let saltToClaimReward = document.getElementById('saltToClaimReward').value;
    let claimRewardResponse = await claimRewardByChallengeID(challengeIDToClaimReward, saltToClaimReward);
    document.getElementById('claimRewardResponse').innerHTML = claimRewardResponse;
}

// Called by a voter to commit his vote

function commitVoteByChallengeID(challengeIDToVote, secretHashForVoting, tokenPledgedForVote, previousPollID) {
    return new Promise(resolve => {
        PLCRVotingContract.methods.commitVote(challengeIDToVote, secretHashForVoting, tokenPledgedForVote, previousPollID).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function usersCanCommitVote() {
    let challengeIDToVote = document.getElementById('challengeIDToVote').value;
    let voteOption = document.querySelector('input[name="PLCRVoting"]:checked').value;
    let secretPinForVote = document.getElementById('scretKeyToCommitVote').value;
    let tokenPledgedForVote = document.getElementById('tokenAmountToCommitVote').value;
    let previousPollID = document.getElementById('previousPollID').value;
    
    if (previousPollID === '') {
        console.log("No Previous Poll ID");
        previousPollID = 0;
    } else {
        console.log("Previous Poll ID exists");
    }

    let secretHashForVoting = 0x0;
    if(voteOption === "Y") {
        console.log("I Support Whitelisting this Module!");
        secretHashForVoting = web3.utils.sha3("1", secretPinForVote);
    } else if(voteOption === "N") {
        console.log("I'm against Whitelisting this Module!");
        secretHashForVoting = web3.utils.sha3("0", secretPinForVote);
    } else {
        console.log("Select a Valid Option!");
        alert("Select a Valid Option!");
    }

    let tokenAmountToGetVotingRightsInDecoWei = web3.utils.toWei(tokenPledgedForVote, "ether");
    let usersCanCommitVoteResponse = await commitVoteByChallengeID(challengeIDToVote, secretHashForVoting, tokenAmountToGetVotingRightsInDecoWei, previousPollID);
    document.getElementById('usersCanCommitVoteResponse').innerHTML = usersCanCommitVoteResponse;
}