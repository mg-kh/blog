<template>
	<section>
		<b-row>
			<b-col
				cols="12"
				class="mb-3"
				v-for="(post, i) in posts"
				:key="i"
			>
				<b-card>
					<article class="d-flex mb-3">
						<div class="mr-2">
							<img
								:src="post.author.image"
								alt="profile"
								class="rounded-circle"
								style="width: 50px; height: 50px"
							/>
						</div>
						<div class="mr-auto">
							<a href="#" class="d-block">{{
								post.author.username
							}}</a>
							<small>{{ post.updatedAt }}</small>
						</div>
						<div>
							<b-button size="sm" variant="success"
								>Like
								<b-badge variant="light">{{
									post.favoritesCount
								}}</b-badge></b-button
							>
						</div>
					</article>

					<article>
						<h3>{{ post.title }}</h3>
						<b-card-text>
							{{ post.description }}
						</b-card-text>
					</article>

					<b-container class="mt-3">
						<b-row
							class="align-items-center justify-content-between"
						>
							<b-button
								size="sm"
								href="#"
								variant="secondary"
								>Read More</b-button
							>
							<div>
								<b-badge class="m-1" variant="secondary"
									>Secondary</b-badge
								>
								<b-badge class="m-1" variant="secondary"
									>Secondary</b-badge
								>
							</div>
						</b-row>
					</b-container>
				</b-card>
			</b-col>
		</b-row>
	</section>
</template>

<script>
import { FETCH_ALL_POST } from "@/store/action.types";
import { mapActions } from "vuex";
export default {
	props: {
		limit: {
			type: Number,
			default: 10,
		},
	},
	created() {
		this.fetchNewPost();
	},
	computed: {
		queryString() {
			return Object.assign(
				{},
				{
					limit: this.limit,
				}
			);
		},
		posts() {
			return this.$store.state.homePosts.articles.data;
		},
	},
	methods: {
		...mapActions({
			fetchPost: FETCH_ALL_POST,
		}),

		async fetchNewPost() {
			await this.fetchPost(this.queryString);
		},
	},
};
</script>
