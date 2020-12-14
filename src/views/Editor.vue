<template>
	<section>
		<b-container>
			<b-row>
				<b-col>
					<b-card class="mt-3">
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
										<b-form-textarea
											id="textarea-small"
											size="sm"
											v-model="body"
											placeholder="Enter your post here"
										></b-form-textarea>
									</b-form-group>

									<the-input-tag
										v-model="tagList"
									></the-input-tag>

									<the-button
										@click="handleSubmit"
									></the-button>

									<b-button
										type="reset"
										variant="danger"
										>Cancle</b-button
									>
								</b-form>
							</div>
						</template>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TheButton from "@/components/TheButton";
import TheInputTag from "@/components/TheInputTag";
import { CREATE_POST } from "@/store/action.types";
export default {
	data() {
		return {
			title: "",
			description: "",
			body: "",
			tagList: [],
			errors: {},
			loading: false,
		};
	},
	components: {
		TheButton,
		TheInputTag,
	},
	methods: {
		...mapActions({
			createPost: CREATE_POST,
		}),
		handleSubmit() {
			this.submitPost();
		},
		async submitPost() {
			const { title, description, body } = this;
			const tagList = this.tagList.map((tag) => tag.content);
			try {
				await this.createPost({
					title,
					description,
					body,
					tagList,
				});
			} catch ({ response }) {
				this.errors = response.data.errors;
			}
		},
	},
};
</script>
