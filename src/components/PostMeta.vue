<template>
	<section>
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
				<a href="#" class="d-block">{{ post.author.username }}</a>
				<small>{{ post.updatedAt }}</small>
			</div>
			<div class="d-flex align-items-center">
				<the-favourite-button class="mr-2" @click="handleFollow"
					>{{ buttonFollowText }}
				</the-favourite-button>

				<the-favourite-button
					@click="handlerFavorite"
					:status="isFavoritedClass"
				>
					Like
					<b-badge variant="light">{{
						post.favoritesCount
					}}</b-badge>
				</the-favourite-button>
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
		isFavoritedClass() {
			return this.post.favorited ? "primary" : "secondary";
		},
		isLogin() {
			return this.user.username;
		},
		buttonFollowText() {
			return this.post.author.following ? "Unfollow" : "Follow";
		},
	},
	methods: {
		...mapActions({
			favourite: FAVOURITE_POST,
			unfavourite: UNFAVOURITE_POST,
			followUser: FOLLOW_USER,
			unfollowUser: UNFOLLOW_USER,
			setAuthor: SET_AUTHOR_POST,
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
		pushToLoginScreen() {
			this.$router.push({ name: "SignIn" });
		},
	},
};
</script>
