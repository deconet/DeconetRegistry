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
    window.PLCRVotingContract = new web3.eth.Contract(PLCRVotingContractABI, PLCRVotingContractAddress, {
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
