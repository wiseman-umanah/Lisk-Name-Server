import type React from "react"
import SearchBar from "./SearchBar"


const Hero: React.FC = () => {
  return (
    <main className="min-h-screen bg-black text-white relative">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/images/grid-pattern.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Alternative CSS Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wider">
            EMPOWER YOUR DIGITAL PRESENCE
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Lisk Name Service enhances your on-chain journey.
          </p>

          <SearchBar />
        </div>
      </div>
    </main>
  )
}

export default Hero
