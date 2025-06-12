import React, { useEffect, useState } from "react"

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
      className={`fixed top-6 left-1/2 -translate-x-1/2 bg-white z-50 text-black transition-all duration-300
        ${show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        ${atTop ? "bg-transparent" : "backdrop-blur-md shadow-2xl"}
        w-11/12 max-w-3xl rounded-2xl
      `}
      style={{ minWidth: 320 }}
    >
      <div className="flex items-center justify-between px-8">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <img
            src="/images/lisk.png"
            className="h-12 md:h-16 w-auto object-contain invert transition-all duration-300"
            alt="Lisk Logo"
          />
          <span className="">NS</span>
        </div>
        <div className="flex items-center space-x-6">
          <nav>
            <a href="#" className=" hover:text-gray-700 transition-colors">
              Docs
            </a>
          </nav>
          <button className="water-drain-btn px-6 py-2 border border-black rounded-full bg-black font-medium">
			<span>CONNECT WALLET</span>
		</button>
        </div>
      </div>
    </header>
  )
}

export default Header
