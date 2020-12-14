<template>
	<b-form-group label="Tag:">
		<b-input-group class="mt-3">
			<b-form-input
				v-model="input"
				:placeholder="error || 'Enter your tag'"
				@keydown.enter="submitTag"
			></b-form-input>
			<b-input-group-append>
				<b-button variant="info">Add Tag</b-button>
			</b-input-group-append>
		</b-input-group>

		<article class="mt-3">
			<b-badge
				@click="remove(tag.key)"
				v-for="tag in tags"
				:key="tag.key"
				class="m-1"
				>{{ tag.content }}</b-badge
			>
		</article>
	</b-form-group>
</template>

<script>
export default {
	model: {
		prop: "tags",
		event: "change",
	},
	props: {
		tags: {
			type: Array,
			default: function() {
				return [];
			},
		},
	},
	data() {
		return {
			input: "",
			error: "",
		};
	},
	methods: {
		submitTag() {
			const error = this.isInputError();
			if (error) {
				this.showError(error);
			} else {
				this.hideError();
				this.add();
			}
		},
		add() {
			const newTags = this.tags.slice();
			newTags.push({
				content: this.input,
				key: Date.now() + this.input,
			});
			this.$emit("change", newTags);
			this.input = "";
		},
		isInputError() {
			if (!this.input) return "Can't be a blank value!";
			const isDuplicate =
				this.tags.length &&
				!this.tags.every((tag) => {
					return tag.content !== this.input;
				});
			if (isDuplicate) return "Can't be same tag!";

			return false;
		},
		remove(key) {
			const newTags = this.tags.filter((tag) => {
				return tag.key !== key;
			});

			this.$emit("change", newTags);
		},
		showError(error) {
			this.error = error;
			this.input = "";
		},
		hideError() {
			this.error = "";
		},
	},
};
</script>
