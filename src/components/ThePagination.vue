<template>
	<div class="overflow-auto thePagination" v-if="pageCount > 1">
		<div class="mt-3">
			<b-pagination
				v-model="currentPage"
				:total-rows="pageCount"
				:per-page="limit"
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
		prop: "value",
		event: "change",
	},
	props: {
		pageCount: {
			type: Number,
		},
		limit: {
			// ! Need to count pagination button
			type: Number,
		},
	},
	data() {
		return {
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
