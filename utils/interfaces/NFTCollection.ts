import type { NFT } from "./NFT";

export interface NFTCollection {
	id: number;
	name: string;
	symbol: string;
	category: string;
	userId: number;
	bannerImg: string;
	contractAddress: string;
	nfts: NFT[];
	createdAt: string;
}
