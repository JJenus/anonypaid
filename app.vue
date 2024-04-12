<script setup>
	const appSettings = useAppSettings();
	const loading = appSettings.isPageLoading;

	if (process.client) {
		const defaultThemeMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches
			? "dark"
			: "light";

		let themeMode;

		if (localStorage.getItem("data-bs-theme") !== null) {
			themeMode = localStorage.getItem("data-bs-theme");
		} else {
			themeMode = defaultThemeMode;
		}

		// KTThemeMode.setMode(themeMode);

		appSettings.themeMode.value = themeMode;
		KTThemeMode.setMode(themeMode);
	}

	onMounted(() => {
		if (process.client) {
			var target = document.querySelector("#block-ui");
			var blockUI = new KTBlockUI(target, {
				zIndex: "200000",
				overlayClass: "bg-body bg-opacity-100 vh-100 position-fixed",
				message:
					'<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
			});
			blockUI.block();

			setTimeout(() => {
				blockUI.release();
				loading.value = false;
			}, 2000);
		}
	});
</script>

<template>
	<div id="block-ui">
		<NuxtLayout :class="loading ? 'd-none' : ''">
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Lobster&family=Truculenta:opsz,wght@12..72,800&display=swap");

	/* 
	font-family: 'Lobster', cursive;
font-family: 'Truculenta', sans-serif;
	 */
	.logo-color {
		columns: #226b8d;
	}
	.zipay-logo-dark {
		color: rgb(255, 93, 83);
	}

	@media (max-width: 765px) {
		.mobile-aside {
			padding-bottom: 60px !important;
		}
	}

	/* Remove up and down arrows (spinners) from number input */
	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		appearance: none;
		margin: 0;
	}
</style>
