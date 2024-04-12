<script setup lang="ts">
	import type { NFT } from "~/utils/interfaces/NFT";
	const props = defineProps<{ token: NFT }>();
	// console.log(props.value.token);
	const load = () => {
		window.location.href = "/asset/nft/" + props.token.id;
	};
</script>
<template>
	<div
		@click="load()"
		class="card hover-elevate-up hover-slide card-stretch h-100"
	>
		<div class="card-body p-0 h-100">
			<img :src="token.nftImg" alt="" class="w-100 h-200px rounded-top" />
		</div>
		<div class="card-footer p-4 py-5">
			<a :href="'/asset/nft/' + token.id">
				<h5 class="mb-2 fs-4 d-flex align-items-center">
					{{ token.name }}
					<i
						class="ki-outline ki-check-circle text-success fs-2 ms-3"
					>
					</i>
				</h5>
				<div class="d-flex justify-content-between">
					<div class="d-flex flex-column">
						<div class="fs-5 text-muted">Items</div>
						<div class="fs-4 fw-bold">
							{{ token.supply }}
						</div>
					</div>
					<div class="d-flex flex-column">
						<div class="fs-5 text-muted">Price</div>
						<div class="fs-4 fw-bold">{{ token.price }} ETH</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>
