<template>
	<section>
		<b-nav pills class="mb-3">
			<b-nav-item active :to="{ path: '/' }">New Feed</b-nav-item>
			<b-nav-item v-if="isLogin" :to="{ path: '/feed' }"
				>Follow</b-nav-item
			>
			<b-nav-item
				v-if="$route.params.tag"
				:to="{ path: '/tag/' + $route.params.tag }"
			>
				#{{ $route.params.tag }}</b-nav-item
			>
			<b-nav-item @click="handleTag">
				<b-icon-search></b-icon-search>
			</b-nav-item>
		</b-nav>
	</section>
</template>

<script>
export default {
	computed: {
		isLogin() {
			return this.$store.state.auth.isLogin;
		},
	},
	methods: {
		handleTag() {
			this.$emit("tag");
		},
	},
};
</script>
