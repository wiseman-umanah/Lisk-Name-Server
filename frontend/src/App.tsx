import Header from "./components/Header"
import Hero from "./components/Hero"
import CustomCursor from "./components/CustomCursor"
import BrandLogos from "./components/BrandLogos"
import "./App.css"
import Features from "./components/Features"
import About from "./components/About"

function App() {
  return (
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
  )
}

export default App
