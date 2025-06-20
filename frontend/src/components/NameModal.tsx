import React, { useEffect, useRef, useState } from "react"
import { useContract } from "../context/LiskNameService"
import { useAccount } from "wagmi"
import { getPrice } from "../context/service_utils"


interface NameModalProps {
  name: string
  available: boolean
  onClose: () => void
}

const NameModal: React.FC<NameModalProps> = ({ name, available, onClose }) => {
  const { contract, registerName } = useContract()
  const { address } = useAccount()
  const [price, setPrice] = useState<string>("")
  const [owner, setOwner] = useState<string>("")
  const [expires, setExpires] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  // Fetch price and owner/expiry if needed
  useEffect(() => {
    const fetchDetails = async () => {
      setError(null)
      try {
        setLoading(true)
        const fetchPrice = await getPrice(name, setLoading, setError);
        setPrice(fetchPrice)
        if (!available && contract) {
          const info = await contract.names(name)
          setOwner(info.owner)
          setExpires(Number(info.expires))
        }
      } catch (e: any) {
        setError("Could not fetch details")
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [contract, name, available])

  // Buy handler
  const handleBuy = async () => {
    if (!contract) return
    setLoading(true)
    setError(null)
    try {
      await registerName(name)
      onClose()
    } catch (e: any) {
      setError(e.message || "Failed to register")
    } finally {
      setLoading(false)
    }
  }

  // Release handler (for owner)
  const handleRelease = async () => {
    // Implement release logic here
  }

  // Auction handler (for owner)
  const handleAuction = async () => {
    // Implement auction logic here
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
      <div 
	  ref={modalRef}
	  className="bg-white rounded-2xl shadow-2xl p-6 min-w-[350px] text-black relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-2">{name}.lisk</h2>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : available ? (
          <>
            <div className="mb-4">
              <span className="font-semibold">Price:</span> {price}
            </div>
            <button
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleBuy}
              disabled={loading || !address}
            >
              {loading ? "Processing..." : "Buy"}
            </button>
			{!address && (
			<div className="text-sm text-red-500 mt-2 text-center">
				Please connect your wallet to continue.
			</div>
			)}
          </>
        ) : (
          <>
            <div className="mb-2">
              <span className="font-semibold">Owner:</span> {owner}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Expires:</span>{" "}
              {expires ? new Date(expires * 1000).toLocaleString() : "Unknown"}
            </div>
            {address?.toLowerCase() === owner?.toLowerCase() ? (
              <div className="flex gap-2">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAuction}
				  disabled={!address}
                >
                  Auction Name
                </button>
                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleRelease}
				  disabled={!address}
                >
                  Release Name
                </button>
              </div>
            ) : (
              <div className="text-gray-500">This name is taken.</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NameModal
