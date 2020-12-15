<template>
	<section>
		<div v-html="content"></div>
	</section>
</template>

<script>
export default {
	props: {
		content: {
			type: String,
			default: "",
		},
	},
};
</script>
