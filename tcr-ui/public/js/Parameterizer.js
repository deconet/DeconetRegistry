// Parameterizer

var ParameterizerContractAddress = '0x96792216ef1085c2f32cbe6f636727f4c5671f8a';

var ParameterizerContractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "PROCESSBY",
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
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "name": "appExpiry",
        "type": "uint256"
      },
      {
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "name": "deposit",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "processBy",
        "type": "uint256"
      },
      {
        "name": "value",
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
        "name": "winningTokens",
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
    "name": "params",
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
        "name": "_minDeposit",
        "type": "uint256"
      },
      {
        "name": "_pMinDeposit",
        "type": "uint256"
      },
      {
        "name": "_applyStageLen",
        "type": "uint256"
      },
      {
        "name": "_pApplyStageLen",
        "type": "uint256"
      },
      {
        "name": "_commitStageLen",
        "type": "uint256"
      },
      {
        "name": "_pCommitStageLen",
        "type": "uint256"
      },
      {
        "name": "_revealStageLen",
        "type": "uint256"
      },
      {
        "name": "_pRevealStageLen",
        "type": "uint256"
      },
      {
        "name": "_dispensationPct",
        "type": "uint256"
      },
      {
        "name": "_pDispensationPct",
        "type": "uint256"
      },
      {
        "name": "_voteQuorum",
        "type": "uint256"
      },
      {
        "name": "_pVoteQuorum",
        "type": "uint256"
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
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "propID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "deposit",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "appEndDate",
        "type": "uint256"
      }
    ],
    "name": "_ReparameterizationProposal",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "propID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "commitEndDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "revealEndDate",
        "type": "uint256"
      }
    ],
    "name": "_NewChallenge",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "propID",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "_ProposalAccepted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "propID",
        "type": "bytes32"
      }
    ],
    "name": "_ProposalExpired",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "propID",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "rewardPool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalTokens",
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
        "name": "propID",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "name": "challengeID",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "rewardPool",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalTokens",
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
      },
      {
        "indexed": false,
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
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "proposeReparameterization",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
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
        "name": "_propID",
        "type": "bytes32"
      }
    ],
    "name": "challengeReparameterization",
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
        "name": "_propID",
        "type": "bytes32"
      }
    ],
    "name": "processProposal",
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
        "name": "_propID",
        "type": "bytes32"
      }
    ],
    "name": "canBeSet",
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
        "name": "_propID",
        "type": "bytes32"
      }
    ],
    "name": "propExists",
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
        "name": "_propID",
        "type": "bytes32"
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
    "name": "challengeWinnerReward",
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
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "get",
    "outputs": [
      {
        "name": "value",
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