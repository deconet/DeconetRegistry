// Contract ABIs

var DCOTokenContractAddress = '0xd7cf6f49a404129d4291a79ac2ea13df3ef516ec';

var DCOTokenContractABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "saleFee",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "from",
        type: "address"
      },
      {
        name: "to",
        type: "address"
      },
      {
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "_totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "projectName",
        type: "string"
      },
      {
        name: "sellerUsername",
        type: "string"
      },
      {
        name: "sellerAddress",
        type: "address"
      },
      {
        name: "licenseId",
        type: "bytes4"
      }
    ],
    name: "makeSale",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "newReward",
        type: "uint256"
      }
    ],
    name: "setTokenReward",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "tokenReward",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "tokenOwner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "to",
        type: "address"
      },
      {
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address"
      },
      {
        name: "tokens",
        type: "uint256"
      },
      {
        name: "data",
        type: "bytes"
      }
    ],
    name: "approveAndCall",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "newOwner",
    outputs: [
      {
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "tokenAddress",
        type: "address"
      },
      {
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "transferAnyERC20Token",
    outputs: [
      {
        name: "success",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "tokenOwner",
        type: "address"
      },
      {
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        name: "remaining",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        name: "_newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: "projectName",
        type: "string"
      },
      {
        indexed: false,
        name: "sellerUsername",
        type: "string"
      },
      {
        indexed: true,
        name: "sellerAddress",
        type: "address"
      },
      {
        indexed: true,
        name: "buyerAddress",
        type: "address"
      },
      {
        indexed: false,
        name: "price",
        type: "uint256"
      },
      {
        indexed: false,
        name: "soldAt",
        type: "uint256"
      },
      {
        indexed: false,
        name: "rewardedTokens",
        type: "uint256"
      },
      {
        indexed: false,
        name: "networkFee",
        type: "uint256"
      },
      {
        indexed: false,
        name: "licenseId",
        type: "bytes4"
      }
    ],
    name: "LicenseSale",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "_from",
        type: "address"
      },
      {
        indexed: true,
        name: "_to",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "tokenOwner",
        type: "address"
      },
      {
        indexed: true,
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        name: "tokens",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  }
];

var PLCRVotingContractAddress = '0xddb0fc61636251b4c4450cdaec8a1b7007c14dbd';
var PLCRVotingContractABI = [{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"getTotalNumberOfTokensForWinningOption","outputs":[{"name":"numTokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_POLL_NONCE","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_voteQuorum","type":"uint256"},{"name":"_commitDuration","type":"uint256"},{"name":"_revealDuration","type":"uint256"}],"name":"startPoll","outputs":[{"name":"pollID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voteTokenBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"}],"name":"getLastNode","outputs":[{"name":"pollID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"revealPeriodActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"isPassed","outputs":[{"name":"passed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pollMap","outputs":[{"name":"commitEndDate","type":"uint256"},{"name":"revealEndDate","type":"uint256"},{"name":"voteQuorum","type":"uint256"},{"name":"votesFor","type":"uint256"},{"name":"votesAgainst","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"}],"name":"getLockedTokens","outputs":[{"name":"numTokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pollID","type":"uint256"},{"name":"_secretHash","type":"bytes32"},{"name":"_numTokens","type":"uint256"},{"name":"_prevPollID","type":"uint256"}],"name":"commitVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"hasBeenRevealed","outputs":[{"name":"revealed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_prevID","type":"uint256"},{"name":"_nextID","type":"uint256"},{"name":"_voter","type":"address"},{"name":"_numTokens","type":"uint256"}],"name":"validPosition","outputs":[{"name":"valid","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"pollExists","outputs":[{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pollNonce","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"rescueTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_user","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"attrUUID","outputs":[{"name":"UUID","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"_numTokens","type":"uint256"}],"name":"requestVotingRights","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"commitPeriodActive","outputs":[{"name":"active","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_pollID","type":"uint256"},{"name":"_voteOption","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"revealVote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"getNumPassingTokens","outputs":[{"name":"correctVotes","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_numTokens","type":"uint256"}],"name":"getInsertPointForNumTokens","outputs":[{"name":"prevNode","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"getNumTokens","outputs":[{"name":"numTokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_pollID","type":"uint256"}],"name":"getCommitHash","outputs":[{"name":"commitHash","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_terminationDate","type":"uint256"}],"name":"isExpired","outputs":[{"name":"expired","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_numTokens","type":"uint256"}],"name":"withdrawVotingRights","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_pollID","type":"uint256"}],"name":"pollEnded","outputs":[{"name":"ended","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"pollID","type":"uint256"},{"indexed":false,"name":"numTokens","type":"uint256"}],"name":"VoteCommitted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"pollID","type":"uint256"},{"indexed":false,"name":"numTokens","type":"uint256"},{"indexed":false,"name":"choice","type":"uint256"}],"name":"VoteRevealed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voteQuorum","type":"uint256"},{"indexed":false,"name":"commitDuration","type":"uint256"},{"indexed":false,"name":"revealDuration","type":"uint256"},{"indexed":false,"name":"pollID","type":"uint256"}],"name":"PollCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"numTokens","type":"uint256"}],"name":"VotingRightsGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"numTokens","type":"uint256"}],"name":"VotingRightsWithdrawn","type":"event"}];

