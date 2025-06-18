import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { ethers, Contract } from "ethers";
import { CONTRACT_ADDRESS, LiskNameService_ABI } from "./constants";
import {
	registerName as registerNameUtil,
	renewName as renewNameUtil,
	releaseName as releaseNameUtil,
	claimRefund as claimRefundUtil
 } from "./service_utils";


type ContractContextType = {
  registerName: (
	name: string
  ) => Promise<void>;
  renewName: (
	name: string
  ) => Promise<void>;
  releaseName: (
	name: string
  ) => Promise<void>;
  claimRefund: (
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
  contract: Contract | null;
};

const ContractContext = createContext<ContractContextType | null>(null);

export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const setupContract = async () => {
    if (walletClient && CONTRACT_ADDRESS) {
      const provider = new ethers.BrowserProvider(walletClient);
      const signer = await provider.getSigner();

      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        LiskNameService_ABI,
        signer
      );
      setContract(contractInstance);
    }
  };

  setupContract();
}, [walletClient]);

	const registerName = async ( name: string ) => {
		if (!contract || !address) return;

		return await registerNameUtil(
		contract,
		address,
		name,
		setLoading,
		setError
		);
	};

	const renewName = async ( name: string ) => {
		if (!contract || !address) return;

		return await renewNameUtil(
		contract,
		address,
		name,
		setLoading,
		setError
		);
	};

	const releaseName = async ( name: string ) => {
		if (!contract || !address) return;

		return await releaseNameUtil(
		contract,
		address,
		name,
		setLoading,
		setError
		);
	};

	const claimRefund = async () => {
		if (!contract || !address) return;

		return await claimRefundUtil(
		contract,
		address,
		setLoading,
		setError
		);
	};
    return (<ContractContext.Provider
		value={{
			registerName, renewName,
			releaseName, claimRefund,
			loading, error, contract 
		}}>
      {children}
    </ContractContext.Provider>);
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("Contract must be used within ContractProvider");
  }
  return context;
};
