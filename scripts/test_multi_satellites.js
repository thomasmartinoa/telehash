const hre = require("hardhat");

async function main() {
  const signers = await hre.ethers.getSigners();

  // Use first 3 wallets
  const satelliteWallets = signers.slice(0, 3);
  const satelliteNames = ["Apollo-11", "ISRO-SAT-1", "Starlink-52"];

  const contractAddress = "0x42489DC6083cd06E147BBD85D1F05c5c2e3Fe23f";
  const Telehash = await hre.ethers.getContractFactory("Telehash");

  for (let i = 0; i < satelliteWallets.length; i++) {
    const sat = satelliteWallets[i];
    const name = satelliteNames[i];
    const contract = await Telehash.connect(sat).attach(contractAddress);

    console.log(`\n🛰 Registering: ${name} (${sat.address})`);
    try {
      const regTx = await contract.registerSatellite(name);
      await regTx.wait();
      console.log(`✅ ${name} registered`);
    } catch (e) {
      console.log(`⚠️ Already registered: ${name}`);
    }

    const hash = `hash_${i}`;
    const cid = `bafyCID${i}`;
    const metadata = `Telemetry ${i} for ${name}`;
    const cmd = `adjust orientation ${i * 5} degrees`;

    const dataTx = await contract.uploadData(hash, cid, metadata);
    await dataTx.wait();
    console.log(`📡 ${name} uploaded data`);

    const cmdTx = await contract.logCommand(cmd);
    await cmdTx.wait();
    console.log(`📟 ${name} logged command`);
  }

  console.log("\n📊 Retrieving logs for all satellites:");
  for (let i = 0; i < satelliteWallets.length; i++) {
    const sat = satelliteWallets[i];
    const contract = await Telehash.connect(sat).attach(contractAddress);

    const dataLogs = await contract.getDataLogs(sat.address);
    const cmdLogs = await contract.getCommandLogs(sat.address);

    console.log(`\n🔵 Satellite: ${satelliteNames[i]} (${sat.address})`);
    dataLogs.forEach((log, j) =>
      console.log(`  🧬 Data #${j + 1}: ${log.dataHash}, ${log.greenfieldCID}, ${log.metadata}`)
    );
    cmdLogs.forEach((cmd, j) =>
      console.log(`  🛠️ Command #${j + 1}: ${cmd.command}`)
    );
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
