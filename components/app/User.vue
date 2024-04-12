<script setup lang="ts">
	import currency from "currency.js";
	import type { IUser } from "~/utils/interfaces/IUser";

	const active = userData().active;

	const props = defineProps<{ user: IUser }>();

	const balance = () => {
		let cAmount = props.user.balance;
		if (!cAmount) {
			cAmount = "0";
		}
		const amount = currency(cAmount, {
			symbol: "",
			precision: 8
		}).format();
		return amount;
	};
</script>

<template>
	<!--begin::Card-->
	<div
		@click="active = user"
		class="card user border-dashed border-primary"
		bis_skin_checked="1"
	>
		<!--begin::Card body-->
		<div
			class="card-body d-flex flex-center flex-column py-9 px-5"
			bis_skin_checked="1"
		>
			<!--begin::Avatar-->
			<div
				class="symbol symbol-65px symbol-circle mb-5"
				bis_skin_checked="1"
			>
				<img
					:src="user.profileImg || $config.public.DEFAULT_DP"
					alt="image"
				/>
				<div
					class="bg-success position-absolute rounded-circle translate-middle start-100 top-100 border border-4 border-body h-15px w-15px ms-n3 mt-n3"
					bis_skin_checked="1"
				></div>
			</div>
			<!--end::Avatar-->

			<!--begin::Name-->
			<a
				role="button"
				class="fs-4 text-gray-800 text-hover-primary fw-bold mb-0"
			>
				{{ user.name ? user.name : "unknown collector" }}
			</a>
			<!--end::Name-->

			<!--begin::Position-->
			<div class="fw-semibold text-gray-400 mb-6" bis_skin_checked="1">
				{{ user.email }}
			</div>
			<!--end::Position-->

			<!--begin::Info-->
			<div class="d-flex flex-center flex-wrap mb-0" bis_skin_checked="1">
				<!--begin::Stats-->
				<div
					class="border border-dashed rounded min-w-90px py-3 px-4 mx-2 mb-3"
					bis_skin_checked="1"
				>
					<div
						class="fs-6 fw-bold text-gray-700"
						bis_skin_checked="1"
					>
						<i
							class="fa-brands fa-ethereum fs-2 text-warning me-1"
						></i>
						{{ balance() }}
					</div>
					<div class="fw-semibold text-gray-400" bis_skin_checked="1">
						Balance
					</div>
				</div>
				<!--end::Stats-->
			</div>
			<!--end::Info-->

			<!--begin::Follow-->

			<!--end::Follow-->
		</div>
		<!--begin::Card body-->
	</div>
	<!--begin::Card-->
</template>
