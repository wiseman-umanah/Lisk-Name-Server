import React, { useEffect, useState } from "react"
import ParticleBackground from "./Particle"

const Header: React.FC = () => {
  const [show, setShow] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setAtTop(currentY < window.innerHeight * 0.9)
      setShow(currentY < 10 || currentY < lastScrollY)
      setLastScrollY(currentY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <header
		className={`fixed top-4 left-1/2 -translate-x-1/2 bg-white z-50 text-black transition-all duration-300
			${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
			${atTop ? "bg-transparent" : "backdrop-blur-md shadow-2xl"}
			w-[98vw] max-w-3xl rounded-full
		`}
		style={{ minWidth: 220 }}
	>
		<ParticleBackground	/>
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 gap-2 sm:gap-0">
        <div className="text-xl sm:text-2xl font-bold flex items-center space-x-2">
          <img
            src="/images/lisk.png"
            className="h-8 sm:h-12 md:h-16 w-auto object-contain invert transition-all duration-300"
            alt="Lisk Logo"
          />
          <span className="text-base sm:text-xl md:text-2xl">NS</span>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-6 mt-2 sm:mt-0">
          <nav>
            <a href="#" className="text-sm sm:text-base hover:text-gray-700 transition-colors">
              Docs
            </a>
          </nav>
          <button className="water-drain-btn px-3 py-1 sm:px-6 sm:py-2 border border-black rounded-full bg-black font-medium text-xs sm:text-base">
            <span>CONNECT WALLET</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
