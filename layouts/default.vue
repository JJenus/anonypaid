<script setup>
	const config = useRuntimeConfig().public;
	useCollections();

	if (process.client) {
		KTThemeMode.setMode("light");
	}
	const route = useRoute();
	console.log();
	const user = userData().data;

	const loaded = useCookie("reload", { maxAge: 60 * 60 * 24 });
	loaded.value = false;
	const showNav = ref(false);

	onMounted(() => {
		if (process.client) {
			KTThemeMode.setMode("dark");
		}
	});
</script>

<template>
	<div
		id="kt_app_body"
		data-kt-app-header-fixed-mobile="true"
		data-kt-app-sidebar-enabled="true"
		data-kt-app-sidebar-push-header="true"
		data-kt-app-sidebar-push-toolbar="true"
		data-kt-app-sidebar-push-footer="true"
		class="app-default w-100 overflow-hidden"
	>
		<!--begin::App-->
		<div class="d-flex flex-column flex-root app-root" id="kt_app_root">
			<!--begin::Page-->
			<div
				class="app-page flex-column flex-column-fluid"
				id="kt_app_page"
			>
				<!--begin::Header-->
				<Header />
				<!--end::Header-->
				<!--begin::Wrapper-->
				<div
					class="app-wrapper flex-column flex-row-fluid"
					id="kt_app_wrapper"
				>
					<!--begin::Main-->
					<div
						class="app-main flex-column flex-row-fluid"
						id="kt_app_main"
					>
						<!--begin::Content wrapper-->
						<div class="d-flex flex-column flex-column-fluid">
							<!--begin::Content-->
							<div
								id="kt_app_content"
								class="app-content flex-column-fluid"
							>
								<div
]									class="mb-3 container"
								>
									<!-- <Navbar /> -->
								</div>

								<!--begin::Content container-->
								<div
									style="position: relative"
									id="kt_app_content_container"
									class="app-container position-relative"
								>
									<slot />
								</div>
								<!--end::Content container-->
							</div>
							<!--end::Content-->
						</div>
						<!--end::Content wrapper-->

						<!--begin::Footer-->
						<Footer />
						<!--end::Footer-->
					</div>
					<!--end:::Main-->
				</div>
				<!--end::Wrapper-->
			</div>
			<!--end::Page-->
		</div>
		<!--end::App-->

		<!--begin::Scrolltop-->
		<div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">
			<i class="ki-outline ki-arrow-up"></i>
		</div>
		<!--end::Scrolltop-->
		<LoginMenu />

		<!--begin::View component-->
		<MobileNav class="d-lg-none" />
		<!--end::View component-->
	</div>
</template>

<style scoped>
	.hide-scrollbar {
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */
	}

	.hide-scrollbar::-webkit-scrollbar {
		display: none; /* WebKit (Chrome, Safari, etc.) */
	}
</style>
