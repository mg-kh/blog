<template>
	<b-navbar
		toggleable="lg"
		type="dark"
		variant="primary"
		class="sticky-top navBar"
	>
		<b-container>
			<b-navbar-brand :to="{ name: 'Home' }">NavBar</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<template v-if="isLogin">
						<b-nav-item :to="{ name: 'Home' }">
							<b-icon-house-fill></b-icon-house-fill>
							Home
						</b-nav-item>
						<b-nav-item :to="{ name: 'Editor' }">
							<b-icon-brush></b-icon-brush>
							New Post
						</b-nav-item>
						<b-nav-item :to="{ name: 'Setting' }">
							<b-icon-gear></b-icon-gear>
							Setting
						</b-nav-item>
						<b-nav-item-dropdown right>
							<!-- Using 'button-content' slot -->
							<template #button-content>
								{{ user.username }}
							</template>
							<b-dropdown-item
								:to="{
									name: 'ProfileArticle',
									params: {
										slug: user.username,
									},
								}"
								>Profile</b-dropdown-item
							>
							<b-dropdown-item @click="signOut"
								>Sign Out</b-dropdown-item
							>
						</b-nav-item-dropdown>
					</template>
					<template v-else>
						<b-nav-item :to="{ name: 'Register' }">
							Register
						</b-nav-item>
						<b-nav-item :to="{ name: 'Login' }">
							Login
						</b-nav-item>
					</template>
				</b-navbar-nav>
			</b-collapse>
		</b-container>
	</b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { LOGOUT } from "@/store/action.types";
export default {
	computed: {
		...mapState({
			isLogin: (state) => state.auth.isLogin,
			user: (state) => state.auth.user,
		}),
	},
	mounted() {
		const nav = document.querySelector(".navBar");
		window.addEventListener("scroll", () => {
			const scrollTop = window.scrollY;
			if (scrollTop > 300) {
				nav.classList.add("nav-bar-bg");
			} else {
				nav.classList.remove("nav-bar-bg");
			}
		});
	},
	methods: {
		...mapActions({
			logout: LOGOUT,
		}),
		signOut() {
			this.logout();
			if (this.$route.path !== "/")
				this.$router.push({ name: "Home" });
		},
	},
};
</script>
