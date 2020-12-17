<template>
	<section>
		<b-card title="Write Comment" class="my-3">
			<form @submit.prevent="addComment" id="comment">
				<b-form-textarea
					id="textarea"
					v-model="comment"
					placeholder="comment here!"
					rows="3"
					max-rows="6"
				></b-form-textarea>
				<b-container class="mt-3">
					<b-row
						class="d-flex justify-content-between align-items-center"
					>
						<article>
							<img
								:src="
									user.image ||
										'https://static.productionready.io/images/smiley-cyrus.jpg'
								"
								style="width: 30px; height : 30px"
								class="rounded-circle mr-2"
							/>
							<span>{{ user.username }}</span>
						</article>
						<article>
							<b-button
								class="mt-2"
								variant="success"
								form="comment"
								type="submit"
								>Add Comment</b-button
							>
						</article>
					</b-row>
				</b-container>
			</form>
		</b-card>
	</section>
</template>

<script>
import { ADD_COMMENT } from "@/store/action.types";
export default {
	props: {
		slug: {
			type: String,
			default: "",
		},
		author: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			comment: "",
		};
	},
	computed: {
		user() {
			return this.$store.state.auth.user;
		},
	},
	methods: {
		addComment() {
			const { slug, comment } = this;
			this.$store.dispatch(ADD_COMMENT, { slug, comment });
			this.comment = "";
		},
	},
};
</script>
