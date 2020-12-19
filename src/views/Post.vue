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
					<template v-if="isLogin">
						<comment-editor
							:slug="post.data.slug"
							:author="post.data.author"
						></comment-editor>
					</template>
					<template v-else>
						<div class="text-center mt-4">
							<span>
								<router-link
									class="text-success"
									:to="{ name: 'Login' }"
									>Login</router-link
								>
							</span>
							Or
							<span>
								<router-link
									class="text-success"
									:to="{ name: 'Register' }"
									>Register</router-link
								>
							</span>
							to comment on this post.
						</div>
					</template>
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
			imageUrl: "https://i.imgur.com/cD0XBVZ.gif",
			toast: true,
			toast: false,
			position: "center",
			showConfirmButton: false,
			title: "Loading...",
		});
		this.fetchPost(this.slug).then(() => {
			this.isLoadingPost = false;
			this.$swal.close();
		});
		this.fetchComment(this.slug);
	},
	computed: {
		...mapState({
			post: (state) => state.post.article,
			comment: (state) => state.post.comments,
		}),
		isLogin() {
			return this.$store.state.auth.isLogin;
		},
	},
	methods: {
		...mapActions({
			fetchPost: FETCH_POST,
			fetchComment: FETCH_COMMENT,
		}),
	},
};
</script>
