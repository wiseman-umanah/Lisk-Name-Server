import { ethers } from "ethers";
import liskNameService from "../abi/LiskNameService.json";


const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const contractAddress = process.env.CONTRACT_ADDRESS;
if (!contractAddress) {
  throw new Error("CONTRACT_ADDRESS environment variable is not set");
}

export const contract = new ethers.Contract(
  contractAddress,
  liskNameService.abi,
  provider
);
