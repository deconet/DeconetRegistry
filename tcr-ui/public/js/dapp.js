$(document).foundation()

// Inject our version (1.0.0-beta.33) of web3.js into the DApp.
window.addEventListener('load', function () {
    // Checking if Web3 provider is available (Mist/MetaMask)
    if (typeof Web3.givenProvider !== 'undefined') {
        web3 = new Web3(Web3.givenProvider || web3.currentProvider);
        console.log('Using Web3 Version:', web3.version);
        if(web3._provider.isMetaMask) {
            // Check if Metamask is available
            console.log('Got MetaMask! Hurray');
            startApp();
        }
    } else {
        console.log('Please Use Metamask extension to transact in ETH.');
        document.getElementById('meta-mask-required').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example'
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        // web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws'));
    }
})

function checkNetwork() {
    web3.eth.net.getNetworkType((err, netId) => {
        switch (netId) {
            case "main":    console.log('The Mainnet');
                            break
            case "ropsten": console.log('Ropsten Test Network');
                            break
            case "kovan":   console.log('Kovan Test Network');
                            break
            case "rinkeby": console.log('Rinkeby Test Network');
                            break
            default:        console.log('This is an Unknown Network');
        }
        if (netId != "ropsten") {
            alert("Please connect to Ropsten Testnet to Continue!");
        } else {
            console.log("Connected to Ropsten Testnet! Yeah!!");
        }
    });
}

async function initDApp() {
    let coinbaseAccount = await getCoinbase();
    window.walletAddress = coinbaseAccount;
    window.DeconetTokenContract = new web3.eth.Contract(DeconetTokenContractABI, DeconetTokenContractAddress, {
        from: coinbaseAccount,
        gasPrice: '20000000000'                 // default gas price in wei, 20 gwei in this case
    });
    window.RegistryContract = new web3.eth.Contract(RegistryContractABI, RegistryContractAddress, {
        from: coinbaseAccount,
        gasPrice: '20000000000'                 // default gas price in wei, 20 gwei in this case
    });
    window.ParameterizerContract = new web3.eth.Contract(ParameterizerContractABI, ParameterizerContractAddress, {
        from: coinbaseAccount,
        gasPrice: '20000000000'                 // default gas price in wei, 20 gwei in this case
    });
}

function getETHBalance() {
    return new Promise(resolve => {
        web3.eth.getBalance(walletAddress, (error, result) => {
            if (!error) {
                console.log(web3.utils.fromWei(result, "ether"));
                resolve(web3.utils.fromWei(result, "ether"));
            } else {
                resolve(error);
            }
        });
    });
}

function getDCOBalance() {
    return new Promise(resolve => {
        DeconetTokenContract.methods.balanceOf(walletAddress).call((error, result) => {
            if (!error) {
                console.log(web3.utils.fromWei(result, "ether"));
                resolve(web3.utils.fromWei(result, "ether"));
            } else {
                resolve(error);
            }
        });
    });
}

