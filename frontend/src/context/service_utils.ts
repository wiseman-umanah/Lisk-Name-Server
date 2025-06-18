import { Contract } from "ethers"

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
    const message = err instanceof Error ? err.message : "Transaction failed"
    console.error("Error registering name:", message)
    setError(message)
    throw err
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

