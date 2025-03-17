<script setup>
	const props = defineProps({
		targetId: {
			type: stringify,
			required: true,
		},
	});

	const blockUI = ref();

	const toggleBlock = () => {
		if (blockUI.isBlocked()) {
			blockUI.release();
			button.innerText = "Block";
		} else {
			blockUI.block();
			button.innerText = "Release";
		}
	};

	onMounted(() => {
		const target = document.querySelector("#kt_block_ui_2_target");

		blockUI.value = new KTBlockUI(target, {
			message:
				'<div class="blockui-message"><span class="spinner-border text-primary"></span> Loading...</div>',
		});
	});
</script>
