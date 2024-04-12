<script setup lang="ts">
	import axios from "axios";
	import type { AuthToken } from "~/utils/interfaces/AuthToken";

	const appConfig = useRuntimeConfig();
	const auth = useAuth();
	const form = ref({
		email: "",
		password: "",
		bannerImg: "/assets/media/misc/layout/customizer-header-bg.jpg",
	});

	const authToken: AuthToken = {
		userId: "",
		user: undefined,
		token: "",
	};

	const found = ref<boolean | null>(null);
	const foundUser = ref<any>();
	const findButton = ref();
	const loginButton = ref();
	const regButton = ref();
	const closeModalBtn = ref();

	const isInvalidCredentials = ref<boolean | null>(null);
	const passwordType = ref("password");
	const invalidMessage = ref("");

	const validateEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validPassword = () => {
		// Define criteria for password strength
		const password = form.value.password;
		const minLength = 6;

		// Regular expressions for character types
		const upperCaseRegex = /[A-Z]/;
		const lowerCaseRegex = /[a-z]/;
		const digitRegex = /[0-9]/;
		const specialCharRegex = /[^A-Za-z0-9]/; // Anything that's not a letter or digit

		// Check length
		if (password.length < minLength) {
			invalidMessage.value = "Password is too short";
			return false;
		}

		// Check for uppercase letters
		else if (!upperCaseRegex.test(password)) {
			invalidMessage.value =
				"Password must contain at least one uppercase letter";
			return false;
		}

		// Check for lowercase letters
		else if (!lowerCaseRegex.test(password)) {
			invalidMessage.value =
				"Password must contain at least one lowercase letter";
			return false;
		}

		// Check for digits
		else if (!digitRegex.test(password)) {
			invalidMessage.value = "Password must contain at least one digit";
			return false;
		}

		// Check for special characters
		else if (!specialCharRegex.test(password)) {
			invalidMessage.value =
				"Password must contain at least one special character";
			return false;
		}

		// If all criteria are met, return a success message
		invalidMessage.value = "Password is strong";

		return true;
	};

	const toggleType = () => {
		if (passwordType.value == "password") {
			passwordType.value = "text";
		} else {
			passwordType.value = "password";
		}
	};

	const login = () => {
		const axiosConfig: any = {
			method: "post",
			data: form.value,
			url: `${appConfig.public.BE_API}/auth/login`,
			timeout: 20000,
		};

		loginButton.value.setAttribute("data-kt-indicator", "on");

		axios
			.request(axiosConfig)
			.then((response) => {
				authToken.user = response.data;
				authToken.userId = response.data.id;
				closeModalBtn.value.click();
				auth.login(authToken);
				// successAlert("Welcome!");
			})
			.catch((error): void => {
				const errRes = error.response;
				console.log("Status: ", errRes?.status);
				if (
					errRes?.status !== null &&
					(errRes?.status === 401 || errRes?.status === 404)
				) {
					isInvalidCredentials.value = true;
					invalidMessage.value = errRes.data.description;
					console.log(errRes.data);
				} else errorAlert("Error occurred, check your internet!");
				console.log(error);
			})
			.finally(() => {
				loginButton.value.removeAttribute("data-kt-indicator");
			});
	};

	const createAccount = () => {
		const axiosConfig: any = {
			method: "post",
			data: form.value,
			url: `${appConfig.public.BE_API}/auth/register`,
			timeout: 30000,
		};

		regButton.value.setAttribute("data-kt-indicator", "on");

		axios
			.request(axiosConfig)
			.then((response): void => {
				console.log(response.data);
				authToken.user = response.data;
				authToken.userId = response.data.id;
				auth.login(authToken);
			})
			.catch((error): void => {
				console.log(error);
			})
			.finally(() => {
				regButton.value.removeAttribute("data-kt-indicator");
			});
	};

	const find = () => {
		const axiosConfig: any = {
			method: "post",
			data: form.value,
			url: `${appConfig.public.BE_API}/auth/find`,
			timeout: 15000,
		};

		findButton.value.setAttribute("data-kt-indicator", "on");

		axios
			.request(axiosConfig)
			.then((response) => {
				console.log(response.data);
				found.value = true;
				foundUser.value = response.data;
			})
			.catch((error): void => {
				found.value = false;
				console.log(error);
			})
			.finally(() => {
				findButton.value.removeAttribute("data-kt-indicator");
			});
	};
