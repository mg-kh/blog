<template>
	<section>
		<b-card class="mb-3">
			<p class="m-0">{{ comment.body }}</p>

			<b-container class="mt-3">
				<b-row class="d-flex justify-content-between">
					<article>
						<img
							:src="
								comment.author.image ||
									'https://static.productionready.io/images/smiley-cyrus.jpg'
							"
							class="rounded-circle mr-2"
							style="width : 30px; height : 30px"
						/>
						<router-link
							class="mr-2"
							:to="{
								name: 'ProfileArticles',
								params: {
									username: comment.author.username,
								},
							}"
							>{{ comment.author.username }}</router-link
						>
						<span class="date-posted">{{
							comment.createdAt
						}}</span>
					</article>
					<article>
						<b-button
							v-if="isCurrentUser"
							class="mod-options"
							@click="removeComment"
							variant="danger"
							>Delete</b-button
						>
					</article>
				</b-row>
			</b-container>
		</b-card>
	</section>
</template>

<script>
import { DELETE_COMMENT } from "@/store/action.types";
export default {
	props: {
		comment: {
			type: Object,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
		isCurrentUser() {
			return (
				this.comment.author.username === this.currentUser.username
			);
		},
	},
	methods: {
		removeComment() {
			const { slug, comment } = this;
			this.$store.dispatch(DELETE_COMMENT, {
				slug,
				id: comment.id,
			});
		},
	},
};
</script>