var Parameterizer = "0xc6c1742174fc3b7244e15ab7bd9385333960dfd1";
var ParameterizerContractABI = [{"constant":true,"inputs":[],"name":"PROCESSBY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"processProposal","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"proposals","outputs":[{"name":"appExpiry","type":"uint256"},{"name":"challengeID","type":"uint256"},{"name":"deposit","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"},{"name":"processBy","type":"uint256"},{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"propExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_challengeID","type":"uint256"}],"name":"challengeWinnerReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"string"}],"name":"get","outputs":[{"name":"value","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"challengeCanBeResolved","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"challengeReparameterization","outputs":[{"name":"challengeID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"claimReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"challenges","outputs":[{"name":"rewardPool","type":"uint256"},{"name":"challenger","type":"address"},{"name":"resolved","type":"bool"},{"name":"stake","type":"uint256"},{"name":"winningTokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"voterReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"_value","type":"uint256"}],"name":"proposeReparameterization","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_propID","type":"bytes32"}],"name":"canBeSet","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"params","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"voting","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_plcrAddr","type":"address"},{"name":"_minDeposit","type":"uint256"},{"name":"_pMinDeposit","type":"uint256"},{"name":"_applyStageLen","type":"uint256"},{"name":"_pApplyStageLen","type":"uint256"},{"name":"_commitStageLen","type":"uint256"},{"name":"_pCommitStageLen","type":"uint256"},{"name":"_revealStageLen","type":"uint256"},{"name":"_pRevealStageLen","type":"uint256"},{"name":"_dispensationPct","type":"uint256"},{"name":"_pDispensationPct","type":"uint256"},{"name":"_voteQuorum","type":"uint256"},{"name":"_pVoteQuorum","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"proposer","type":"address"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"propID","type":"bytes32"}],"name":"_ReparameterizationProposal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"challenger","type":"address"},{"indexed":false,"name":"propID","type":"bytes32"},{"indexed":false,"name":"pollID","type":"uint256"}],"name":"_NewChallenge","type":"event"}];

var Registry = "0xbf1b087ebf88da435a87c8d2ffc9ea206fa34a7e";
var RegistryContractABI = [{"constant":true,"inputs":[{"name":"_listingHash","type":"bytes32"}],"name":"isWhitelisted","outputs":[{"name":"whitelisted","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_listingHash","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_listingHash","type":"bytes32"}],"name":"exit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_listingHash","type":"bytes32"}],"name":"challengeExists","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_listingHash","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_listingHash","type":"bytes32"},{"name":"_data","type":"string"}],"name":"challenge","outputs":[{"name":"challengeID","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_listingHash","type":"bytes32"}],"name":"canBeWhitelisted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_listingHash","type":"bytes32"}],"name":"challengeCanBeResolved","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"claimReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_listingHash","type":"bytes32"},{"name":"_amount","type":"uint256"},{"name":"_data","type":"string"}],"name":"apply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_listingHash","type":"bytes32"}],"name":"updateStatus","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_listingHash","type":"bytes32"}],"name":"appWasMade","outputs":[{"name":"exists","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"challenges","outputs":[{"name":"rewardPool","type":"uint256"},{"name":"challenger","type":"address"},{"name":"resolved","type":"bool"},{"name":"stake","type":"uint256"},{"name":"totalTokens","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_challengeID","type":"uint256"},{"name":"_voter","type":"address"}],"name":"tokenClaims","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_voter","type":"address"},{"name":"_challengeID","type":"uint256"},{"name":"_salt","type":"uint256"}],"name":"voterReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"listings","outputs":[{"name":"applicationExpiry","type":"uint256"},{"name":"whitelisted","type":"bool"},{"name":"owner","type":"address"},{"name":"unstakedDeposit","type":"uint256"},{"name":"challengeID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_challengeID","type":"uint256"}],"name":"determineReward","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"parameterizer","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"voting","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_tokenAddr","type":"address"},{"name":"_plcrAddr","type":"address"},{"name":"_paramsAddr","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"listingHash","type":"bytes32"},{"indexed":false,"name":"deposit","type":"uint256"},{"indexed":false,"name":"data","type":"string"}],"name":"_Application","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"listingHash","type":"bytes32"},{"indexed":false,"name":"deposit","type":"uint256"},{"indexed":false,"name":"pollID","type":"uint256"},{"indexed":false,"name":"data","type":"string"}],"name":"_Challenge","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"listingHash","type":"bytes32"},{"indexed":false,"name":"added","type":"uint256"},{"indexed":false,"name":"newTotal","type":"uint256"}],"name":"_Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"listingHash","type":"bytes32"},{"indexed":false,"name":"withdrew","type":"uint256"},{"indexed":false,"name":"newTotal","type":"uint256"}],"name":"_Withdrawal","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"listingHash","type":"bytes32"}],"name":"_NewListingWhitelisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"listingHash","type":"bytes32"}],"name":"_ApplicationRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"listingHash","type":"bytes32"}],"name":"_ListingRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"challengeID","type":"uint256"}],"name":"_ChallengeFailed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"challengeID","type":"uint256"}],"name":"_ChallengeSucceeded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"voter","type":"address"},{"indexed":false,"name":"challengeID","type":"uint256"},{"indexed":false,"name":"reward","type":"uint256"}],"name":"_RewardClaimed","type":"event"}];

