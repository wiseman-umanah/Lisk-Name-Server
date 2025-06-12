import React from "react"
import { motion } from "framer-motion"
import ParticleBackground from "./Particle" // import your particle component

const features = [
	{
		title: "Be Yourself On-Chain",
		desc: "Acquiring a name from Lisk Name Service (LNS) helps establish your on-chain identity. Say goodbye to forgettable strings of numbers and letters—make your presence memorable.",
	},
	{
		title: "Sell your name when you want",
		desc: "When you purchase a name, it's yours until it expires. Use it, gift it, sell it—the choice is yours.",
	},
	{
		title: "Send & receive assets confidently",
		desc: "Blockchain addresses are complicated. Errors using them can lead to lost assets. LNS reduces the risk with short and understandable names.",
	},
	{
		title: "Cross-Platform Compatibility",
		desc: "Use your LNS name across wallets, dApps, and exchanges—one identity everywhere.",
	},
	{
		title: "Privacy & Security",
		desc: "Your data and identity are protected with industry-leading encryption and privacy standards.",
	},
	{
		title: "Multi-Asset Support",
		desc: "Send and receive not just Lisk, but multiple assets using your single LNS name.",
	},
]

const cardVariants = {
	offscreen: { opacity: 0, y: 80, scale: 0.95 },
	onscreen: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", bounce: 0.3, duration: 0.8 },
	},
}

const Features: React.FC = () => {
	return (
		<div className="relative min-h-screen bg-gray-50 text-gray-900 overflow-hidden">
			{/* Particle background */}
			<ParticleBackground />
			{/* Features content */}
			<div className="relative z-10 container mx-auto px-6 py-20">
				<div className="flex flex-col justify-between items-start">
					<div className="grid md:grid-cols-3 gap-10">
						{features.map((feature) => (
							<motion.div
								key={feature.title}
								className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-start hover:scale-105 transition-transform duration-300 group"
								initial="offscreen"
								whileInView="onscreen"
								viewport={{ once: true, amount: 0.3 }}
								variants={cardVariants}
							>
								<div className="mb-4" />
								<h2 className="text-2xl font-bold mb-2">{feature.title}</h2>
								<p className="text-gray-700">{feature.desc}</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Features
