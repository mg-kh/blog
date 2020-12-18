<template>
	<section>
		<div class="profile-banner">
			<b-jumbotron class="bg-transparent text-white">
				<b-container>
					<b-row>
						<b-col>
							<h2>{{ post.data.title }}</h2>
							<p class="lead">
								{{ post.data.description }}
							</p>
							<post-meta :post="post.data"></post-meta>
						</b-col>
					</b-row>
				</b-container>
			</b-jumbotron>
		</div>
		<b-container>
			<b-row>
				<b-col>
					<post-content :content="post.data.body"></post-content>
				</b-col>
			</b-row>
			<hr class="my-2" />
		</b-container>
		<b-container>
			<b-row>
				<b-col cols="12">
					<comment-editor
						:slug="post.data.slug"
						:author="post.data.author"
					></comment-editor>
				</b-col>
				<b-col cols="12">
					<list-comment
						:comments="comment"
						:slug="post.data.slug"
					></list-comment>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { FETCH_POST, FETCH_COMMENT } from "@/store/action.types";
import PostContent from "@/components/PostContent";
import ListComment from "@/components/ListComment";
import CommentEditor from "@/components/CommentEditor";
import PostMeta from "@/components/PostMeta";
export default {
	props: ["slug"],
	data() {
		return {
			isLoadingPost: true,
		};
	},
	components: { PostContent, PostMeta, CommentEditor, ListComment },
	created() {
		this.isLoadingPost = true;
		this.$swal({
			icon: "question",
			timer: 1000,
			showConfirmButton: false,
			position: "center",
			title: "Fetching Data",
		});
		this.fetchPost(this.slug).then(() => {
			this.isLoadingPost = false;
		});
		this.fetchComment(this.slug);
	},
	computed: {
		...mapState({
			post: (state) => state.post.article,
			comment: (state) => state.post.comments,
		}),
	},
	methods: {
		...mapActions({
			fetchPost: FETCH_POST,
			fetchComment: FETCH_COMMENT,
		}),
	},
};
</script>
