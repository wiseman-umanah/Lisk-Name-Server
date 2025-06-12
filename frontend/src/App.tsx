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


const queryClient = new QueryClient()

function App() {
  return (
	<WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
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
		</QueryClientProvider>
	</WagmiProvider>
  )
}

export default App
