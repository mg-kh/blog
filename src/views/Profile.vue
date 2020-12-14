<template>
	<section>
		<b-jumbotron header="Kaung Htet" lead="Welcome" class="text-center">
			<b-button :to="{ name: 'Setting' }" class="mr-2"
				>Setting</b-button
			>
			<b-button :to="{ name: 'Editor' }">Write Post</b-button>
		</b-jumbotron>
		<b-container>
			<b-row>
				<b-col>
					<b-nav tabs class="mb-3">
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
