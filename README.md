# ETH-TCR

Token Curated Registries implementation for Token Holders who participate in the network through voting and help curate the quality of the list

## Initialize
The only environmental dependency needed is NodeJS.
```
npm install
npm run setup
npm run compile
```
To deploy on the Rinkeby Testnet:
```
npm run deploy-rinkeby
```

## Tests
The repo has a comprehensive test suite. You can run it with `npm run test`. To run the tests with the RPC logs, use `npm run test gas`.

## Composition of the repo
The repo is composed as a Truffle project, and is largely idiomatic to Truffle's conventions. The tests are in the `test` directory, the contracts are in the `contracts` directory and the migrations (deployment scripts) are in the `migrations` directory. Furthermore there is a `conf` directory containing json files where deployments can be parameterized.

## Deploying the TCR
To deploy the TCR, first open up `conf/config.json`. The `paramDefaults` object in the config JSON will specify the starting parameters your TCR is deployed with. In the `token` object, set `deployToken` to `true` if you want to deploy this TCR's token as part of the TCR deployment. You can specifiy initial recipients of the token in the `tokenHolders` array. Since We have already deployed a token, we set `deployToken` to `false` and provide the token's address in the `address` property. The token should be EIP20 (ERC20 Standard).

The `package.json` includes scripts for deploying to rinkeby and mainnet. Modify `truffle.js` and `package.json` if you need other networks. You'll need a `secrets.json` file with a funded mnemonic on the `m/44'/60'/0'/0/0` HD path in the root of the repo to deploy. Your `secrets.json` should look like this:
```
{
  "mnemonic": "my good mnemonic"
}
```
You can use [https://iancoleman.io/bip39/](https://iancoleman.io/bip39/) to generate a mnemonic and derive its `m/44'/60'/0'/0/0` address.

## Library Contracts
The repo consumes several EPM packages. `dll` and `attrstore` are libraries used in PLCRVoting's doubly-linked list abstraction. `tokens` provides an ERC20-comaptible token implementation.

## Current Setup - Ropsten Testnet
```
DCO Token         :               0xd7cf6f49a404129d4291a79ac2ea13df3ef516ec
DLL               :               0x7d865c48a4073cadb600179225d9be4837e6d300
AttributeStore    :               0x2f3ab5ed4ce1377744064c9c9aa22c18c40403e2
PLCRVoting        :               0xddb0fc61636251b4c4450cdaec8a1b7007c14dbd
Parameterizer     :               0xc6c1742174fc3b7244e15ab7bd9385333960dfd1
Registry          :               0xbf1b087ebf88da435a87c8d2ffc9ea206fa34a7e
```

Reference Doc: https://docs.google.com/document/d/13c_xj_HZv8HtcCttZtVS_wmK7R_34TuVXQEK9ZQYdk8