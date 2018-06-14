module.exports = {
  // use the local version of truffle
  testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network coverage',

  compileCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle compile --network coverage',
  // start blockchain on the same port specified in truffle.js
  // use the default delicious Ganache mnemonic
  testrpcOptions: '-p 7545 -m "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"'
};
