<script setup lang="ts">
	const props = defineProps({
		classes: {
			type: String,
			required: false,
		},
		appClass: {
			type: String,
			required: false,
		},
		appClassDark: {
			type: String,
			required: false,
		},
	});

	const { APP } = useRuntimeConfig().public;
	console.log(APP);
	// const currentPage = "App";
	// useSeoMeta({
	// 	title: `${currentPage} - ${config.APP}`,
	// });
</script>

<template>
	<a href="/" class="d-flex algin-items-center gap-3 justify-content-center">
		<img
			alt="Logo"
			src="/assets/media/logos/nftex-logo.png"
			:class="classes"
		/>
		<span class="fw-bold fs-1 text-white mt-3">{{ APP }}</span>
	</a>
</template>
