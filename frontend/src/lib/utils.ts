// Utility to shorten Ethereum addresses
export const shortenAddress = (address: string): string => {
	if (!address || address.length < 10) return address;
	return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };