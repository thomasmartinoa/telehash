const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Replace with your latest deployed contract address
  const contractAddress = "0x76ca0FdbE82Fb9a0a23b5fA8A1Bb3844DFA2b3Ea";

  const Telehash = await hre.ethers.getContractFactory("Telehash");
  const contract = await Telehash.attach(contractAddress);

  console.log(`✅ Using contract: ${contractAddress}`);
  console.log(`✅ Testing with deployer wallet: ${deployer.address}`);

  // Step 1: Register satellite
  const regTx = await contract.registerSatellite("Apollo-DeepScan");
  await regTx.wait();
  console.log("🚀 Satellite registered");

  // Step 2: Upload telemetry data
  const dataHash = "0xabc123hashdemo";
  const cid = "bafy123fakeCIDfromGreenfield";
  const metadata = "Test telemetry: orbit sector B2 thermal scan";

  const dataTx = await contract.uploadData(dataHash, cid, metadata);
  await dataTx.wait();
  console.log("🛰️ Telemetry data uploaded");

  // Step 3: Log a command
  const command = "rotate 10 degrees east";
  const cmdTx = await contract.logCommand(command);
  await cmdTx.wait();
  console.log("🧭 Command logged");

  // Step 4: Read logs to confirm
  const logs = await contract.getDataLogs(deployer.address);
  const cmds = await contract.getCommandLogs(deployer.address);

  console.log("\n📦 Data Logs:");
  logs.forEach((entry, i) => {
    console.log(`  #${i + 1}: Hash=${entry.dataHash}, CID=${entry.greenfieldCID}, Meta=${entry.metadata}, Time=${new Date(Number(entry.timestamp) * 1000).toLocaleString()}`);
  });

  console.log("\n📡 Command Logs:");
  cmds.forEach((cmd, i) => {
    console.log(`  #${i + 1}: ${cmd.command} at ${new Date(Number(cmd.timestamp) * 1000).toLocaleString()}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
