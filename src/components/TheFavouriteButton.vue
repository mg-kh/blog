<template>
	<b-button size="sm" :variant="status" @click="handleClick">
		<slot></slot>
	</b-button>
</template>

<script>
export default {
	props: {
		status: String,
	},
	methods: {
		handleClick() {
			this.$emit("click");
		},
	},
};
</script>
