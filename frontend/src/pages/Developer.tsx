import { TypingText } from "../components/Typing"
import { useAccount, useSignMessage } from "wagmi"
import { useState, useEffect } from "react"
import { SDK } from "../components/SDK"
import { Copy } from "lucide-react"


export const Developer = () => {
	const { address, isConnected } = useAccount()
	const { signMessageAsync } = useSignMessage();
	const [apiKey, setApiKey] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const fetchApiKey = async () => {
		setLoading(true)
		try {
		const storedKey = localStorage.getItem(`api_key_${address}`)
		setApiKey(storedKey)
		} catch (err) {
		console.error("Error fetching API key:", err)
		} finally {
		setLoading(false)
		}
	}

	const message = "Authorize LNS SDK access — Generate API Key";

const generateApiKey = async () => {
  if (!address) return;
  setLoading(true);

  try {
    const signature = await signMessageAsync({ message });
	const url = import.meta.env.VITE_BACKEND_URL;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, message, signature }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "API key generation failed");
    }

    localStorage.setItem(`api_key_${address}`, data.apiKey);
    setApiKey(data.apiKey);
  } catch (err) {
    console.error("Error generating API key:", err);
  } finally {
    setLoading(false);
  }
};

	useEffect(() => {
		if (isConnected) {
		fetchApiKey()
		} else {
		setApiKey(null)
		}
	}, [isConnected, address])

	return (
		<>
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
					<div className="text-center w-full mx-auto mb-12">
						<TypingText />
						<p className="text-lg md:text-xl text-green-400 mb-12 max-w-2xl mx-auto">
							Access powerful SDKs to and resolve .lisk domains programmatically.
						</p>
						<div className="flex flex-col md:flex-row max-w-2xl mx-auto w-full gap-4 md:items-stretch">
							<div
								className={`flex-1 px-6 py-4 rounded-xl border transition-all duration-300 text-sm md:text-base flex items-center justify-between gap-2 cursor-pointer ${
									isConnected && apiKey
									? "border-white text-black bg-white hover:bg-gray-100"
									: "border-gray-600 text-gray-500 bg-gray-800 blur-sm cursor-not-allowed"
								}`}
								onClick={() => {
									if (isConnected && apiKey) {
									navigator.clipboard.writeText(apiKey);
									}
								}}
								>
								<span className="truncate">
									{isConnected
									? apiKey
										? apiKey
										: "No API key generated yet."
									: "Connect your wallet to view your API key."}
								</span>
								{isConnected && apiKey && (
									<Copy />
								)}
								</div>
							<button
							onClick={generateApiKey}
							disabled={!isConnected || loading}
							className={`px-3 py-1 sm:px-6 sm:py-2 rounded-xl hover:bg-green-400 bg-green-700 font-medium text-xs sm:text-base ${
								!isConnected || loading
							}`}
							>
							{loading
								? "Working..."
								: apiKey
								? "Regenerate"
								: "Generate API Key"}
							</button>
						</div>
					</div>
				</div>
			</main>
			<SDK />
		</>
	)
}