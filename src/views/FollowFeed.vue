<template>
	<post-card :limit="10" :feed="true"></post-card>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
	components: {
		PostCard,
	},
};
</script>
