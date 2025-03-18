<script setup></script>

<template>
	<div class="container-fluid">
		<div class="d-flex justify-content-center">
			<div class="card min-h-md-600px min-w-md-700px" bis_skin_checked="1">
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
							<a
								class="nav-link btn btn-color-muted border-0 h-100 px-0"
								data-bs-toggle="pill"
								id="kt_forms_widget_1_tab_1"
								href="#kt_forms_widget_1_tab_content_1"
								aria-selected="false"
								role="tab"
								tabindex="-1"
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
							</a>
							<!--end::Link-->
						</li>
						<!--end::Item-->

						<!--begin::Item-->
						<li class="nav-item mx-0 px-0 w-50" role="presentation">
							<!--begin::Link-->
							<a
								class="nav-link btn btn-color-muted border-0 h-100 px-0 active"
								data-bs-toggle="pill"
								id="kt_forms_widget_1_tab_2"
								href="#kt_forms_widget_1_tab_content_2"
								aria-selected="true"
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
							</a>
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
							id="kt_forms_widget_1_tab_content_1"
							role="tabpanel"
							aria-labelledby="kt_forms_widget_1_tab_1"
							bis_skin_checked="1"
						>
							<MakePayment></MakePayment>
						</div>
						<!--end::Tap pane-->

						<!--begin::Tap pane-->
						<div
							class="tab-pane fade active show"
							id="kt_forms_widget_1_tab_content_2"
							role="tabpanel"
							aria-labelledby="kt_forms_widget_1_tab_2"
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
