import axios from "axios";
import type { NFT } from "~/utils/interfaces/NFT";
import type { NFTCollection } from "~/utils/interfaces/NFTCollection";

export const useCollections = () => {
	const all = useState<NFTCollection[]>("all-transactions", () => []);
	const allNFTs = useState<any[]>("all-nfts", () => []);
	const art = useState<NFTCollection[]>("art-transactions", () => []);
	const music = useState<NFTCollection[]>("music-transactions", () => []);
	const photography = useState<NFTCollection[]>("pic-transactions", () => []);
	const gaming = useState<NFTCollection[]>("gaming-transactions", () => []);
	const userCollections = useState<NFTCollection[]>(
		"user-collections",
		() => []
	);
	const userNFts = useState<NFT[]>("user-nfts", () => []);

	const load = (val: any, url: string) => {
		const axiosConfig: any = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/collections${url}`,
			timeout: 20000,
			// headers: {
			//     Authorization: "Bearer " + useAuth().userData.value?.token,
			// },
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				val.value = response.data;
				console.log(url, val.value);
			})
			.catch((error): void => {
				console.log(error);
			});
	};

	const loadUserCollections = (val: any, url: string) => {
		const axiosConfig: any = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}${url}`,
			timeout: 20000,
			// headers: {
			//     Authorization: "Bearer " + useAuth().userData.value?.token,
			// },
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				val.value = response.data;
				// console.log(val.value);
			})
			.catch((error): void => {
				console.log(error);
			});
	};

	if (useAuth().isAuthenticated()) {
		loadUserCollections(
			userCollections,
			`/users/${userData().data.value.id}/collections`
		);
		loadUserCollections(
			userNFts,
			`/users/${userData().data.value.id}/nfts`
		);
		loadUserCollections(allNFTs, `/nfts`);
	}

	load(all, "");
	load(art, "/category/art");
	load(music, "/category/music");
	load(photography, "/category/photography");
	load(gaming, "/category/gaming");

	return {
		all,
		art,
		music,
		photography,
		gaming,
		userCollections,
		userNFts,
		allNFTs,
	};
};
