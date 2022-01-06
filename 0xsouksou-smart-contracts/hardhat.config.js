require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: ROPSTEN_API,
      accounts: PRIVATE_KEY
    }
  }
};
