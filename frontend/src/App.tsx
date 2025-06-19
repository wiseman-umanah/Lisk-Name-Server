import Header from "./components/Header"
import Hero from "./components/Hero"
import CustomCursor from "./components/CustomCursor"
import BrandLogos from "./components/BrandLogos"
import "./App.css"
import Features from "./components/Features"
import About from "./components/About"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './lib/wagmiconfig'
import { useEffect, useState } from "react"
import { InfinitySpin } from 'react-loader-spinner'
import { ContractProvider } from "./context/LiskNameService"


const queryClient = new QueryClient()

function App() {
	const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000) // 1.2s fake load
    return () => clearTimeout(timer)
  }, [])

  if (loading) 
	return (
		<div className="flex items-center bg-white justify-center h-screen">
			<InfinitySpin
				color="#000000"
			/>
		</div>
	)

  return (
	<WagmiProvider config={config}>
    	<QueryClientProvider client={queryClient}>
			<ContractProvider>
				<div className="App">
					<Header />
					<Hero />
					<div className="flex items-center justify-center mt-20 w-full gap-20 ">
						<BrandLogos />
					</div>
					<Features />
					<About />
					<CustomCursor />
				</div>
			</ContractProvider>
		</QueryClientProvider>
	</WagmiProvider>
  )
}

export default App
