<template>
	<div class="overflow-auto">
		<div class="mt-3">
			<h6>Goto first and last button number</h6>
			<b-pagination
				v-model="currentPage"
				:total-rows="rows"
				first-number
				last-number
				@change="changePage(currentPage)"
			></b-pagination>
		</div>
	</div>
</template>

<script>
export default {
	model: {
		event: "change",
	},
	props: {
		pageCount: {
			type: Number,
		},
	},
	data() {
		return {
			rows: this.pageCount,
			perPage: 1,
			currentPage: 1,
		};
	},
	methods: {
		changePage(page) {
			const pageNumber = event.target.innerText - 1;
			this.$emit("change", pageNumber);
		},
	},
};
</script>
