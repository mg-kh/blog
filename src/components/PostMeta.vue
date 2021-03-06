<template>
	<section>
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
					>{{ post.author.username }}</router-link
				>
				<small>{{ post.updatedAt }}</small>
			</div>

			<div class="d-flex align-items-center" v-if="isAuthor">
				<b-button
					size="sm"
					variant="outline-danger"
					class="mr-2"
					@click="deletePost"
					>Delete</b-button
				>

				<b-button
					size="sm"
					variant="success"
					:to="{
						name: 'Editor',
						params: {
							slug: this.post.slug,
						},
					}"
					>Edit</b-button
				>
			</div>
			<div class="d-flex align-items-center" v-else>
				<template v-if="isLogin">
					<the-favourite-button
						class="mr-2"
						@click="handleFollow"
						:status="isFollowed"
					>
						<b-icon-cursor></b-icon-cursor>
						{{ buttonFollowText }}
					</the-favourite-button>

					<the-favourite-button
						@click="handlerFavorite"
						:status="isFavoritedClass"
					>
						<b-icon-heart-fill
							class="mr-2"
						></b-icon-heart-fill>
						<b-badge variant="light">{{
							post.favoritesCount
						}}</b-badge>
					</the-favourite-button>
				</template>
			</div>
		</article>
	</section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import TheFavouriteButton from "@/components/TheFavouriteButton";
import {
	FAVOURITE_POST,
	UNFAVOURITE_POST,
	FOLLOW_USER,
	UNFOLLOW_USER,
	SET_AUTHOR_POST,
	DELETE_POST,
} from "@/store/action.types";
export default {
	props: {
		post: Object,
		default() {
			return {};
		},
	},
	components: {
		TheFavouriteButton,
	},
	computed: {
		...mapState({
			user: (state) => state.auth.user,
		}),
		isAuthor() {
			return this.user.username === this.post.author.username;
		},
		isFavoritedClass() {
			return this.post.favorited ? "danger" : "bg-transparent";
		},
		isFollowed() {
			return this.post.author.following ? "success" : "secondary";
		},
		isLogin() {
			return this.user.username;
		},
		buttonFollowText() {
			return this.post.author.following ? "Unfollow" : "Follow";
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
			followUser: FOLLOW_USER,
			unfollowUser: UNFOLLOW_USER,
			setAuthor: SET_AUTHOR_POST,
			deleteThePost: DELETE_POST,
		}),
		handlerFavorite() {
			this.isLogin ? this.toggleFavorite() : this.pushToLoginScreen();
		},
		async toggleFavorite() {
			const action = this.post.favorited
				? this.unfavourite
				: this.favourite;
			await action(this.post.slug);
		},
		handleFollow() {
			this.isLogin ? this.toggleFollow() : this.pushToLoginScreen();
		},
		async toggleFollow() {
			const action = this.post.author.following
				? this.unfollowUser
				: this.followUser;

			const author = await action(this.post.author.username);
			this.setAuthor(author);
		},
		deletePost() {
			this.deleteThePost(this.post.slug).then(() => {
				this.$router.push({
					name: "ProfileArticle",
					params: { slug: this.user.username },
				});
			});
		},
		pushToLoginScreen() {
			this.$router.push({ name: "SignIn" });
		},
	},
};
</script>
