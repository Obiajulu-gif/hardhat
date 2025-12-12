const fs = require("fs");
require("@nomicfoundation/hardhat-toolbox");

const mnemonic = fs.readFileSync(".secret").toString().trim();
const infuraProjectID = fs.readFileSync(".infura").toString().trim();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraProjectID}`,
      accounts: {
        mnemonic,
      },
      chainId: 11155111,
    },
  },
  etherscan: {
    apiKey: fs.readFileSync(".etherscan").toString().trim(),
  },
  sourcify: {
    enabled: true
  },
};
