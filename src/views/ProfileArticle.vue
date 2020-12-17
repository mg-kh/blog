<template>
	<section>
		<b-container>
			<b-row>
				<b-col>
					<post-card
						:query="{ author: username }"
						:limit="5"
					></post-card>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
import PostCard from "@/components/PostCard";
export default {
	components: {
		PostCard,
	},
	computed: {
		username() {
			return this.$route.params.slug;
		},
	},
};
</script>
