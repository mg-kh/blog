<template>
	<section>
		<b-modal id="loading" hide-footer>
			<template #modal-title>
				Sorry! <span style="font-size:30px;">&#128532;</span>
			</template>
			<div class="d-block text-center">
				<b-list-group
					v-for="(error, i) in errors"
					:key="i"
					class="mb-2 text-left"
				>
					<h5>{{ i }}</h5>
					<b-list-group-item
						v-for="(err, i) in error"
						:key="i"
						class="text-danger"
					>
						{{ err }}</b-list-group-item
					>
				</b-list-group>
			</div>
			<b-button class="mt-3" block @click="$bvModal.hide('loading')"
				>Got It !</b-button
			>
		</b-modal>
	</section>
</template>
<script>
export default {
	props: {
		errors: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	watch: {
		errors(val) {
			this.$bvModal.show("loading");
		},
	},
};
</script>
