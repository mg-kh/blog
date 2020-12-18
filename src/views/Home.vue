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
					<b-modal id="bv-modal-example" hide-footer>
						<template #modal-title>
							Search By Tags
						</template>
						<div class="d-block" v-if="!loading">
							<b-badge
								@click="
									$bvModal.hide('bv-modal-example')
								"
								:to="{ path: '/tag/' + tag }"
								class="m-1"
								v-for="(tag, i) in tags.data"
								:key="i"
								>{{ tag }}</b-badge
							>
						</div>
					</b-modal>
					<home-article-nav
						@tag="showTagPopUp"
					></home-article-nav>
					<router-view></router-view>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
// @ is an alias to /src
import { FETCH_TAGS } from "@/store/action.types";
import HomeArticleNav from "@/views/HomeArticleNav";
export default {
	name: "Home",
	data() {
		return {
			loading: true,
		};
	},
	components: {
		HomeArticleNav,
	},
	async created() {
		this.loading = true;
		await this.$store.dispatch(FETCH_TAGS);
		this.loading = false;
	},
	computed: {
		tags() {
			return this.$store.state.homePosts.tags;
		},
	},
	methods: {
		showTagPopUp() {
			this.$bvModal.show("bv-modal-example");
		},
	},
};
</script>
