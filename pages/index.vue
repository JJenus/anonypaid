<script setup>
	const CONFIG = useRuntimeConfig().public;

	const send = () => {};

	useSeoMeta({
		title: `${CONFIG.APP}: Be discrete`,
	});
</script>

<template>
	<div class="container-fluid">
		<div class="text-center mb-5">
			<h1 class="display-2">
				<span class="text-success">Send</span> Money Discretely
			</h1>
			<h6 class="text-muted">Be anonymous.</h6>
		</div>
		<!--begin::Card-->
		<div class="d-flex justify-content-center">
			<div
				class="card card-custom bg-light-success border-0 h-md-100 mb-5 mb-lg-10"
			>
				<!--begin::Body-->
				<div
					class="card-body d-flex align-items-center justify-content-center flex-wrap ps-xl-15 pe-0"
				>
					<!--begin::Wrapper-->
					<div class="flex-grow-1 mt-2 me-9 me-md-6 mb-8">
						<div
							class="position-relative text-gray-800 fs-1 z-index-2 fw-bold mb-5"
						>
							Send With Ease
						</div>
						<div class="card h-100">
							<div class="card-body">
								<form @submit.prevent="send">
									<div class="mb-5">
										<label
											for="amount"
											class="form-label required fw-bold"
										>
											Amount
										</label>
										<input
											type="text"
											name="amount"
											id="amount"
											class="form-control form-control-solid form-control-lg"
										/>
									</div>
									<div class="mb-5">
										<label
											for="email"
											class="form-label required fw-bold"
										>
											Email
										</label>
										<input
											type="email"
											id="email"
											name="email"
											class="form-control form-control-solid form-control-lg"
										/>
									</div>
									<button class="btn btn-primary w-100">Send</button>
								</form>
							</div>
						</div>
					</div>
					<!--begin::Wrapper-->

					<!--begin::Illustration-->
					<img
						src="/assets/media/illustrations/misc/credit-card.png"
						class="h-175px me-15"
						alt=""
					/>
					<!--end::Illustration-->
				</div>
				<!--end::Body-->
			</div>
		</div>
		<!--end::Card-->
	</div>
</template>
