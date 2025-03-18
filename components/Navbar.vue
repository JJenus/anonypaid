<script setup>
	const myCollections = useCollections();

	const navs = ref([
		{
			name: "Send",
			path: "/",
		},
		{
			name: "Redeem",
			path: "/redeem",
		},
	]);
	const route = useRoute();
	const active = ref("all");

	onMounted(() => {
		const paths = route.path.split("/");
		if (paths[2]) {
			active.value = paths[2];
		} else if (!paths[1]) {
			active.value = "send";
		}
	});
</script>

<template>
	<div class="d-nonei">
		<div class="hover-scroll-x hide-scrollbar">
			<ul
				class="nav nav-tabs nav-pills d-flex flex-nowrap align-items-center justify-content-center border-0 fs-6 min-w-lg-200px"
			>
				<li
					v-for="nav in navs"
					class="nav-item me-08 mb-md-2"
					@click="active = nav.name"
				>
					<NuxtLink
						class="nav-link text-center w-100px btn-light-primary btn-sm"
						:class="
							active == nav.name.toLowerCase() ? 'active' : ''
						"
						:to="nav.path"
					>
						<span class="fs-4 fw-bold">{{ nav.name }}</span>
					</NuxtLink>
				</li>
			</ul>
		</div>
	</div>
</template>
