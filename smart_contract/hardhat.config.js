require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    rinkeby:{
      url:'https://eth-rinkeby.alchemyapi.io/v2/8b5GsHEMGTIAUVmyFbSrXIUtC5MoociK' ,
      accounts:['e801996c5b81c07d2121bcf019300e01a6f82d149174835d276118a3d222fbc9']

    }
  },
};
