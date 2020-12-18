<template>
	<section>
		<div class="home-banner">
			<b-jumbotron
				header="Place To Share Your Ideas"
				lead="Share Your Ideas!"
				class="text-center bg-transparent text-white"
			>
			</b-jumbotron>
		</div>

		<b-container>
			<b-row>
				<b-col>
					<b-nav pills class="mb-3">
						<b-nav-item active>New Feed</b-nav-item>
						<b-nav-item>Home</b-nav-item>
						<b-nav-item>#Nitro</b-nav-item>
					</b-nav>
					<router-view></router-view>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
// @ is an alias to /src

export default {
	name: "Home",
	components: {},
};
</script>
