<template>
	<post-card :limit="10" :query="{ tag: tag }"></post-card>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
	props: {
		tag: String,
		required: true,
	},
	components: {
		PostCard,
	},
};
</script>
