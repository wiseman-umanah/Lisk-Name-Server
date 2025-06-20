import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './lib/wagmiconfig'
import { useEffect, useState } from "react"
import { InfinitySpin } from 'react-loader-spinner'
import { ContractProvider } from "./context/LiskNameService"
import { Routes, Route } from "react-router-dom"
import { Landing } from './pages/Landing'
import { Developer } from './pages/Developer'
import Header from "./components/Header"
import CustomCursor from "./components/CustomCursor"
import "./App.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route path='/dev-portal' element={<Developer />} />
					</Routes>
					<ToastContainer
						position="bottom-right"
						autoClose={4000}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
						toastClassName="bg-white text-black"
					/>
					<CustomCursor />
				</div>
			</ContractProvider>
		</QueryClientProvider>
	</WagmiProvider>
  )
}

export default App
