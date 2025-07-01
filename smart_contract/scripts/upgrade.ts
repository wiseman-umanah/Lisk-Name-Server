
import { ethers, upgrades } from'hardhat';
import dotenv from 'dotenv';


dotenv.config();

const contract_address = process.env.CONTRACT_ADDRESS;

async function main (contract_address: string | undefined) {
  if (!contract_address) {
    throw new Error('CONTRACT_ADDRESS environment variable is not set.');
  }
  const LiskNameServiceV2 = await ethers.getContractFactory('LiskNameServiceV2');
  console.log('Upgrading LiskNameService...');
  await upgrades.upgradeProxy(contract_address, LiskNameServiceV2);
  console.log('LiskNameService upgraded');
}

main(contract_address);
