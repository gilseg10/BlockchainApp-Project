// https://eth-sepolia.g.alchemy.com/v2/X9ThTFFcS--jZ8mqXF0iKJYeC6U7wSp_ ssss

require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/X9ThTFFcS--jZ8mqXF0iKJYeC6U7wSp_',
      accounts: [ process.env.ADDRESS_SECRETKEY ]
    }
  }
}