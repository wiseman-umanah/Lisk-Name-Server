import { createConfig, http } from "wagmi";
import { liskSepolia } from "wagmi/chains";
import { walletConnect, injected, metaMask } from "wagmi/connectors";

const projectId = import.meta.env.VITE_WALLET_CONNECT_ID;


export const config = createConfig({
  chains: [liskSepolia],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
  ],
  transports: {
    [liskSepolia.id]: http()
  },
});

