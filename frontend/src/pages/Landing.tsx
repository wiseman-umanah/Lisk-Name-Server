import Hero from "../components/Hero"

import BrandLogos from "../components/BrandLogos"
import Features from "../components/Features"
import About from "../components/About"


export const Landing = () => {
	return (
		<>
			<Hero />
			<div className="flex items-center justify-center mt-20 w-full gap-20 ">
				<BrandLogos />
			</div>
			<Features />
			<About />
		</>
	)
}
