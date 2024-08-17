const hre = require("hardhat")

const main = async () => {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const contract = await Transactions.deploy();
  
    await contract.deployed();
    // await contract.waitForDeployment();
  
    console.log("Transactions address: ", contract.address);
    // console.log("Transactions address: ", await contract.getAddress());
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();