$(document).foundation()

// MetaMask injects the web3 library for us.
window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        console.log('Got MetaMask! Hurray');
    } else {
        console.log('Please Use Metamask extension to transact in ETH.');
        document.getElementById('meta-mask-required').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example'
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    }
    startApp();
})

function checkNetwork() {
    let networkDetails = {};
    web3.version.getNetwork((err, netId) => {
        networkDetails = {"id" : netId, "name" : ""};
        switch (netId) {
            case "1":   console.log('This is The Mainnet');
                        //document.getElementById('networkDescription').innerHTML = '<p>This is The Mainnet.</p>';
                        networkDetails.name = "Mainnet";
                        break
            case "2":   console.log('This is the Deprecated Morden Test Network, now Ethereum Classic testnet');
                        //document.getElementById('networkDescription').innerHTML = '<p>This is the Deprecated Morden Test Network, now Ethereum Classic testnet</p>';
                        networkDetails.name = "Ethereum Classic Testnet";
                        break
            case "3":   console.log('This is the Ropsten Test Network.');
                        //document.getElementById('networkDescription').innerHTML = '<p>This is the Ropsten Test Network.</p>';
                        networkDetails.name = "Ropsten";
                        break
            case "4":   console.log('This is the Rinkeby Test Network.');
                        //document.getElementById('networkDescription').innerHTML = '<p>This is the Rinkeby Test Network.</p>';
                        networkDetails.name = "Rinkeby";
                        break
            case "42":  console.log('This is the Kovan Test Network.');
                        //document.getElementById('networkDescription').innerHTML = '<p>This is the Kovan Test Network.</p>';
                        networkDetails.name = "Kovan";
                        break
            default:    console.log('This is an unknown network.');
                        //document.getElementById('networkDescription').innerHTML = '<p>This is an unknown network.</p>';
                        networkDetails.name = "Unknown";
        }
        console.log(networkDetails);
        if (networkDetails.id != "3") {
            alert("Please connect to Ropsten Testnet to continue!");
        } else {
            console.log("Connected to Ropsten Testnet! Yeah!!");
        }
    });
}

function getETHBalance(walletAddress) {
    return new Promise(resolve => {
        web3.eth.getBalance(walletAddress, (error, result) => {
            if (!error) {
                console.log(web3.fromWei(result, "ether"));
                resolve(web3.fromWei(result, "ether"));
            } else {
                resolve(error);
            }
        });
    });
}

function getDCOBalance(walletAddress) {
    return new Promise(resolve => {
        web3.eth.contract(DeconetTokenContractABI).at(DeconetTokenContractAddress).balanceOf(walletAddress, (error, result) => {
            if (!error) {
                console.log(web3.fromWei(result, "ether"));
                resolve(web3.fromWei(result, "ether"));
            } else {
                resolve(error);
            }
        });
    });
}

function checkDCOSpendAllowance() {
    return new Promise(resolve => {
        web3.eth.contract(DeconetTokenContractABI).at(DeconetTokenContractAddress).allowance(web3.eth.coinbase, RegistryContractAddress, (error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function fetchAccountDetails() {
    // Fetch the Account Details
    let walletAddress = web3.eth.coinbase;
    document.getElementById('accountAddress').innerHTML = walletAddress;
    let walletETHBalance = await getETHBalance(walletAddress);
    document.getElementById('etherBalance').innerHTML = walletETHBalance;
    let walletDCOBalance = await getDCOBalance(walletAddress);
    document.getElementById('tokenBalance').innerHTML = walletDCOBalance;
    let allowanceValue = await checkDCOSpendAllowance();
    console.log("Allowance Value: " + web3.fromWei(allowanceValue, "ether"));
}

function startApp() {
    // Check For correct Network
    checkNetwork();
    fetchAccountDetails();
}

async function checkTokenBalance() {
    let balanceAddress = document.getElementById('balanceAddress').value;
    let walletDCOBalance = await getDCOBalance(balanceAddress);
    document.getElementById('balanceResponse').innerHTML = walletDCOBalance;
}

function doDCOSpendApproval(tokenValue) {
    return new Promise(resolve => {
        web3.eth.contract(DeconetTokenContractABI).at(DeconetTokenContractAddress).approve(RegistryContractAddress, tokenValue, (error, result) => {
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
        web3.eth.contract(RegistryContractABI).at(RegistryContractAddress).apply(moduleName, tokenPledged, moduleDetails, (error, result) => {
            if (!error) {
                console.log(result);
                resolve(result);
            } else {
                resolve(error);
            }
        });
    });
}

async function applyToRegistry() {
    let moduleName = document.getElementById('moduleName').value;
    let tokensPledged = document.getElementById('tokensPledged').value;
    let moduleDetails = document.getElementById('moduleDetails').value;
    let tokensPledgedInDecoWei = web3.toWei(tokensPledged, "ether");
    console.log(tokensPledgedInDecoWei);
    let tokenSpendApproval = await doDCOSpendApproval(tokensPledgedInDecoWei);
    let applyResponse = await applyForListing(moduleName, tokensPledgedInDecoWei, moduleDetails);
    document.getElementById('applicationResponse').innerHTML = applyResponse;
}

function checkForWhitelistStatus(moduleName) {
    return new Promise(resolve => {
        web3.eth.contract(RegistryContractABI).at(RegistryContractAddress).isWhitelisted(moduleName, (error, result) => {
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
    let moduleName = document.getElementById('moduleName').value;
    let whitelistStatus = await checkForWhitelistStatus(moduleName);
    document.getElementById('isWhitelistedResponse').innerHTML = whitelistStatus;
}

function ifAppliedForListing(moduleName) {
    return new Promise(resolve => {
        web3.eth.contract(RegistryContractABI).at(RegistryContractAddress).appWasMade(moduleName, (error, result) => {
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
    let moduleName = document.getElementById('moduleNameToCheckAppListing').value;
    let ifAppliedForListingResponse = await ifAppliedForListing(moduleName);
    document.getElementById('ifAppliedForListingResponse').innerHTML = ifAppliedForListingResponse;
}