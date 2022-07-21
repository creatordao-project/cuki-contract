// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(deployer.address);
    const Nft = await ethers.getContractFactory("Cuki");
    const proxy = await upgrades.deployProxy(Nft, ["Cuki","Cuki","ipfs://bafybeiebhe4vh76keetfjj2yimaxiuk4qwotddwzh2qo3ybutum3kp4b5m/{id}.json"]);
    await proxy.deployed();
    console.log("Nft deployed to:", proxy.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});;