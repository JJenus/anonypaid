<script setup>
	import currency from "currency.js";
	definePageMeta({
		layout: ["app"],
		middleware: "auth",
	});

	const CONFIG = useRuntimeConfig().public;
	const currentPage = "User Dashboard";

	useSeoMeta({
		title: `${CONFIG.APP} - ${currentPage}`,
	});

	const auth = useAuth();
	if (!auth.isAuthenticated()) {
		auth.logout();
	}

	const user = userData().data;

	const route = useRoute();
	const active = ref("collected");

	const navs = [
		{
			name: "All",
			path: "/account/",
		},
		{
			name: "Collections",
			path: "/account/collections",
		},
		{
			name: "Created",
			path: "/account/created",
		},
	];

	const balance = () => {
		return currency(user.value.balance, { symbol: "length", precision: 8 });
	};
	onMounted(() => {
		const paths = route.path.split("/");
		console.log("ROUTE", paths);
		if (paths[2]) {
			active.value = paths[2];
		} else {
			active.value = "all";
		}
	});
</script>

<template>
	<div v-if="auth.isAuthenticated()">
		<div class="mb-8">
			<div>
				<div class="card card-flush mb-9" id="kt_user_profile_panel">
					<!--begin::Hero nav-->
					<div
						class="card-header rounded-top bgi-size-cover h-200px"
						:style="`background-position: 100% 50%;
							background-image: url('${
								user.bannerImg
									? user.bannerImg
									: '/assets/media/auth/bg11-dark.jpg'
							}');`"
					></div>
					<!--end::Hero nav-->

					<!--begin::Body-->
					<div class="card-body mt-n19">
						<!--begin::Details-->
						<div class="m-0">
							<!--begin: Pic-->
							<div
								class="d-flex flex-stack align-items-end pb-4 mt-n19"
							>
								<div
									class="overlay overflow-hidden symbol symbol-125px symbol-circle symbol-lg-150px symbol-fixed position-relative mt-n3"
								>
									<img
										:src="
											user.profileImg
												? user.profileImg
												: 'https://robohash.org/nftexchaing.png'
										"
										alt="image"
										class="overlay-wrapper border border-white border-4 rounded-circle"
									/>
									<div
										class="position-absolute translate-middle bottom-0 start-100 ms-n1 bg-success rounded-circle h-15px w-15px"
									></div>
									<div
										class="overlay-layer bg-dark bg-opacity-25"
									>
										<button
											data-kt-image-input-action="change"
											data-bs-toggle="tooltip"
											data-bs-dismiss="click"
											title="Change avatar"
											class="btn btn-sm btn-icon btn-icon-white btn-active-icon-secondary"
										>
											<i class="ki-solid ki-pencil fs-1">
											</i>
											<input
												@change="changeImage($event)"
												class="d-none"
												type="file"
												name="avatar"
												accept=".png, .jpg, .jpeg"
											/>
										</button>
									</div>
								</div>
							</div>
							<!--end::Pic-->

							<!--begin::Info-->
							<div
								class="d-flex flex-stack flex-wrap align-items-end"
							>
								<!--begin::User-->
								<div class="d-flex flex-column">
									<!--begin::Name-->
									<div class="d-flex align-items-center mb-2">
										<a
											href="#"
											class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
										>
											{{
												user.name
													? user.name
													: "unknown collector"
											}}</a
										>
										<a
											href="#"
											class=""
											data-bs-toggle="tooltip"
											data-bs-placement="right"
											aria-label="Account is verified"
											data-bs-original-title="Account is verified"
											data-kt-initialized="1"
										>
											<i
												class="ki-outline ki-verify fs-1 text-primary"
											></i>
										</a>
									</div>
									<!--end::Name-->

									<!--begin::Text-->
									<span
										class="fw-bold d-none text-gray-600 fs-6 mb-2 d-block"
									>
										Explore the limitless possibilities of
										digital ownership. NFTex, where
										creativity meets the blockchain!
									</span>
									<!--end::Text-->

									<div
										class="d-flex align-items-center fw-bold fs-2 mb-3"
									>
										<i
											class="fa-brands fa-ethereum fs-2 text-warning me-1"
										></i>
										<span class="pb-0">
											{{ balance() }} ETH
										</span>
									</div>

									<!--begin::Info-->
									<div
										class="d-flex align-items-center flex-wrap fw-semibold fs-7 pe-2"
									>
										<span
											class="bullet bullet-dot h-5px w-5px bg-gray-400 me-3"
										></span>
										<a
											href="#"
											class="mw-200px mw-lg-400px text-truncate text-info itext-gray-400 text-hover-primary"
										>
											{{ user.ethAddress }}
										</a>

										<span
											class="bullet bullet-dot h-5px w-5px bg-gray-400 ms-3"
										></span>
									</div>
									<!--end::Info-->
									<div class="mt-5">
										<a
											href="/crypto/fund-wallet"
											class="btn btn-primary w-200px w-lg-350px"
										>
											Fund wallet
										</a>
									</div>
								</div>
								<!--end::User-->

								<!--begin::Actions-->
								<div class="d-flex">
									<NuxtLink
										v-if="userData().isAdmin()"
										to="/account/app-setting"
										class="btn btn-sm btn-secondary bg-body btn-icon"
									>
										<i
											class="ki-outline ki-setting-2 fs-2"
										></i>

										<!--end::Indicator progress-->
									</NuxtLink>
									<button
										v-else
										class="btn btn-sm btn-secondary bg-body btn-icon d-none"
									>
										<i
											class="ki-outline ki-setting-2 fs-2"
										></i>

										<!--end::Indicator progress-->
									</button>
								</div>
								<!--end::Actions-->
							</div>
							<!--end::Info-->
						</div>
						<!--end::Details-->
					</div>
				</div>
			</div>
			<div>
				<div
					id="kt_user_profile_nav"
					class="rounded bg-gray-200 d-flex flex-stack flex-wrap mb-9 p-2"
					data-kt-sticky="false"
					data-kt-sticky-width="{default: '100%'}"
					data-kt-sticky-animation="true"
					data-kt-sticky-zindex="1295"
				>
					<div class="hover-scroll-xi hide-scrollbar">
						<!--begin::Nav-->
						<ul class="nav flex-wraip border-transparent">
							<!--begin::Nav item-->
							<li
								v-for="nav in navs"
								@click="active = nav.name"
								class="nav-item my-1"
							>
								<NuxtLink
									:class="
										active == nav.name.toLowerCase()
											? 'active'
											: ''
									"
									:to="nav.path"
									class="btn btn btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-5 fs-lg-base nav-link px-3 px-lg-4 mx-1"
								>
									{{ nav.name }}
								</NuxtLink>
							</li>
							<li
								v-if="user.userRole === 'admin'"
								@click="active = 'users'"
								:class="
									user.userRole !== 'admin' ? 'd-none' : ''
								"
								class="nav-item my-1"
							>
								<NuxtLink
									:class="active == 'users' ? 'active' : ''"
									to="/account/users"
									class="btn btn btn-color-gray-600 bg-state-body btn-active-color-gray-800 fw-bolder fw-bold fs-5 fs-lg-base nav-link px-3 px-lg-4 mx-1"
								>
									Users
								</NuxtLink>
							</li>
						</ul>
						<!--end::Nav-->
					</div>
				</div>
			</div>
		</div>

		<NuxtPage></NuxtPage>
	</div>
</template>
