let debug = true;
let waitCounter = 0;
const maxWaitCounter = 10;

let eventHandlerPageLoad = function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        console.log('Got MetaMask! Hurray');
    } else {
        // Use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        document.getElementById('meta-mask-required').innerHTML = 'You need <a href="https://metamask.io/">MetaMask</a> browser plugin to run this example'
    }
    // Immediately execute methods after web page is loaded
    startApp();
}

function startApp() {
    if(waitCounter > maxWaitCounter) {
        window.web3 = null;
        if (confirm("The DeconetRegistry Dapp did not find a web3 provider.\nPlease start your web3 provider (e.g. MetaMask) and reload this page.\nDo you want to continue?")) {
            // Avoid the web page becoming unresponsive
            location.reload();
        } else {
            alert("The Dapp Fails to Execute without a ETH Node...");
        }
    } else {
        //monitorAccountChanges();
        watchSyncing();
        reloadPageWhenNoNetwork();
        //displayActionContent();
    }
    waitCounter++;
}

window.addEventListener('load', eventHandlerPageLoad);

function monitorAccountChanges() {
    // Declare accountInterval here! Clear the variable if there is no Ethereum node found.
    let accountInterval;
  
    // Check if an Ethereum node is found.
    if(web3 != null && web3.isConnected()) {
        // If a coinbase account is found, automatically update the fromAddress form field with the coinbase account
        getCoinbasePromise()
        .then(function(fromAddress) {
            document.getElementById('fromAddress').value = fromAddress;
        })
        .catch(function(err) {
            showIntervalMessage(err);
        });
  
        let account = web3.eth.accounts[0];
  
        // At a time interval of 1 sec monitor account changes
        accountInterval = setInterval(function() {
            // Monitor account changes. If you switch account, for example in MetaMask, it will detect this.
            // See: https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md
            if (web3.eth.accounts[0] !== account) {
                account = web3.eth.accounts[0];
                document.getElementById('fromAddress').value = account;
            } else {
                showIntervalMessage("No accounts found");
            }
            if(account != null) {
                showIntervalMessage("");
            }

            // Check which Ethereum network is used
            getNetworkPromise()
            .then(function(network) {
                document.getElementById('network').innerText = "Network: " + network + "\n\n";
            })
            .catch(function(err) {
                if(debug) console.log(err);
            });
  
        }, 1000); // end of accountInterval = setInterval(function()
    } else {
        // Stop the accountInterval
        clearInterval(accountInterval);
        showIntervalMessage("No Ethereum node found");
    }
}

// Everytime a sync starts, updates and stops.
function watchSyncing() {
    if(web3 != null && web3.isConnected()) {
        web3.eth.isSyncing(function(err, sync) {
            if(!err) {
                // stop all DApp activity
                if(sync === true) {
                    // we use `true`, so it stops all filters, but not the web3.eth.syncing polling
                    web3.reset(true);
                } else if(sync) {
                    // Show sync info. When your Ethereum node is not runnning for a day, your node need to be synchronized.
                    // A message will be displayed on top of screen.
                    let message = "Syncing from "+sync.currentBlock+" to "+sync.highestBlock;
                    showIntervalMessage(message);
                    // if(debug) console.log("The block number where the sync started = "+sync.startingBlock);
                    // if(debug) console.log("The block number where at which block the node currently synced to already = "+sync.currentBlock);
                    // if(debug) console.log("The estimated block number to sync to = "+sync.highestBlock);
                } else {
                    // re-gain app operation
                    // if(debug) console.log("startApp");
                    startApp();
                }
            }
        });
    }
  }

function reloadPageWhenNoNetwork() {
    setInterval(function() {
        if(web3 != null && !web3.isConnected()) {
            // If an Ethereum node is found, reload web page.
            eventHandlerPageLoad();
        }
    }, 5000);
}

const getNetworkPromise = function() {
    return new Promise(function(resolve, reject) {
        web3.version.getNetwork(function(err, netId) {
            let selectedNetwork = "";
  
            if (!err) {
                if(netId > 1000000000000) {
                    selectedNetwork = "TestRPC";
                } else {
                    switch (netId) {
                        case "1":   console.log('This is The Mainnet');
                                    selectedNetwork = "Mainnet";
                                    break
                        case "2":   console.log('This is the Deprecated Morden Test Network, now Ethereum Classic testnet');
                                    selectedNetwork = "Morden";
                                    break
                        case "3":   console.log('This is the Ropsten Test Network.');
                                    selectedNetwork = "Ropsten";
                                    break
                        case "4":   console.log('This is the Rinkeby Test Network.');
                                    selectedNetwork = "Rinkeby";
                                    break
                        case "42":  console.log('This is the Kovan Test Network.');
                                    selectedNetwork = "Kovan";
                                    break
                        default:    console.log('This is an Unknown Network.');
                                    selectedNetwork = "Unknown Network = " + netId;
                                    document.getElementById('networkDescription').innerHTML = '<p>This is an unknown network.</p>';
                    }
                }
                resolve(selectedNetwork);
            } else {
                reject("getNetworkPromise: "+err);
            }
      });
    });
  }


// ===================================================
// Promises
// ===================================================

const getCoinbasePromise = function() {
    return new Promise(function(resolve, reject) {
        web3.eth.getCoinbase(function(err, res) {
            if (!res) {
                reject("No accounts found");
            } else {
                resolve(res);
            }
        });
    });
}
  
const checkAddressPromise = function(address, addressType) {
    return new Promise(function(resolve, reject) {
        if (address != null && web3.isAddress(address)) {
            resolve();
        } else {
            reject(addressType);
        }
    });
}

// ===================================================
// Helper functions
// ===================================================
function clearOutputs(){
    document.getElementById('wait').innerText= "";
    document.getElementById('log').innerText= "";
  
    showResultMessage("");
    showContractInformationMessage("");
}
  
  // Purpose: Returns true if it is a hexadecimal string: containing only 0123456789ABCDEF.
function isHexadecimal(s){
    if(s== null) {
        return false;
    } else {
        s = s.trim();
        if (s == ""){
            return false;
        } else {
            var re = /^[0-9a-fA-F]+$/;
            if (re.test(s)) {
                return true;
            } else {
                return false;
            }
        }
    }
  }
  
function isContractNumberValid(contractNumber) {
    const validChars = "0123456789";
    let valid=true;
    let charVal;
  
    if(contractNumber.length == 0) {
        return false;
    }
  
    for (let i = 0; i < contractNumber.length && valid == true; i++) {
        charVal = contractNumber.charAt(i);
        if (validChars.indexOf(charVal) == -1) {
            valid = false;
        }
    }
    return valid;
}
  
function isHashValid(hash) {
    // This is a simple check.
    // Sha256 contains 64 characters
    // Sha256 only contains hexadecimal characters
    const length = (""+hash).length;
  
    if(length == 64 && isHexadecimal(hash)){
        return true;
    }
  
    return false;
}
  
function showResultMessage(message) {
    document.getElementById('result').innerText = message;
}

function showIntervalMessage(message) {
    document.getElementById('intervalErrorMessage').innerText = message;
}

function showContractInformationMessage(message) {
    document.getElementById('contractInformation').innerText = message;
}