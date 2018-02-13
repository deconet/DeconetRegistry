# DeconetRegistry

Token Curated Registries implementation for Deconet Token Holders who participate in the network through voting and help curate the quality of the list of Best Modules

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
DLL               :               0xdd441375ecced4715ba5a715302b057733710630
AttributeStore    :               0x673241c1468ed3ef52f330eaa963d04b45f35e59
PLCRVoting        :               0xc0f25a15cd926d101f9a3b749958677fd543d730
Parameterizer     :               0x8fc87e9dbcfce9f2709653fc6ed7c8da29580718
Registry          :               0xfe48bbb9a3af03145ee67ec849c282a42025cbdc
```

Reference Doc: https://docs.google.com/document/d/13c_xj_HZv8HtcCttZtVS_wmK7R_34TuVXQEK9ZQYdk8