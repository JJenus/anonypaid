import type { IUser } from "./IUser";

export type AuthToken = {
	userId: string;
	user: IUser | any;
	token: string;
};
