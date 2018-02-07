/* global artifacts */

const DLL = artifacts.require('./lib/dll/contracts/DLL.sol');
const AttributeStore = artifacts.require('./lib/attrstore/contracts/AttributeStore.sol');

module.exports = (deployer) => {
  deployer.deploy(DLL);
  deployer.deploy(AttributeStore);
};
