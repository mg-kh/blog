<template>
	<b-button class="mr-2" variant="primary" @click="clickHandler">
		<b-icon-brush></b-icon-brush>
		Publish Post
	</b-button>
</template>

<script>
export default {
	methods: {
		clickHandler() {
			this.$emit("click");
		},
	},
};
</script>
