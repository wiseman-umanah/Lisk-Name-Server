"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { useContract } from "../context/LiskNameService"
import NameModal from "./NameModal"
import { toast } from "react-toastify"

const SearchBar: React.FC = () => {
	const { isAvailable } = useContract();
	const [modalOpen, setModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [availability, setAvailability] = useState<null | boolean>(null)
	const [checking, setChecking] = useState(false)
	const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  const handleNameSelect = () => {
    setModalOpen(true)
  }

  const handleClearSearch = () => {
    setSearchValue("")
    setSearchValue("")
    setAvailability(null)
    setIsDropdownOpen(false)
    setError(null)
    inputRef.current?.focus()
  }

  const checkAvailability = async () => {
    if (!searchValue) return
    setChecking(true)
    setError(null)
    setAvailability(null)
    setIsDropdownOpen(true)
    try {
      const available = await isAvailable(searchValue)
      setAvailability(!!available)
    } catch (e) {
      toast.error("Could not check availability", {
			icon: <X className="text-black"/>,
		})
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="relative max-w-2xl mx-auto w-full">
      <div className="relative">
        <input
			ref={inputRef}
			type="text"
			value={searchValue}
			maxLength={18}
			onChange={(e) => {
				setSearchValue(e.target.value)
				if (e.target.value === ""){
					setIsDropdownOpen(false)
					setAvailability(null)
					setError(null)
				} else {
					setIsDropdownOpen(true)
				}
			}}
			onFocus={() => setIsDropdownOpen(true)}
			onKeyDown={e => {
				if (e.key === "Enter") {
					checkAvailability()
				}
			}}
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

        <button 
			className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 hover:bg-gray-200 transition-colors"
			onClick={checkAvailability}
		>
          <Search className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Dropdown menu */}
       {isDropdownOpen && (
        <div className="absolute mt-2 w-full bg-white border text-black font-bold border-gray-700 rounded-xl shadow-lg overflow-hidden z-20 transition-all duration-300 ease-in-out">
          <div className="p-4 items-center">
            {checking ? (
              <span className="text-gray-500">Checking...</span>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : availability !== null ? (
              <div className="flex justify-between items-center gap-3"
				onClick={handleNameSelect}
			  >
                <span className="font-mono text-lg">{searchValue}.lisk</span>
                {availability ? (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">Available</span>
                ) : (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Taken</span>
                )}
              </div>
            ) : (
              <span className="text-gray-400">Type a name and search</span>
            )}
          </div>
        </div>
      )}

	{modalOpen && (
		<NameModal
			name={searchValue}
			available={availability === true}
			onClose={() => setModalOpen(false)}
		/>
	)}
    </div>
  )
}

export default SearchBar
