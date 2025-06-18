import { useEffect, useState } from "react";
import { useContract } from "./NFTAuction";
import { useAccount } from "wagmi";
import { formatUnits } from "ethers";
import { shortenAddress } from "../lib/utils";



// Utility to format timestamps as relative time
const formatRelativeTime = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000); // Current UNIX timestamp in seconds
  const diff = now - timestamp;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 604800)}w ago`;
};

export interface ActivityItem {
  id: string;
  creator: string;
  title: string;
  type?: "bid" | "sale" | "mint" | "transfer";
  description: string;
  time: string;
  amount?: number;
  status?: "pending" | "completed";
}

export function useAuctionEvents(): ActivityItem[] {
  const { address } = useAccount();
  const { contract } = useContract();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  console.log(contract);
  useEffect(() => {
    if (!contract || !address) return;

    const addActivity = (item: ActivityItem) =>
      setActivities((prev) => [item, ...prev].slice(0, 50)); // Limit to 50 activities

    // AuctionCreated(uint256 indexed auctionId, address indexed creator, string metadataURI, uint256 startingBid, uint256 endTime, uint8 royalty)
    contract.on("AuctionCreated", (auctionId, creator, metadataURI, startingBid, endTime, royalty) => {
      const eth = Number(formatUnits(startingBid, "ether"));
	  console.log(metadataURI, royalty, endTime);
      addActivity({
        id: `${auctionId}-created-${Date.now()}`,
        creator: creator,
        type: "mint",
        title: `NFT Created #${auctionId}`,
        description: creator.toLowerCase() === address.toLowerCase()
          ? `You created an auction for ${eth.toFixed(3)} ETH`
          : `${shortenAddress(creator)} created an auction for ${eth.toFixed(3)} ETH`,
        time: formatRelativeTime(Math.floor(Date.now() / 1000)), // Use current time for creation
        amount: eth,
        status: "completed",
      });
    });

    // BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount)
    contract.on("BidPlaced", (auctionId, bidder, amount) => {
      const eth = Number(formatUnits(amount, "ether"));
      addActivity({
        id: `bid-${auctionId}-${Date.now()}`,
        creator: bidder,
        type: "bid",
        title: `Bid on #${auctionId}`,
        description: bidder.toLowerCase() === address.toLowerCase()
          ? `You bid ${eth.toFixed(3)} ETH`
          : `${shortenAddress(bidder)} bid ${eth.toFixed(3)} ETH`,
        time: "just now",
        amount: eth,
        status: "pending",
      });
    });

    return () => {
      contract.removeAllListeners("AuctionCreated");
      contract.removeAllListeners("BidPlaced");
    };
  }, [contract, address]);

  return activities;
}