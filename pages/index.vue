<!-- pages/index.vue -->
<script setup>
	import { ref, watch } from "vue";
	import { useRoute } from "vue-router";

	const route = useRoute();
	const activeTab = ref("send"); // Default tab

	// Watch for hash changes
	watch(
		() => route.hash, // Watch the hash value in the route
		(newHash) => {
			const hash = newHash.replace("#", ""); // Remove the '#' from the hash
			if (hash === "send" || hash === "claim") {
				activeTab.value = hash; // Update the active tab
			}
		},
		{ immediate: true } // Trigger the watcher immediately on mount
	);
</script>

<template>
	<div class="container-fluid">
		<div class="d-flex justify-content-center">
			<div
				class="card min-h-md-600px min-w-md-700px"
				bis_skin_checked="1"
			>
				<!--begin::Header-->
				<div
					class="card-header position-relative min-h-50px p-0 border-bottom-2"
					bis_skin_checked="1"
				>
					<!--begin::Nav-->
					<ul
						class="nav nav-pills nav-pills-custom d-flex position-relative w-100"
						role="tablist"
					>
						<!--begin::Item-->
						<li class="nav-item mx-0 p-0 w-50" role="presentation">
							<!--begin::Link-->
							<NuxtLink
								class="nav-link btn btn-color-muted border-0 h-100 px-0"
								:class="{ active: activeTab === 'send' }"
								to="#send"
								role="tab"
							>
								<!--begin::Subtitle-->
								<span class="nav-text fw-bold fs-4 mb-3">
									Send
								</span>
								<!--end::Subtitle-->

								<!--begin::Bullet-->
								<span
									class="bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded"
								></span>
								<!--end::Bullet-->
							</NuxtLink>
							<!--end::Link-->
						</li>
						<!--end::Item-->

						<!--begin::Item-->
						<li class="nav-item mx-0 px-0 w-50" role="presentation">
							<!--begin::Link-->
							<NuxtLink
								class="nav-link btn btn-color-muted border-0 h-100 px-0"
								:class="{ active: activeTab === 'claim' }"
								to="#claim"
								role="tab"
							>
								<!--begin::Subtitle-->
								<span class="nav-text fw-bold fs-4 mb-3">
									Claim
								</span>
								<!--end::Subtitle-->

								<!--begin::Bullet-->
								<span
									class="bullet-custom position-absolute z-index-2 w-100 h-2px top-100 bottom-n100 bg-primary rounded"
								></span>
								<!--end::Bullet-->
							</NuxtLink>
							<!--end::Link-->
						</li>
						<!--end::Item-->
					</ul>
					<!--end::Nav-->
				</div>
				<!--end::Header-->

				<!--begin::Body-->
				<div class="card-body" bis_skin_checked="1">
					<!--begin::Tab Content-->
					<div class="tab-content" bis_skin_checked="1">
						<!--begin::Tap pane-->
						<div
							class="tab-pane fade"
							:class="{ 'active show': activeTab === 'send' }"
							role="tabpanel"
							bis_skin_checked="1"
						>
							<MakePayment />
						</div>
						<!--end::Tap pane-->

						<!--begin::Tap pane-->
						<div
							class="tab-pane fade"
							:class="{ 'active show': activeTab === 'claim' }"
							role="tabpanel"
							bis_skin_checked="1"
						>
							<Withdraw />
						</div>
						<!--end::Tap pane-->
					</div>
					<!--end::Tab Content-->
				</div>
				<!--end: Card Body-->
			</div>
		</div>
	</div>
</template>
