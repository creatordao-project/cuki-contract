require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 55000000000, // 55 gwei
    },
    mainnet: {
      url: process.env.MAINNET_API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      gasPrice: 55000000000, // 55 gwei
    },
    mumbai: {
      url: process.env.MUMBAI_API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    polygon: {
      url: process.env.POLYGON_API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
    }
  }
};
