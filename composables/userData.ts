import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import type { IUser } from "../utils/interfaces/IUser";
import {
	type INotification,
	NotificationStatus,
} from "../utils/interfaces/Notification";

export const userData = () => {
	const initUser: IUser = {
		id: "",
		name: "",
		email: "",
		profileImg: "/assets/media/svg/avatars/blank.svg",
		phone: "",
		status: "",
		userRole: "",
		createdAt: "",
		ethAddress: "",
		balance: "",
		bannerImg: "",
	};

	const transactions = useState<any[]>("user-transactions", () => []);
	const notifications = useState<INotification[]>("notifications", () => []);
	const newNotification = useState<boolean>("new-notifications", () => false);
	const data = useState<IUser>("userData", () => initUser);
	const users = useState<IUser[]>("users", () => []);
	const active = useState<IUser | null>("active-user");

	const getUsers = () => {
		if (!useAuth().userData.value?.user) {
			navigateTo("/sign-in");
		}
		const axiosConfig: AxiosRequestConfig = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/users`,
			timeout: 20000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<IUser[], any>) => {
				users.value = response.data
					.filter((e) => {
						return e.userRole !== "admin";
					})
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() -
							new Date(a.createdAt).getTime()
					);
				// console.log(users.value);
			})
			.catch((error) => {
				// console.log(error);
				const data = error.response.data;
				if (
					data.message.includes("Access denied") ||
					error.response.status === 401
				) {
					// console.log("Access denied");
				}
			});
	};

	const getNotifications = () => {
		const axiosConfig = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/notifications/${
				data.value.id
			}`,
			timeout: 15000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<INotification[], any>) => {
				notifications.value = response.data.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
				);

				notifications.value.forEach((notice) => {
					if (notice.status === NotificationStatus.UNREAD) {
						newNotification.value = true;
					}
				});
				// console.log(data);
			})
			.catch((error) => {
				// console.log(error);
			});
	};

	const showNotifications = () => {
		if (!newNotification.value) {
			return;
		}
		const axiosConfig = {
			method: "put",
			data: notifications.value,
			url: `${useRuntimeConfig().public.BE_API}/notifications/all`,
			timeout: 25000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<INotification[], any>) => {
				notifications.value = response.data.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime()
				);

				notifications.value.forEach((notice) => {
					if (notice.status === NotificationStatus.UNREAD) {
						newNotification.value = true;
					}
				});
				// console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const loadUser = () => {
		const axiosConfig: AxiosRequestConfig = {
			method: "get",
			url: `${useRuntimeConfig().public.BE_API}/users/${data.value.id}`,
			timeout: 20000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		axios
			.request(axiosConfig)
			.then((response: AxiosResponse<IUser, any>) => {
				data.value = response.data;
				// console.log(users.value);
			})
			.catch((error) => {
				// console.log(error);
				const data = error.response.data;
				if (
					data.message.includes("Access denied") ||
					error.response.status === 401
				) {
					console.log("Access denied");
				}
			});
	};

	const isAdmin = () => {
		return data.value.userRole === "admin";
	};

	const checkBalance = (fee: string): boolean => {
		if (isAdmin()) {
			return true;
		}
		const numFee = Number(fee);
		const numBalance = Number(data.value.balance);

		return numBalance >= numFee;
	};

	return {
		data,
		users,
		active,
		notifications,
		newNotification,
		transactions,
		getUsers,
		getNotifications,
		showNotifications,
		loadUser,
		isAdmin,
		checkBalance,
	};
};
