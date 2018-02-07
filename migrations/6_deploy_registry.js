/* global artifacts */

const Registry = artifacts.require('./Registry.sol');
const Token = artifacts.require('./lib/tokens/contracts/eip20/EIP20.sol');
const Parameterizer = artifacts.require('./Parameterizer.sol');
const DLL = artifacts.require('./lib/dll/contracts/DLL.sol');
const AttributeStore = artifacts.require('./lib/attrstore/contracts/AttributeStore.sol');
const PLCRVoting = artifacts.require('PLCRVoting.sol');

const fs = require('fs');

module.exports = (deployer, network, accounts) => {
  async function approveRegistryFor(addresses) {
    const token = await Token.deployed();
    const user = addresses[0];
    const balanceOfUser = await token.balanceOf(user);
    await token.approve(Registry.address, balanceOfUser, { from: user });
    if (addresses.length === 1) { return true; }
    return approveRegistryFor(addresses.slice(1));
  }

  deployer.link(DLL, Registry);
  deployer.link(AttributeStore, Registry);

  return deployer.then(async () => {
    const config = JSON.parse(fs.readFileSync('./conf/config.json'));
    let tokenAddress = config.token.address;

    if (config.token.deployToken) {
      tokenAddress = Token.address;
    }

    return deployer.deploy(
      Registry,
      tokenAddress,
      PLCRVoting.address,
      Parameterizer.address,
    );
  })
    .then(async () => {
      if (network === 'test') {
        await approveRegistryFor(accounts);
      }
    }).catch((err) => { throw err; });
};
