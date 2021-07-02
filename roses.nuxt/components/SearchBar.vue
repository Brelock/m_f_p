<template>
	<!-- <div class="search-bar"> -->
	<form class="search-bar relative" @submit.prevent="searchSubmit">
		<el-input
			@blur="searchSubmit"
			:class="[
				{ hasValue: clearable && !!searchQuery },
				{ shadowInput: options.shadow },
			]"
			:suffix-icon="options.suffix"
			:placeholder="`${$t('menu.search')}...`"
			v-model="searchQuery"
		>
			<el-button
				v-if="options.prepend"
				slot="prepend"
				native-type="submit"
				icon="icomoon icon-search"
			/>
		</el-input>

		<button
			type="button"
			v-show="clearable && !!searchQuery"
			class="resetButton"
			@click="resetSearch"
		>
			<i class="el-icon-circle-close" />
		</button>
	</form>
	<!-- </div> -->
</template>

<script>
export default {
	props: {
		clearable: Boolean,
		query: String,
		options: {
			type: Object,
			default: () => ({}),
		},
	},

	data() {
		return {
			searchQuery: "",
		};
	},
	methods: {
		searchSubmit() {
			if (this.searchQuery !== this.query) {
				// const payload = { filter: 'q', val: this.searchQuery };
				this.$emit("submit", { q: this.searchQuery, page: 1 });
			}
		},

		resetSearch() {
			this.searchQuery = "";
			this.searchSubmit();
		},
	},

	created() {
		// console.log('created')
		this.searchQuery = this.query ? this.query : "";
	},
};
</script>

<style>
.search-bar .resetButton {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 35px;
}
</style>

