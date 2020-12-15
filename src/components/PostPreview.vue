<template>
	<b-col cols="12">
		<b-card class="mb-3" v-if="!showPlaceholder">
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
					<the-favourite-button
						@click="toggleFavourite"
						:status="isFavoritedClass"
					>
						Like
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

		<section v-else>
			<h1>loading</h1>
		</section>
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
			return this.post.favorited ? "primary" : "secondary";
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
