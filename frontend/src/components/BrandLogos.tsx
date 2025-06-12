import React, { useRef, useEffect, useState } from "react"

const brands = Array.from({ length: 6 }, (_, i) => ({
  name: `Brand ${i + 1}`,
  logo: `/images/brand${i + 1}.png`,
}))

const BrandLogos: React.FC = () => {
  const [setWidth, setSetWidth] = useState(0)
  const setRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (setRef.current) {
      setSetWidth(setRef.current.offsetWidth)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-2xl py-8 w-full max-w-5xl mx-auto">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Scrolling Content */}
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: setWidth
            ? `brand-scroll ${setWidth / 60}s linear infinite`
            : undefined,
        }}
      >
        {/* First set */}
        <div ref={setRef} className="flex items-center space-x-16 px-8 min-w-max">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex items-center justify-center w-32 mx-4 transition-transform duration-300 hover:scale-110"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 md:h-16 w-auto object-contain filter grayscale hover:grayscale-0 drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              />
            </div>
          ))}
        </div>
        {/* Duplicate set for seamless scroll */}
        <div className="flex items-center space-x-16 px-8 min-w-max">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="inline-flex items-center justify-center w-32 mx-4 transition-transform duration-300 hover:scale-110"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-12 md:h-16 w-auto object-contain filter grayscale hover:grayscale-0 drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrandLogos
