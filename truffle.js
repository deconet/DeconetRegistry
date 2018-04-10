const HDWalletProvider = require('truffle-hdwallet-provider');
const fs = require('fs');

let secrets;
let mnemonic = '';

if (fs.existsSync('secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
  ({ mnemonic } = secrets);
} else {
  mnemonic = 'control entry across rose cover clip enjoy okay congress bus idle lady';
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    mainnet: {
      provider: new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/NGCFzmhFCfPHVp5h4Umf'),
      network_id: '1',
      gas: 4500000,
      gasPrice: 10000000000,
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/NGCFzmhFCfPHVp5h4Umf'),
      network_id: '3',
      gas: 4500000,
      gasPrice: 25000000000,
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/NGCFzmhFCfPHVp5h4Umf'),
      network_id: '4',
      gas: 4500000,
      gasPrice: 25000000000,
    },
    kovan: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/NGCFzmhFCfPHVp5h4Umf'),
      network_id: '42',
      gas: 4500000,
      gasPrice: 25000000000,
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 7545, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01, // <-- Use this low gas price
    },
  },
};
