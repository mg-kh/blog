<template>
	<b-col cols="12" md="4">
		<b-card class="mb-3 previewCard" v-if="!showPlaceholder">
			<article class="d-flex mb-3">
				<div class="mr-2">
					<img
						:src="profileImage"
						alt="profile"
						class="rounded-circle"
						style="width: 50px; height: 50px"
					/>
				</div>
				<div class="mr-auto">
					<router-link
						class="d-block"
						:to="{
							name: 'ProfileArticle',
							params: {
								slug: post.author.username,
							},
						}"
					>
						{{ post.author.username }}
					</router-link>
					<small>{{ post.updatedAt }}</small>
				</div>
				<div>
					<the-favourite-button
						@click="toggleFavourite"
						:status="isFavoritedClass"
					>
						<b-icon-heart-fill
							class="mr-2"
						></b-icon-heart-fill>
						<b-badge variant="light">{{
							post.favoritesCount
						}}</b-badge>
					</the-favourite-button>
				</div>
			</article>

			<article>
				<h3>{{ post.title }}</h3>
				<b-card-text>
					{{ post.description }}
				</b-card-text>
			</article>

			<b-container class="mt-3">
				<b-row class="align-items-center justify-content-between">
					<b-button
						:to="{ path: '/post/' + post.slug }"
						size="sm"
						href="#"
						class="readMore"
						>Read More</b-button
					>
				</b-row>
			</b-container>
		</b-card>
	</b-col>
</template>

<script>
import { mapActions } from "vuex";
import TheFavouriteButton from "@/components/TheFavouriteButton";
import { FAVOURITE_POST, UNFAVOURITE_POST } from "@/store/action.types";
export default {
	props: {
		post: {
			type: Object,
			default() {
				return {};
			},
		},
		showPlaceholder: {
			type: Boolean,
			default: true,
		},
	},
	components: {
		TheFavouriteButton,
	},
	computed: {
		isFavoritedClass() {
			return this.post.favorited ? "danger" : "bg-transparent";
		},
		profileImage() {
			if (
				this.post.author.image ===
				"https://static.productionready.io/images/smiley-cyrus.jpg"
			) {
				return "https://i.imgur.com/cUZroJx.png";
			} else if (!this.post.author.image) {
				return "https://i.imgur.com/cUZroJx.png";
			} else {
				return this.post.author.image;
			}
		},
	},

	methods: {
		...mapActions({
			favourite: FAVOURITE_POST,
			unfavourite: UNFAVOURITE_POST,
		}),
		toggleFavourite() {
			if (!this.$store.state.auth.isLogin) {
				this.$router.push({ name: "Login" });
			}

			if (!this.post.favorited) this.favourite(this.post.slug);
			else {
				this.unfavourite(this.post.slug);
			}
		},
	},
};
</script>
