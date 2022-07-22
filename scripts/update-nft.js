// scripts/upgrade-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const NftV2 = await ethers.getContractFactory("Cuki");
  const proxy = await upgrades.upgradeProxy("0xC1a7762BC548c0297b8E37308957d453b9c28243", NftV2);
  console.log("Dapp upgraded to:", proxy.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});;