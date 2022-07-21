// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const NftV2 = await ethers.getContractFactory("Cuki");
  const proxy = await upgrades.upgradeProxy("0xe41e4Cbb9882Ac9e36950d5f960609ce8bBC1b7f", NftV2);
  console.log("Dapp upgraded to:", proxy.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});;