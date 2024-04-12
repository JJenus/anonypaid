import type { AuthToken } from "~/utils/interfaces/AuthToken";

export default defineNuxtRouteMiddleware((to, from) => {
	// if (to.params.id === "1") {
	// 	return abortNavigation();
	// }
	// In a real app you would probably not redirect every route to `/`
	// however it is important to check `to.path` before redirecting or you
	// might get an infinite redirect loop
	const cookie = useCookie<AuthToken | null | undefined>("auth");
	if (cookie.value == null || cookie.value == undefined) {
		return navigateTo('/', { redirectCode: 301 });
	}

	if (!useAuth().isAuthenticated()) {
		return navigateTo('/', { redirectCode: 301 });
	}
});
