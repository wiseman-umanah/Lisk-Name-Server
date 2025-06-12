"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"

const SearchBar: React.FC = () => {
  const [searchValue, setSearchValue] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [filteredNames, setFilteredNames] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Example available names
  const availableNames = [
    "crypto.lisk",
    "blockchain.lisk",
    "defi.lisk",
    "nft.lisk",
    "web3.lisk",
    "metaverse.lisk",
    "dao.lisk",
    "token.lisk",
    "wallet.lisk",
    "exchange.lisk",
  ]

  useEffect(() => {
    // Filter names based on search input
    if (searchValue) {
      const filtered = availableNames.filter((name) => name.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredNames(filtered)
    } else {
      setFilteredNames(availableNames)
    }
  }, [searchValue])

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleNameSelect = (name: string) => {
    setSearchValue(name)
    setIsDropdownOpen(false)
  }

  const handleClearSearch = () => {
    setSearchValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="relative">
        <input
			ref={inputRef}
			type="text"
			value={searchValue}
			onChange={(e) => setSearchValue(e.target.value)}
			onFocus={() => setIsDropdownOpen(true)}
			placeholder="Search for your Lisk name"
			className="w-full px-6 py-4 bg-transparent border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-white transition-colors text-lg responsive-placeholder"
		/>

        {searchValue && (
          <button
            onClick={handleClearSearch}
            className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 hover:bg-gray-200 transition-colors">
          <Search className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-2 w-full bg-white border text-black font-bold border-gray-700 rounded-xl shadow-lg overflow-hidden z-20 transition-all duration-300 ease-in-out"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          <div className="p-2">
            <h3 className=" px-3 py-2 border-b border-gray-800">Available Names</h3>

            {filteredNames.length > 0 ? (
              <ul>
                {filteredNames.map((name, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNameSelect(name)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-300 rounded-lg transition-colors flex items-center justify-between group"
                    >
                      <span>{name}</span>
                      
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-3 py-4 text-center">No matching names found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
