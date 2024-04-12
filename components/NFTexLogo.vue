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

	const config = useRuntimeConfig().public;
	// const currentPage = "App";
	// useSeoMeta({
	// 	title: `${currentPage} - ${config.APP}`,
	// });
</script>

<template>
	<a
		href="/"
		class=""
	>
		<img
			alt="Logo"
			src="/assets/media/logos/nftex-light.png"
			:class="classes"
			class="me-4 theme-light-show"
		/>
		<img
			alt="Logo"
			src="/assets/media/logos/nftex-dark.png"
			:class="classes"
			class="me-4 theme-dark-show"
		/>
	</a>
</template>
