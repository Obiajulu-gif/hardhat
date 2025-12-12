import hre from "hardhat";

async function main() {
  const Spacebear = await hre.ethers.getContractFactory("Spacebear");
  const [deployer] = await hre.ethers.getSigners();
  const spacebearInstance = await Spacebear.deploy(deployer.address);
  await spacebearInstance.waitForDeployment();
  const contractAddress =
    spacebearInstance.target ?? spacebearInstance.address ?? "unknown";
  console.log(`Deploy contract at ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
