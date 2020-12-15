<template>
	<section>
		<b-jumbotron>
			<b-container>
				<b-row>
					<b-col>
						<h2>{{ post.data.title }}</h2>
						<p class="lead">{{ post.data.description }}</p>
						<post-meta :post="post.data"></post-meta>
					</b-col>
				</b-row>
			</b-container>
		</b-jumbotron>
		<b-container>
			<b-row>
				<b-col>
					<post-content :content="post.data.body"></post-content>
				</b-col>
			</b-row>
			<hr class="my-2" />
		</b-container>
	</section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { FETCH_POST } from "@/store/action.types";
import PostContent from "@/components/PostContent";
import PostMeta from "@/components/PostMeta";
export default {
	props: ["slug"],
	data() {
		return {
			isLoadingPost: true,
		};
	},
	components: { PostContent, PostMeta },
	created() {
		this.isLoadingPost = true;
		this.fetchPost(this.slug).then(() => {
			this.isLoadingPost = false;
		});
	},
	computed: {
		...mapState({
			post: (state) => state.post.article,
		}),
	},
	methods: {
		...mapActions({
			fetchPost: FETCH_POST,
		}),
	},
};
</script>