</script>
<template>
	<div class="modal fade" tabindex="-1" id="kt_modal_login">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content w-300px mx-auto">
				<div class="modal-header border-0 position-relative">
					<div class="d-flex flex-column modal-title w-100">
						<div
							class="fw-bold position-relative d-flex align-items-center justify-content-center fs-5"
						>
							<NFTexLogoMini></NFTexLogoMini>
							<span
								class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-20 mb-5 position-absolute bottom-0"
								>Pro</span
							>
						</div>

						<a
							href="#"
							class="fw-bold text-center text-primaryi text-hover-primary fs-5"
						>
							NFTex
						</a>
					</div>

					<!--begin::Close-->
					<div
						ref="closeModalBtn"
						class="btn btn-icon btn-icon-danger btn-sm btn-active-light-primary ms-2 end-0 position-absolute top-0 m-4"
						data-bs-dismiss="modal"
						aria-label="Close"
					>
						<i class="ki-duotone ki-cross fs-3x"
							><span class="path1"></span
							><span class="path2"></span
						></i>
					</div>
					<div
						@click="found = null"
						v-if="found !== null"
						class="btn btn-icon btn-sm btn-active-light-primary fw-bold start-0 position-absolute top-0 m-4"
						aria-label="Close"
					>
						<i class="ki-solid ki-left fs-3x"></i>
					</div>
					<!--end::Close-->
				</div>

				<div class="modal-body">
					<form v-if="found" @submit.prevent="login()">
						<div
							class="d-flex flex-column justify-content-center align-items-center"
						>
							<div class="fs-2">Login</div>
							<div
								class="fs-6 text-muted mb-5 text-center fw-bold"
							>
								Welcome back {{ foundUser.name }}
							</div>
						</div>
						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Email</label>
							<input
								disabled
								type="email"
								class="form-control form-control-solid"
								v-model="form.email"
								name="email"
							/>
						</div>
						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Password</label>
							<div
								class="d-flex align-items-center justify-content-center flex-column position-relative"
								bis_skin_checked="1"
							>
								<input
									:class="
										isInvalidCredentials ? 'is-invalid' : ''
									"
									:type="passwordType"
									class="form-control form-control-solid pe-10 w-100"
									placeholder="password"
									v-model="form.password"
								/>
								<div class="invalid-feedback">
									{{ invalidMessage }}
								</div>

								<button
									@click.prevent="toggleType()"
									type="button"
									class="btn position-absolute btn-active-icon-danger me-3 bg-transparent p-0 end-0"
								>
									<i
										v-if="passwordType == 'password'"
										class="ki-outline ki-eye fs-3 hover-scale"
									></i>
									<i
										v-else
										class="ki-outline ki-eye-slash fs-3 hover-scale"
									></i>
								</button>
							</div>
						</div>

						<!--begin::Menu item-->
						<div class="menu-item px-5">
							<button
								ref="loginButton"
								class="btn btn-secondary w-100"
							>
								<span class="indicator-label"> Login </span>
								<!--end::Indicator label-->

								<!--begin::Indicator progress-->
								<span class="indicator-progress">
									Please wait...
									<span
										class="spinner-border align-middle ms-2"
									></span>
								</span>
							</button>
						</div>
					</form>
					<form
						v-else-if="found === false"
						@submit.prevent="createAccount()"
					>
						<div
							class="d-flex justify-content-center align-items-center"
						>
							<div>
								<div class="fs-2">Create New Account</div>
								<div
									class="fs-6 text-muted mb-5 text-center fw-bold"
								>
									Email doesn't exist
								</div>
							</div>
						</div>
						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Email</label>
							<input
								disabled
								type="email"
								class="form-control form-control-solid"
								v-model="form.email"
								name="email"
							/>
						</div>
						<div class="px-5 menu-item mb-3">
							<label for="" class="form-label">Password</label>
							<div
								class="d-flex align-items-center justify-content-center flex-column position-relative"
								bis_skin_checked="1"
							>
								<input
									:class="
										validPassword() === false
											? 'is-invalid'
											: ''
									"
									:type="passwordType"
									class="form-control form-control-solid pe-10 w-100"
									placeholder="password"
									v-model="form.password"
								/>
								<div class="invalid-feedback">
									{{ invalidMessage }}
								</div>

								<button
									@click.prevent="toggleType()"
									:class="
										!validPassword()
											? form.password.length >= 6
												? 'mb-12'
												: 'mb-10'
											: ''
									"
									type="button"
									class="btn position-absolute btn-active-icon-danger me-3 bg-transparent p-0 end-0"
								>
									<i
										v-if="passwordType == 'password'"
										class="ki-outline ki-eye fs-3 hover-scale"
									></i>
									<i
										v-else
										class="ki-outline ki-eye-slash fs-3 hover-scale"
									></i>
								</button>
							</div>
						</div>

						<!--begin::Menu item-->
						<div class="menu-item px-5">
							<button
								:disabled="!validPassword()"
								ref="regButton"
								class="btn btn-secondary w-100"
							>
								<span class="indicator-label">
									Create account
								</span>
								<!--end::Indicator label-->

								<!--begin::Indicator progress-->
								<span class="indicator-progress">
									Please wait...
									<span
										class="spinner-border align-middle ms-2"
									></span>
								</span>
							</button>
						</div>
					</form>

					<form v-if="found == null" @submit.prevent="find()">
						<div class="px-5 menu-item mb-3">
						<label class="form-label">Email</label>
							<input
								:class="
									!validateEmail(form.email) && form.email
										? 'is-invalid'
										: ''
								"
								required
								v-model="form.email"
								type="email"
								class="form-control"
								name="email"
								placeholder="example-collector@gmail.com"
							/>
							<div class="invalid-feedback">
								Invalid email address
							</div>
						</div>

						<!--begin::Menu item-->
						<div class="menu-item px-5">
							<button
								:disabled="!validateEmail(form.email)"
								ref="findButton"
								class="btn btn-secondary w-100"
							>
								<!--begin::Indicator label-->
								<span class="indicator-label"> Proceed </span>
								<!--end::Indicator label-->

								<!--begin::Indicator progress-->
								<span class="indicator-progress">
									<!-- Please wait... -->
									<span
										class="spinner-border align-middle ms-2"
									></span>
								</span>
								<!--end::Indicator progress-->
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
