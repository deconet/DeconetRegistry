// Registry

var RegistryContractAddress = '0xfe48bbb9a3af03145ee67ec849c282a42025cbdc';

var RegistryContractABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "version",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "challenges",
      "outputs": [
        {
          "name": "rewardPool",
          "type": "uint256"
        },
        {
          "name": "challenger",
          "type": "address"
        },
        {
          "name": "resolved",
          "type": "bool"
        },
        {
          "name": "stake",
          "type": "uint256"
        },
        {
          "name": "totalTokens",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "listings",
      "outputs": [
        {
          "name": "applicationExpiry",
          "type": "uint256"
        },
        {
          "name": "whitelisted",
          "type": "bool"
        },
        {
          "name": "owner",
          "type": "address"
        },
        {
          "name": "unstakedDeposit",
          "type": "uint256"
        },
        {
          "name": "challengeID",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "parameterizer",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "voting",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_tokenAddr",
          "type": "address"
        },
        {
          "name": "_plcrAddr",
          "type": "address"
        },
        {
          "name": "_paramsAddr",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "moduleName",
          "type": "string"
        },
        {
          "indexed": true,
          "name": "deposit",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "data",
          "type": "string"
        }
      ],
      "name": "_Application",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "moduleName",
          "type": "string"
        },
        {
          "indexed": true,
          "name": "deposit",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "pollID",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "data",
          "type": "string"
        }
      ],
      "name": "_Challenge",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "moduleName",
          "type": "string"
        },
        {
          "indexed": true,
          "name": "added",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "newTotal",
          "type": "uint256"
        }
      ],
      "name": "_Deposit",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "moduleName",
          "type": "string"
        },
        {
          "indexed": true,
          "name": "withdrew",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "newTotal",
          "type": "uint256"
        }
      ],
      "name": "_Withdrawal",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "moduleName",
          "type": "string"
        }
      ],
      "name": "_NewListingWhitelisted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "moduleName",
          "type": "string"
        }
      ],
      "name": "_ApplicationRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "moduleName",
          "type": "string"
        }
      ],
      "name": "_ListingRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        }
      ],
      "name": "_ChallengeFailed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        }
      ],
      "name": "_ChallengeSucceeded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "challengeID",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "reward",
          "type": "uint256"
        }
      ],
      "name": "_RewardClaimed",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "apply",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "deposit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        },
        {
          "name": "_amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        }
      ],
      "name": "exit",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        },
        {
          "name": "_data",
          "type": "string"
        }
      ],
      "name": "challenge",
      "outputs": [
        {
          "name": "challengeID",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        }
      ],
      "name": "updateStatus",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        },
        {
          "name": "_salt",
          "type": "uint256"
        }
      ],
      "name": "claimReward",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_voter",
          "type": "address"
        },
        {
          "name": "_challengeID",
          "type": "uint256"
        },
        {
          "name": "_salt",
          "type": "uint256"
        }
      ],
      "name": "voterReward",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        }
      ],
      "name": "canBeWhitelisted",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        }
      ],
      "name": "isWhitelisted",
      "outputs": [
        {
          "name": "whitelisted",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        }
      ],
      "name": "appWasMade",
      "outputs": [
        {
          "name": "exists",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        }
      ],
      "name": "challengeExists",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_moduleName",
          "type": "string"
        }
      ],
      "name": "challengeCanBeResolved",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        }
      ],
      "name": "determineReward",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_challengeID",
          "type": "uint256"
        },
        {
          "name": "_voter",
          "type": "address"
        }
      ],
      "name": "tokenClaims",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
];