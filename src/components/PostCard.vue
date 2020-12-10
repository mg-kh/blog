<template>
	<section>
		<b-row>
			<template v-if="loading ? limit : posts.data.length">
				<b-col
					cols="12"
					class="mb-3"
					v-for="(post, i) in posts.data"
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
									<b-badge
										class="m-1"
										variant="secondary"
										>Secondary</b-badge
									>
									<b-badge
										class="m-1"
										variant="secondary"
										>Secondary</b-badge
									>
								</div>
							</b-row>
						</b-container>
					</b-card>
				</b-col>
			</template>
			<template v-else>
				<b-col>
					<small>No Posts Yet...</small>
				</b-col>
			</template>
			<template>
				<b-col>
					<the-pagination
						:pageCount="pageCount"
						v-model="offset"
					></the-pagination>
				</b-col>
			</template>
		</b-row>
	</section>
</template>

<script>
import { FETCH_ALL_POST } from "@/store/action.types";
import { mapActions } from "vuex";
import ThePagination from "@/components/ThePagination";
export default {
	props: {
		limit: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			loading: false,
			offset: 0,
		};
	},
	components: { ThePagination },
	created() {
		this.fetchNewPost();
	},
	computed: {
		queryString() {
			return Object.assign(
				{},
				{
					limit: this.limit,
					offset: this.offset,
				}
			);
		},
		posts() {
			return this.$store.state.homePosts.articles;
		},
		pageCount() {
			return Math.round(this.posts.articlesCount / this.limit);
		},
	},
	watch: {
		offset(val) {
			this.fetchNewPost();
		},
	},
	methods: {
		...mapActions({
			fetchPost: FETCH_ALL_POST,
		}),

		async fetchNewPost() {
			this.loading = true;
			await this.fetchPost(this.queryString);
			this.loading = false;
		},
	},
};
</script>
