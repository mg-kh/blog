<template>
	<section v-if="comments.data.length" class="mb-5">
		<the-comment
			v-for="comment in comments.data"
			:key="comment.id"
			:comment="comment"
			:slug="slug"
		></the-comment>
	</section>
</template>

<script>
import TheComment from "@/components/TheComment";
export default {
	props: {
		comments: {
			type: Object,
			default() {
				return {};
			},
		},
		slug: {
			type: String,
			default: "",
		},
	},
	components: {
		TheComment,
	},
};
</script>
