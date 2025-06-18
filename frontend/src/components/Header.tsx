import React, { useEffect, useState } from "react"
import ParticleBackground from "./Particle"
import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { shortenAddress } from "../lib/utils"

export function WalletOptions({ onConnect }: { onConnect: () => void }) {
  const { connectors, connect } = useConnect({
    mutation: {
      onSuccess: () => {
        onConnect()
      },
	},
  })

  return (
    <div className="flex flex-col gap-2">
      {connectors.map((connector) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
    </div>
  )
}



const Header: React.FC = () => {
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [walletOpen, setWalletOpen] = useState(false)
  const { address, isConnected } = useAccount()

  const { disconnect } = useDisconnect()


  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
   
      setShow(currentY < 10 || currentY < lastScrollY)
      setLastScrollY(currentY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <>
      <header
		className={`fixed top-0 left-1/2 -translate-x-1/2 bg-black z-50 text-white transition-all duration-300
			${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
			w-full
		`}
		style={{ minWidth: 220 }}
	>
		<ParticleBackground	/>
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 gap-2 sm:gap-0">
        <div className="text-xl sm:text-2xl font-bold flex items-center space-x-2">
          <img
            src="/images/lisk.png"
            className="h-8 sm:h-12 md:h-16 w-auto object-contain transition-all duration-300"
            alt="Lisk Logo"
          />
          <span className="text-base sm:text-xl md:text-2xl">NS</span>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-6 mt-2 sm:mt-0">
          
          {isConnected ? (
              <button
                className="water-drain-btn px-3 py-1 sm:px-6 sm:py-2 border border-white rounded-full bg-white font-medium text-xs sm:text-base"
                onClick={() => disconnect()}
                title={address}
              >
                <span>{shortenAddress(address ?? "")}</span>
              </button>
            ) : (
              <button
                className="water-drain-btn px-3 py-1 sm:px-6 sm:py-2 border border-white rounded-full bg-white font-medium text-xs sm:text-base"
                onClick={() => setWalletOpen(true)}
              >
                <span>CONNECT WALLET</span>
              </button>
            )}
        </div>
      </div>
	  <div className="absolute left-0 right-0 bottom-0 w-full h-6 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)"
        }}
		/>
    </header>

      {/* Modal for Wallet Options */}
      {walletOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-6 min-w-[300px] text-black relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              onClick={() => setWalletOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-lg font-bold mb-4">Connect your wallet</h2>
            <WalletOptions onConnect={() => setWalletOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

export default Header
