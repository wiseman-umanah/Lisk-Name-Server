import { ethers, upgrades } from 'hardhat';

async function main () {
  const LiskNameService = await ethers.getContractFactory('LiskNameService');
  console.log('Deploying Service...');
  const box = await upgrades.deployProxy(LiskNameService);
  await box.waitForDeployment();
  console.log('LiskNameService deployed to:', await box.getAddress());
}

main();