function checkDCOSpendAllowance() {
    return new Promise(resolve => {
        DeconetTokenContract.methods.allowance(walletAddress, RegistryContractAddress).call((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

function getCoinbase() {
    return new Promise(resolve => {
        web3.eth.getCoinbase((error, result) => {
            if (!error) {
                console.log("Coinbase: "+result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function fetchAccountDetails() {
    document.getElementById('accountAddress').innerHTML = walletAddress;
    let walletETHBalance = await getETHBalance();
    document.getElementById('etherBalance').innerHTML = walletETHBalance;
    let walletDCOBalance = await getDCOBalance();
    document.getElementById('tokenBalance').innerHTML = walletDCOBalance;
    let allowanceValue = await checkDCOSpendAllowance();
    console.log("Allowance Value: " + web3.utils.fromWei(allowanceValue, "ether"));
}

function subscribeToEvents() {
    RegistryContract.getPastEvents('_Application', {
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events) {
        console.log(events);
    }).then(function(events) {
        document.getElementById('_Application').innerHTML = JSON.stringify(events[0].returnValues);
    });
    
    // RegistryContract.events._Application({fromBlock: 0}, function(error, event) {
    //     console.log(event);
    // });
}

async function startApp() {
    // Check For correct Network
    await checkNetwork();
    // Configure the ABIs
    await initDApp();
    // Get the Required Account Details
    await fetchAccountDetails();
    // Subscribe To Events
    await subscribeToEvents();
}

async function checkTokenBalance() {
    let balanceAddress = document.getElementById('balanceAddress').value;
    let walletDCOBalance = await getDCOBalance(balanceAddress);
    document.getElementById('balanceResponse').innerHTML = walletDCOBalance;
}

function doDCOSpendApproval(tokenValue) {
    return new Promise(resolve => {
        DeconetTokenContract.methods.approve(RegistryContractAddress, tokenValue).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

function applyForListing(moduleName, tokenPledged, moduleDetails) {
    return new Promise(resolve => {
        RegistryContract.methods.apply(moduleName, tokenPledged, moduleDetails).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

// Application to the Deconet Modules Registry 
async function applyToRegistry() {
    let moduleName = document.getElementById('moduleName').value;
    let listingHash = web3.utils.sha3(moduleName);
    console.log("ListingHash: "+listingHash);
    let tokensPledged = document.getElementById('tokensPledged').value;
    let moduleDetails = document.getElementById('moduleDetails').value;
    let tokensPledgedInDecoWei = web3.utils.toWei(tokensPledged, "ether");
    console.log(tokensPledgedInDecoWei);
    let tokenSpendApproval = await doDCOSpendApproval(tokensPledgedInDecoWei);
    let applyResponse = await applyForListing(listingHash, tokensPledgedInDecoWei, moduleDetails);
    document.getElementById('applicationResponse').innerHTML = applyResponse;
}

// Create A Challenge for a given moduleName

function checkMinimumTokensRequiredToChallenge() {
    return new Promise(resolve => {
        ParameterizerContract.methods.get("minDeposit").call((error, result) => {
            if (!error) {
                console.log(result.toString());
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

function doChallenge(moduleName, challengeData) {
    return new Promise(resolve => {
        RegistryContract.methods.challenge(moduleName, challengeData).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function createChallenge() {
    let moduleNameToChallenge = document.getElementById('moduleNameToChallenge').value;
    let listingHashToChallenge = web3.utils.sha3(moduleNameToChallenge);
    let detailsForChallenge = document.getElementById('moduleDataToChallenge').value;
    let requiredTokensToChallengeInDecoWei = await checkMinimumTokensRequiredToChallenge();
    let tokenSpendApproval = await doDCOSpendApproval(requiredTokensToChallengeInDecoWei);
    let doChallengeResponse = await doChallenge(listingHashToChallenge, detailsForChallenge);
    document.getElementById('doChallengeResponse').innerHTML = doChallengeResponse;
}

// Deposit

function doDeposit(moduleName, tokenAmount) {
    return new Promise(resolve => {
        RegistryContract.methods.deposit(moduleName, tokenAmount).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function increaseUnstakedDeposit() {
    let moduleNameToIncreaseUnstakedDeposit = document.getElementById('moduleNameToIncreaseDeposit').value;
    let listingHashToIncreaseUnstakedDeposit = web3.utils.sha3(moduleNameToIncreaseUnstakedDeposit);
    let tokenAmountToDeposit = document.getElementById('tokenAmountToIncreaseDeposit').value;
    let tokenAmountToDepositInDecoWei = web3.utils.toWei(tokenAmountToDeposit, "ether");
    let tokenSpendApproval = await doDCOSpendApproval(tokenAmountToDepositInDecoWei);
    console.log("Token Spend Approval Response: "+ tokenSpendApproval);
    let increaseUnstakedDepositResponse = await doDeposit(listingHashToIncreaseUnstakedDeposit, tokenAmountToDepositInDecoWei);
    document.getElementById('increaseUnstakedDepositResponse').innerHTML = increaseUnstakedDepositResponse;
}

// Withdraw

function doWithdraw(moduleName, tokenAmount) {
    return new Promise(resolve => {
        RegistryContract.methods.withdraw(moduleName, tokenAmount).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function withdrawDeposit() {
    let moduleNameToWithdrawDeposit = document.getElementById('moduleNameToWithdrawDeposit').value;
    let listingHashToWithdrawDeposit = web3.utils.sha3(moduleNameToWithdrawDeposit);
    let tokenAmountToWithdraw = document.getElementById('tokenAmountToWithdraw').value;
    let tokenAmountToWithdrawInDecoWei = web3.utils.toWei(tokenAmountToWithdraw, "ether");
    // Check Parameterizer MinDeposit
    // console.log("Token Spend Approval Response: "+ tokenSpendApproval);
    let withdrawDepositResponse = await doWithdraw(listingHashToWithdrawDeposit, tokenAmountToWithdrawInDecoWei);
    document.getElementById('withdrawDepositResponse').innerHTML = withdrawDepositResponse;
}

// Exit

function doExit(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.exit(moduleName).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function exitWhitelist() {
    let moduleNameToExitWhitelist = document.getElementById('moduleNameToExitWhitelist').value;
    let listingHashToExitWhitelist = web3.utils.sha3(moduleNameToExitWhitelist);
    // Check if module application owner
    let exitWhitelistResponse = await doExit(listingHashToExitWhitelist);
    document.getElementById('exitWhitelistResponse').innerHTML = exitWhitelistResponse;
}

// check ForWhitelistStatus

function checkForWhitelistStatus(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.isWhitelisted(moduleName).call((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function checkWhitelistStatus() {
    let moduleNameToCheckWhitelistStatus = document.getElementById('moduleNameToCheckWhitelistStatus').value;
    let listingHashToCheckWhitelistStatus = web3.utils.sha3(moduleNameToCheckWhitelistStatus);
    let whitelistStatus = await checkForWhitelistStatus(listingHashToCheckWhitelistStatus);
    document.getElementById('isWhitelistedResponse').innerHTML = whitelistStatus;
}

// // Get Listing Details

function checkListingDetailsForModule(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.listings(moduleName).call((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function checkListingDetails() {
    let moduleNameToListingDetails = document.getElementById('moduleNameToListingDetails').value;
    let listingHashToListingDetails = web3.utils.sha3(moduleNameToListingDetails);
    let checkListingDetailsForModuleResponse = await checkListingDetailsForModule(listingHashToListingDetails);
    if (0 != checkListingDetailsForModuleResponse[0].toString()) {
        let applicationExpiry = checkListingDetailsForModuleResponse[0].toString();             // Expiration date of apply stage
        document.getElementById('applicationExpiry').innerHTML = new Date(applicationExpiry*1000);
        let whitelisted = checkListingDetailsForModuleResponse[1];                              // Indicates registry status
        document.getElementById('whitelisted').innerHTML = whitelisted;
        let owner = checkListingDetailsForModuleResponse[2];                                    // Owner of Listing
        document.getElementById('owner').innerHTML = owner;
        let unstakedDeposit = checkListingDetailsForModuleResponse[3];              // Number of tokens in the listing not locked in a challenge
        document.getElementById('unstakedDeposit').innerHTML = web3.utils.fromWei(unstakedDeposit, "ether");
        let challengeID = checkListingDetailsForModuleResponse[4];                  // Corresponds to a PollID in PLCRVoting
        document.getElementById('challengeID').innerHTML = challengeID;
        document.getElementById('checkListingDetailsForModuleResponseInfo').style.display = 'inline-block';
        document.getElementById('checkListingDetailsForModuleResponseNoInfo').style.display = 'none';
    } else {
        document.getElementById('checkListingDetailsForModuleResponseNoInfo').style.display = 'inline-block';
        document.getElementById('checkListingDetailsForModuleResponseInfo').style.display = 'none';
    }
}

// Check ifAppliedForListing

function ifAppliedForListing(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.appWasMade(moduleName).call((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function checkIfAppliedForListing() {
    let moduleNameToCheckAppListing = document.getElementById('moduleNameToCheckAppListing').value;
    let listingHashToCheckAppListing = web3.utils.sha3(moduleNameToCheckAppListing);
    let ifAppliedForListingResponse = await ifAppliedForListing(listingHashToCheckAppListing);
    document.getElementById('ifAppliedForListingResponse').innerHTML = ifAppliedForListingResponse;
}

// Returns true if the application/moduleName has an unresolved challenge

function checkExistingChallenge(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.challengeExists(moduleName).call((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function checkIfChallengeExists() {
    let moduleNameToCheckExistingChallenge = document.getElementById('moduleNameToCheckExistingChallenge').value;
    let listingHashToCheckExistingChallenge = web3.utils.sha3(moduleNameToCheckExistingChallenge);
    let ifChallengeExistsResponse = await checkExistingChallenge(listingHashToCheckExistingChallenge);
    document.getElementById('ifChallengeExistsResponse').innerHTML = ifChallengeExistsResponse;
}

// Determines whether voting has concluded in a challenge for a given moduleName. Throws if no challenge exists.

function ifChallengeCanBeResolved(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.challengeCanBeResolved(moduleName).call((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function checkIfChallengeCanBeResolved() {
    let moduleNameToCheckChallengeResolution = document.getElementById('moduleNameToCheckChallengeResolution').value;
    let listingHashToCheckChallengeResolution = web3.utils.sha3(moduleNameToCheckChallengeResolution);
    let ifChallengeCanBeResolvedResponse = await ifChallengeCanBeResolved(listingHashToCheckChallengeResolution);
    document.getElementById('ifChallengeCanBeResolvedResponse').innerHTML = ifChallengeCanBeResolvedResponse;
}

// Check whether the module can be whitelisted canBeWhitelisted


