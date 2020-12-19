<template>
	<section>
		<b-container>
			<b-row>
				<b-col>
					<b-card class="my-5">
						<template>
							<div>
								<b-form @submit.prevent="">
									<b-form-group label="Title:">
										<b-form-input
											v-model="title"
											placeholder="Enter your post title"
										></b-form-input>
									</b-form-group>

									<b-form-group label="Description:">
										<b-form-input
											v-model="description"
											placeholder="Enter your post description"
										></b-form-input>
									</b-form-group>

									<b-form-group label="Post:">
										<vue-editor
											v-model="body"
											:editorToolbar="
												customToolbar
											"
										></vue-editor>
										<!-- <b-form-textarea
											id="textarea-small"
											size="sm"
											v-model="body"
											placeholder="Enter your post here"
										></b-form-textarea> -->
									</b-form-group>

									<the-input-tag
										v-model="tagList"
									></the-input-tag>

									<the-button
										@click="handleSubmit"
									></the-button>
								</b-form>
							</div>
						</template>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
		<the-error :errors="errors"></the-error>
	</section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { VueEditor } from "vue2-editor";
import store from "@/store";
import TheButton from "@/components/TheButton";
import TheInputTag from "@/components/TheInputTag";
import TheError from "@/components/TheError";
import { CREATE_POST, FETCH_POST, UPDATE_POST } from "@/store/action.types";
export default {
	props: {
		slug: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			title: "",
			description: "",
			body: "Your Content Please...",
			tagList: [],
			errors: {},
			loading: false,
			customToolbar: [
				[{ header: [1, 2, 3, 4, 5, 6, false] }],
				[
					"bold",
					"italic",
					"underline",
					"strike",
					"blockquote",
					"link",
				],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ color: [] }, { background: [] }],
				[{ script: "sub" }, { script: "super" }],
				["clean"],
			],
		};
	},
	async beforeRouteUpdate(to, from, next) {
		const { slug } = to.params;
		if (slug) {
			await store.dispatch("FETCH_POST", slug);

			const {
				title,
				description,
				body,
				tagList,
			} = store.state.post.article.data;
			this.title = title;
			this.description = description;
			this.body = body;
			this.tagList = tagList.map((tag) => {
				return {
					content: tag,
					key: Date.now() + tag,
				};
			});
		} else {
			this.title = "";
			this.description = "";
			this.body = "";
			this.tagList = [];
		}
		next();
	},
	components: {
		TheButton,
		TheInputTag,
		VueEditor,
		TheError,
	},
	computed: {
		...mapState({
			post: (state) => state.post.article.data,
		}),
	},
	async created() {
		const { slug } = this;
		if (slug) {
			if (this.post.slug !== slug) {
				await this.fetchPost(slug);
			}

			const { title, description, body, tagList } = this.post;
			this.title = title;
			this.description = description;
			this.body = body;
			this.tagList = tagList.map((tag) => {
				return {
					content: tag,
					key: Date.now() + tag,
				};
			});
		}
	},
	methods: {
		...mapActions({
			createPost: CREATE_POST,
			fetchPost: FETCH_POST,
			updatePost: UPDATE_POST,
		}),
		handleSubmit() {
			this.submitPost();
		},
		async submitPost() {
			const { title, description, body } = this;
			const tagList = this.tagList.map((tag) => tag.content);
			let { slug } = this.$route.params;
			let post;
			try {
				if (slug) {
					post = await this.updatePost({
						slug,
						article: { title, description, body, tagList },
					});
					this.$swal({
						timer: 3000,
						icon: "success",
						toast: true,
						position: "top-end",
						showConfirmButton: false,
						timerProgressBar: true,
						title: "Post update successfully",
					});
				} else {
					post = await this.createPost({
						title,
						description,
						body,
						tagList,
					});
					this.$router.push({
						name: "Home",
					});
				}
			} catch ({ response }) {
				this.errors = response.data.errors;
			}
		},
	},
};
</script>
