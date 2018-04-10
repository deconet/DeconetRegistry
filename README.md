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
DLL               :               0xeadedb35d219dd0b91541ac28946153d26ca40a9
AttributeStore    :               0xc145189291e1d6e8039829d349e59f5ddc0afd87
PLCRVoting        :               0x343a6302f8e26a9316c54528a27e35dfd1714a17
Parameterizer     :               0x96792216ef1085c2f32cbe6f636727f4c5671f8a
Registry          :               0x0902c19815834940bdf8e591b3c2b49fa7893f0f
```

Reference Doc: https://docs.google.com/document/d/13c_xj_HZv8HtcCttZtVS_wmK7R_34TuVXQEK9ZQYdk8

Using network 'ropsten'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0xe865fee4904d31abde09f553ce7470bf662275d85b71cc700a807c400bb1ce98
  Migrations: 0xbd0a643621d2750223ed2ac91d4f87cf328725a4
Saving successful migration to network...
  ... 0x21819fef83a53b2a700a0fdf188fe5d42d6f1a9f8c2dd5de1c22e333946ea823
Saving artifacts...
Running migration: 2_token.js
skipping optional token deploy and using the token at address 0xd7cf6f49a404129d4291a79ac2ea13df3ef516ec on network ropsten.
Saving successful migration to network...
  ... 0x9f7bce710b7ae1afe22de39b6f05c6c0b2c04bb8f0e26a9fb4dba4589545fd21
Saving artifacts...
Running migration: 3_deploy_libs.js
  Deploying DLL...
  ... 0xa7aa0be4d9469cc7378d1bc1e2972679026356ba5f8c62746edb4ff2b82c358d
  DLL: 0xeadedb35d219dd0b91541ac28946153d26ca40a9
  Deploying AttributeStore...
  ... 0x991923d8ea17dfde0d12919bed740ff02b9e498cd31f361b6510bb6dfca48aeb
  AttributeStore: 0xc145189291e1d6e8039829d349e59f5ddc0afd87
Saving successful migration to network...
  ... 0xec078edc0b192313b7c1c7c9dc35fee39f2884134d8f8ceba7c6649e752745b1
Saving artifacts...
Running migration: 4_deploy_plcr.js
  Linking DLL to PLCRVoting
  Linking AttributeStore to PLCRVoting
  Running step...
  Deploying PLCRVoting...
  ... 0xaee8b982f151a3f02adc220021a8ed7a2adf236eea354bbd0fa20fe59385a2ac
  PLCRVoting: 0x343a6302f8e26a9316c54528a27e35dfd1714a17
Saving successful migration to network...
  ... 0xf1c040fb2ef288286258e591b2122e77815681f784fce1d509187e7995f96293
Saving artifacts...
Running migration: 5_deploy_parameterizer.js
  Running step...
  Deploying Parameterizer...
  ... 0xb5de473bffdf76ca32e77bd424f7136b7db85300a40998d1dd121dd5aca94e34
  Parameterizer: 0x96792216ef1085c2f32cbe6f636727f4c5671f8a
Saving successful migration to network...
  ... 0xd46e1f9428d373ede350e3be4ee4505eb3c4d6f91ab7fd497eec71bf70f8b425
Saving artifacts...
Running migration: 6_deploy_registry.js
  Running step...
  Deploying Registry...
  ... 0x2420adc4cb5c9931b6e81176ef859cd7fa554c3161ec9f47f7258ae793365eac
  Registry: 0x0902c19815834940bdf8e591b3c2b49fa7893f0f
Saving successful migration to network...
  ... 0x68ad4c8eb392f31ce6e71c036b9935b0475fcde5bf98f77654ec1df162794aff
Saving artifacts...