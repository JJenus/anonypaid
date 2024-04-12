<script setup lang="ts">
	import type { NFTCollection } from "~/utils/interfaces/NFTCollection";

	const props = defineProps<{ collection: NFTCollection }>();
	const volume = ref(0);
	const floor = ref(99999);
	if (props.collection) {
		// console.log(props.collection);
		props.collection.nfts.forEach((e: any) => {
			volume.value += e.supply;
			const price = Number(e.price);
			// console.log("Price: ", price);
			if (floor.value > price) {
				floor.value = price;
			}
		});
	}
</script>
<template>
	<div class="card hover-elevate-up hover-slide card-stretch h-100">
		<NuxtLink
			:to="'/category/' + collection.category"
			class="card-body p-0 h-100"
		>
			<NuxtImg
				:src="collection.bannerImg"
				alt=""
				class="w-100 h-200px rounded-top"
			/>
		</NuxtLink>
		<div class="card-footer p-4 py-5">
			<!-- NUXTLInk -->
			<div>
				<h5 class="mb-2 fs-4 d-flex align-items-center">
					{{ collection.name }}
					<i
						class="ki-outline ki-check-circle text-success fs-2 ms-3"
					>
					</i>
				</h5>
				<div class="d-flex justify-content-between">
					<div class="d-flex flex-column">
						<div class="fs-5 text-muted">Floor</div>
						<div class="fs-4 fw-bold">
							{{ floor }}
						</div>
					</div>
					<div class="d-flex flex-column">
						<div class="fs-5 text-muted">Total volume</div>
						<div class="fs-4 fw-bold text-end pe-2">
							{{ volume }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
