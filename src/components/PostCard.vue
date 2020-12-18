<template>
	<section>
		<b-row>
			<template v-if="loading ? limit : posts.data.length">
				<post-preview
					v-for="(post, index) in postsData"
					:key="index"
					:post="loading ? {} : post"
					:showPlaceholder="loading"
				></post-preview>
			</template>

			<template v-else>
				<b-col>
					<small>No Posts Yet...</small>
				</b-col>
			</template>
		</b-row>
		<b-row>
			<template>
				<b-col>
					<the-pagination
						:pageCount="pageCount"
						v-model="offset"
						:limit="limit"
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
import PostPreview from "@/components/PostPreview";
export default {
	props: {
		limit: {
			type: Number,
			default: 10,
		},
		query: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			loading: true,
			offset: 0,
		};
	},
	components: { ThePagination, PostPreview },
	created() {
		this.fetchNewPost();
	},
	computed: {
		queryString() {
			return Object.assign({}, this.query, {
				limit: this.limit,
				offset: this.offset,
			});
		},
		posts() {
			return this.$store.state.homePosts.articles;
		},
		pageCount() {
			return Math.round(this.posts.articlesCount / this.limit);
		},
		postsData() {
			if (this.loading) return this.limit;
			return this.posts.data;
		},
	},
	watch: {
		offset() {
			this.fetchNewPost(this.queryString);
		},
		query() {
			this.fetchNewPost(this.queryString);
		},
	},
	methods: {
		...mapActions({
			fetchPost: FETCH_ALL_POST,
		}),

		async fetchNewPost() {
			this.loading = true;
			this.$swal({
				icon: "question",
				toast: false,
				position: "center",
				showConfirmButton: false,
				title: "Loading Content",
			});
			await this.fetchPost(this.queryString);
			this.loading = false;
			this.$swal.close();
		},
	},
};
</script>
