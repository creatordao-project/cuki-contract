const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");


describe("Cuki", function() {
  it('works', async () => {
    const [owner, otherAccount] = await ethers.getSigners();

    const Nft = await ethers.getContractFactory("Cuki");
    const instance = await upgrades.deployProxy(Nft,["ipfs://bafybeiebhe4vh76keetfjj2yimaxiuk4qwotddwzh2qo3ybutum3kp4b5m/{id}.json"]);
    console.log("instance deployed to:", instance.address);

    // Mint 
    await instance.connect(owner).mint(owner,1,1,"0x0");
    console.log(await instance.uri(1));

    // Upgrade
    const NftV2 = await ethers.getContractFactory("Cuki");
    const upgraded = await upgrades.upgradeProxy(instance.address, NftV2);
    console.log("instance upgraded to:", upgraded.address);
    
  });
});