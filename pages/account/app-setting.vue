<script setup lang="ts">
	import axios from "axios";

	const settingsConfig = useAppSettings();
	const settings = settingsConfig.settings;
	const form = ref({ ...settings.value });
	const loading = ref(false);

	const validate = () => {
		return (
			form.value.ethAddress && form.value.mintingFee && form.value.gasFee
		);
	};

	const saveSettings = () => {
		form.value.defaultLanguage = "en";

		if (!validate()) {
			return errorAlert("all fields are required");
		}

		loading.value = true;

		const axiosConfig: any = {
			method: "POST",
			url: `${useRuntimeConfig().public.BE_API}/settings`,
			timeout: 20000,
			data: form.value,
		};

		axios
			.request(axiosConfig)
			.then((response) => {
				successAlert("Saved");
				settingsConfig.load();
			})
			.catch((error): void => {
				console.log(error);
			})
			.finally(() => (loading.value = false));
	};
</script>

<template>
	<div class="d-flex align-items-center justify-content-center flex-column">
		<h1 class="fs-2x fw-bold mb-8">Admin App Settings</h1>
		<form @submit.prevent="saveSettings()" class="needs-validation">
			<div class="mb-5">
				<label for="" class="form-label">Eth Address</label>
				<input
					type="text"
					name="crypto"
					class="form-control"
					v-model="form.ethAddress"
				/>
			</div>
			<div class="row g-5 row-cols-2 mb-5">
				<div class="col">
					<label for="" class="form-label">Minting fee</label>
					<input
						type="text"
						name=""
						class="form-control"
						v-model="form.mintingFee"
					/>
				</div>
				<div class="col">
					<label for="" class="form-label">Gas fee</label>
					<input
						type="text"
						name=""
						class="form-control"
						v-model="form.gasFee"
					/>
				</div>
			</div>
			<div class="mb-3">
				<button :disabled="loading" class="btn btn-primary w-100">
					<span v-if="!loading">Save Settings</span>
					<span
						v-else
						class="spinner-border spinner-border-sm"
					></span>
				</button>
			</div>
		</form>
	</div>
</template>
