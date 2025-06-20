import { Contract, ethers } from "ethers"
import { CONTRACT_ADDRESS, LiskNameService_ABI } from "./constants";

const getPublicContract = () => {
	const rpc = import.meta.env.VITE_LISK_JSONRPC
  const provider = new ethers.JsonRpcProvider(rpc);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, LiskNameService_ABI, provider)
  return contract
}


export const registerName = async (
  contract: Contract,
  userAddress: string | undefined,
  name: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<void> => {
  if (!contract || !userAddress) {
    setError("Connect wallet first")
    return
  }

  try {
    setLoading(true)
    setError(null)

    // Get price from contract
    const price: bigint = await contract.calculatePrice(name)
    const tx = await contract.register(name, { value: price })
    await tx.wait()
  } catch (err) {
    const message = "Error registering Name, Possibly Insufficient funds"
    console.error("Error registering name:", message)
    setError(message)
    throw new Error(message)
  } finally {
    setLoading(false)
  }
}


export const renewName = async (
  contract: Contract,
  userAddress: string | undefined,
  name: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<void> => {
  if (!contract || !userAddress) {
    setError("Connect wallet first")
    return
  }

  try {
    setLoading(true)
    setError(null)

    const price: bigint = await contract.calculatePrice(name)
    const tx = await contract.renew(name, { value: price })
    await tx.wait()
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transaction failed"
    console.error("Error renewing name:", message)
    setError(message)
    throw err
  } finally {
    setLoading(false)
  }
}

export const releaseName = async (
  contract: Contract,
  userAddress: string | undefined,
  name: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<void> => {
  if (!contract || !userAddress) {
    setError("Connect wallet first")
    return
  }

  try {
    setLoading(true)
    setError(null)

    const tx = await contract.release(name)
    await tx.wait()
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transaction failed"
    console.error("Error releasing name:", message)
    setError(message)
    throw err
  } finally {
    setLoading(false)
  }
}

export const claimRefund = async (
  contract: Contract,
  userAddress: string | undefined,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<void> => {
  if (!contract || !userAddress) {
    setError("Connect wallet first")
    return
  }

  try {
    setLoading(true)
    setError(null)

    const tx = await contract.claimRefund()
    await tx.wait()
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transaction failed"
    console.error("Error claiming refund:", message)
    setError(message)
    throw err
  } finally {
    setLoading(false)
  }
}

export const isAvailable = async (
	contract: Contract | null | undefined,
	name: string | undefined,
	setLoading: (loading: boolean) => void,
	setError: (error: string | null) => void
): Promise<boolean> => {
	const usedContract = contract ? contract : getPublicContract();
	if (!usedContract) return false;

  try {
    setLoading(true)
    setError(null)

    const available = await usedContract.isAvailable(name);
    return available;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transaction failed"
    console.error("Error claiming refund:", message)
    setError(message)
    throw err
  } finally {
    setLoading(false)
  }
}

export const getPrice = async (
  name: string,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
): Promise<string> => {
  const contract = getPublicContract()
  try {
    setLoading(true)
    setError(null)

    const priceWei = await contract.calculatePrice(name)
    const price = (Number(priceWei) / 1e18).toFixed(3) + " LSK"
    return price
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not fetch price"
    console.error("Error getting price:", message)
    setError(message)
    throw err
  } finally {
    setLoading(false)
  }
}
