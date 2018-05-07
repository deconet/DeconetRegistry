function subscribeToRegistryEvents() {
    RegistryContract.getPastEvents('_Application', {
        fromBlock: 0,
        toBlock: 'latest'
    }, function(error, events) {
        console.log(events);
    }).then(function(events) {
        document.getElementById('_Application').innerHTML = JSON.stringify(events[0].returnValues);
    });
}

async function startApp() {
    // Check For correct Network
    await checkNetwork();
    // Configure the ABIs
    await initDApp();
    // Get the Required Account Details
    await fetchAccountDetails();
    // Subscribe To Events
    await subscribeToRegistryEvents();
}

async function checkTokenBalance() {
    let balanceAddress = document.getElementById('balanceAddress').value;
    let walletDCOBalance = await getDCOBalance(balanceAddress);
    document.getElementById('balanceResponse').innerHTML = walletDCOBalance;
}

// Approve to spend the tokens

function doDCOSpendApprovalToRegistryContract(tokenValue) {
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
    let tokenSpendApproval = await doDCOSpendApprovalToRegistryContract(tokensPledgedInDecoWei);
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
    let tokenSpendApproval = await doDCOSpendApprovalToRegistryContract(requiredTokensToChallengeInDecoWei);
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
    let tokenSpendApproval = await doDCOSpendApprovalToRegistryContract(tokenAmountToDepositInDecoWei);
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

// check For Whitelist Status

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

// Get Listing Details

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

// Determines whether the given listingHash be whitelisted. 

function checkCanBeWhitelisted(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.canBeWhitelisted(moduleName).call((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function determineCanBeWhitelisted() {
    let moduleNameToCheckCanBeWhitelisted = document.getElementById('checkCanBeWhitelistedByModuleName').value;
    let listingHashToCheckCanBeWhitelisted = web3.utils.sha3(moduleNameToCheckCanBeWhitelisted);
    let canBeWhitelistedResponse = await checkCanBeWhitelisted(listingHashToCheckCanBeWhitelisted);
    document.getElementById('canBeWhitelistedResponse').innerHTML = canBeWhitelistedResponse;
}

// Updates a listingHash's status from 'application' to 'listing' or resolves a challenge if one exists.

function updateStatusByModuleName(moduleName) {
    return new Promise(resolve => {
        RegistryContract.methods.updateStatus(moduleName).send((error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function updateStatusForApplication() {
    let moduleNameToUpdateStatus = document.getElementById('updateStatusByModuleName').value;
    let listingHashToUpdateStatus = web3.utils.sha3(moduleNameToUpdateStatus);
    let updateStatusResponse = await updateStatusByModuleName(listingHashToUpdateStatus);
    document.getElementById('updateStatusResponse').innerHTML = updateStatusResponse;
}
