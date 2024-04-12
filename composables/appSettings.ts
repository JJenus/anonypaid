import axios from "axios";
import type { AppSettings } from "~/utils/interfaces/AppSettings";

export const useAppSettings = () => {
	const init: AppSettings = {
		id: 0,
		ethAddress: "",
		defaultLanguage: "",
		mintingFee: "",
		gasFee: "",
		createdAt: "",
		updatedAt: "",
	};
	const settings = useState<AppSettings>("app-settings", () => init);
	const isPageLoading = useState("load-page", () => true);
	const themeMode = useState("app-theme-mode", () => "light");

	const load = () => {
		const axiosConfig: any = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/settings`,
			timeout: 20000,
			// headers: {
			//     Authorization: "Bearer " + useAuth().userData.value?.token,
			// },
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				settings.value = response.data;
				// console.log(settings.value);
			})
			.catch((error): void => {
				console.log(error);
			});
	};

	load();

	return {
		settings,
		isPageLoading,
		themeMode,
		load,
	};
};
