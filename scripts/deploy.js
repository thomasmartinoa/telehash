const hre = require("hardhat");

async function main() {
  const Telehash = await hre.ethers.getContractFactory("Telehash");

  // Deploy the contract
  const contract = await Telehash.deploy();

  // Wait for deployment to finish
  await contract.waitForDeployment();  // ✅ Updated method

  const address = await contract.getAddress();  // ✅ New way to get address
  console.log(`✅ Telehash deployed at: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
