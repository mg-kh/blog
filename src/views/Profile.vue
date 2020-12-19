<template>
	<section>
		<div class="profile-banner">
			<b-jumbotron class="text-center text-white bg-transparent">
				<img
					:src="profileImage"
					:alt="user.username"
					style="height : 70px;width:70px"
					class="rounded-circle"
				/>
				<h3>{{ user.username }}</h3>
				<p class="my-3">{{ user.bio }}</p>
				<template v-if="!isCurrentUser">
					<the-favourite-button
						class="mr-2"
						@click="toggleFollow"
						:status="isFollowed"
					>
						<b-icon-cursor></b-icon-cursor>
						{{ buttonFollowText }}
					</the-favourite-button>
				</template>
				<template v-else>
					<b-button :to="{ name: 'Setting' }" class="mr-2">
						<b-icon-gear></b-icon-gear>
						Setting
					</b-button>
					<b-button :to="{ name: 'Editor' }">
						<b-icon-brush></b-icon-brush>
						Write Post
					</b-button>
				</template>
			</b-jumbotron>
		</div>
		<b-container>
			<b-row>
				<b-col>
					<b-nav pills class="mb-3">
						<b-nav-item :to="{ name: 'ProfileArticle' }"
							>All Posts</b-nav-item
						>
						<b-nav-item :to="{ name: 'ProfileFavourite' }"
							>Favourite</b-nav-item
						>
					</b-nav>
				</b-col>
			</b-row>
		</b-container>
		<router-view></router-view>
	</section>
</template>

<script>
import store from "@/store";
import { mapActions } from "vuex";
import TheFavouriteButton from "@/components/TheFavouriteButton";
import {
	FETCH_PROFILE,
	COPY_PROFILE,
	FOLLOW_USER,
	UNFOLLOW_USER,
} from "@/store/action.types";
export default {
	components: {
		TheFavouriteButton,
	},
	beforeRouteEnter(to, from, next) {
		const currentUsername = store.state.auth.user.username;
		if (currentUsername === to.params.slug) {
			const { username, bio, image } = store.state.auth.user;
			const user = { username, bio, image, following: false };
			store.dispatch(COPY_PROFILE, user);
		} else {
			store.dispatch(FETCH_PROFILE, to.params.slug);
		}
		next();
	},
	beforeRouteUpdate(to, from, next) {
		if (to.params.slug === from.params.slug) {
			next();
			return;
		}
		const currentUsername = store.state.auth.user.username;
		if (currentUsername === to.params.slug) {
			const { username, bio, image } = store.state.auth.user;
			const user = { username, bio, image, following: false };
			store.dispatch(COPY_PROFILE, user);
		} else {
			store.dispatch(FETCH_PROFILE, to.params.slug);
		}
		next();
	},
	computed: {
		user() {
			return this.$store.state.profile.user;
		},
		isCurrentUser() {
			return store.state.auth.user.username === this.user.username;
		},
		profileImage() {
			if (
				this.user.image ===
				"https://static.productionready.io/images/smiley-cyrus.jpg"
			) {
				return "https://i.imgur.com/cUZroJx.png";
			} else if (!this.user.image) {
				return "https://i.imgur.com/cUZroJx.png";
			} else {
				return this.user.image;
			}
		},
		isFollowed() {
			return this.user.following ? "success" : "secondary";
		},
		buttonFollowText() {
			return this.user.following ? "Unfollow" : "Follow";
		},
	},
	methods: {
		...mapActions({
			followUser: FOLLOW_USER,
			unfollowUser: UNFOLLOW_USER,
		}),
		toggleFollow() {
			if (this.user.following)
				store.dispatch(UNFOLLOW_USER, this.user.username);
			else store.dispatch(FOLLOW_USER, this.user.username);
		},
	},
};
</script>
