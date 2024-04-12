<script setup lang="ts">
	import { type IUser } from "~/utils/interfaces/IUser";
	import axios, {
		AxiosError,
		type AxiosRequestConfig,
		type AxiosResponse,
	} from "axios";

	import currency from "currency.js";

	const props = defineProps<{ user: IUser }>();

	const appConfig = useRuntimeConfig();
	const submitButton = ref();

	const form = ref({
		email: props.user.email,
		amount: "",
	});

	const iUser = ref(props.user);

	const cal = () => {
		const userBalance = currency(iUser.value.balance, {
			symbol: "",
			precision: 8,
		}).add(form.value.amount);

		iUser.value.balance = userBalance.value + "";
		console.log("user", iUser.value)
	};

	const save = () => {
		// successAlert("Saved!");
		console.log(form.value);
		if (!form.value.amount || !form.value.email) {
			errorAlert("Fill from correctly");
			return;
		}

		cal();

		const axiosConfig = {
			method: "put",
			data: iUser.value,
			url: `${appConfig.public.BE_API}/users`,
			timeout: 20000,
			headers: {
				Authorization: "Bearer " + useAuth().userData.value?.token,
			},
		};

		submitButton.value.setAttribute("data-kt-indicator", "on");

		axios
			.request(axiosConfig)
			.then((response) => {
				const data = response.data;
				console.log(data);
				successAlert("Saved! New balance: " + data.amount);
				userData().getUsers();
			})
			.catch((error) => {
				errorAlert("Unable to update balance");
				console.log(error);
			})
			.finally(() => {
				submitButton.value.removeAttribute("data-kt-indicator");
			});
	};
</script>

<template>
	<div class="card mb-5 mb-xl-10" bis_skin_checked="1">
		<!--begin::Content-->
		<div
			class="card-body d-flex flex-column justify-content-center align-items-center py-8"
			bis_skin_checked="1"
		>
			<div class="w-lg-400px">
				<div class="mb-13 text-center">
					<h1 class="mb-3">Top Up</h1>

					<div class="text-muted fw-semibold fs-5">
						Increase user balance. Only admin users can do this.
						<a role="button" class="link-primary fw-bold">(admin)</a
						>.
					</div>
				</div>
				<!--end::Heading-->

				<form
					@submit.prevent="save()"
					class="form fv-plugins-bootstrap5 fv-plugins-framework"
					action="#"
					data-select2-id="select2-data-kt_modal_new_card_form"
				>
					<!--begin::Input group-->
					<div
						class="d-flex flex-column mb-7 fv-row fv-plugins-icon-container"
					>
						<!--begin::Label-->
						<label
							class="d-flex align-items-center fs-6 fw-semibold form-label mb-2"
						>
							<span class="required">User Email</span>

							<span
								class="ms-1"
								data-bs-toggle="tooltip"
								aria-label="Specify a card holder's name"
								data-bs-original-title="Specify a card holder's name"
								data-kt-initialized="1"
							>
								<i
									class="ki-outline ki-information-5 text-gray-500 fs-6"
								></i
							></span>
						</label>
						<!--end::Label-->

						<input
							disabled
							type="text"
							class="form-control form-control-solid"
							placeholder="Enter user email"
							name="email"
							v-model="form.email"
						/>
						<div
							class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"
						></div>
					</div>
					<!--end::Input group-->

					<!--begin::Input group-->
					<div
						class="d-flex flex-column mb-7 fv-row fv-plugins-icon-container"
					>
						<!--begin::Label-->
						<label class="required fs-6 fw-semibold form-label mb-2"
							>Amount</label
						>
						<!--end::Label-->

						<!--begin::Input wrapper-->
						<div class="position-relative">
							<!--begin::Input-->
							<input
								type="text"
								class="form-control form-control-solid"
								placeholder="Enter Amount"
								name="amount"
								v-model="form.amount"
							/>
							<!--end::Input-->

							<!--begin::Card logos-->
						</div>
						<!--end::Input wrapper-->
						<div
							class="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"
						></div>
					</div>
					<!--end::Input group-->

					<!--begin::Actions-->
					<div class="text-center pt-15">
						<button
							type="reset"
							id="kt_modal_new_card_cancel"
							class="btn btn-light me-3"
						>
							Discard
						</button>

						<button
							type="submit"
							ref="submitButton"
							class="btn btn-primary"
						>
							<span class="indicator-label"> Submit </span>
							<span class="indicator-progress">
								Please wait...
								<span
									class="spinner-border spinner-border-sm align-middle ms-2"
								></span>
							</span>
						</button>
					</div>
					<!--end::Actions-->
				</form>
			</div>
		</div>
		<!--end::Content-->
	</div>
</template>
