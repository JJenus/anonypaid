<script setup>
	definePageMeta({
		middleware: "auth",
	});

	const created = useCollections().userNFts;
</script>

<template>
	<div>
		<div
			v-if="created.length < 1"
			class="min-h-300px rounded border border-primary d-flex align-items-center justify-content-center"
		>
			<h1>No collected found</h1>
		</div>
		<div v-else class="row row-cols-1 row-cols-md-3 row-cols-lg-4">
			<div v-for="nft in created" :key="nft.id" class="col">
				<NftToken :token="nft" />
			</div>
		</div>
	</div>
</template>
