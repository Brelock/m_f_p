<template>
	<client-only>
		<div class="pagination pagination-container">
			<div class="mrow flex wrap align-center">
				<!-- <div class="mcol-xs-12 mcol-sm-4" v-if="props.meta.from">
					<div className="meta-info">
						Показаны с {{ `${props.meta.from} по ${props.meta.to} из ${props.meta.total} ${props.itemsName.mult}` }}
					</div>
				</div> -->

				<div class="mcol-xs-12 mcol-sm-8 fluid text-right push-right">
					<el-pagination
						@current-change="page => setFilters({ page: page })"
						background
						:current-page="filters.page"
						:page-size="meta.per_page"
						:pager-count="5"
						layout="prev, pager, next"
						:total="meta.total"
					/>
				</div>
			</div>
		</div>
	</client-only>
</template>

<style lang="css" src="@/assets/css/pagination.css"></style>

<script>	
export default {
	// functional: true,
	components: {
		ElPagination: () => import(/* webpackChunkName: "ElPagination"*/ 'element-ui/lib/pagination'),
	},
	props: {
		itemsName: { type: Object, required: true },
		meta: { type: Object, required: true },
		filters: { type: Object, required: true }
	},

	methods: {
		setFilters(data) {
			this.$emit('setFilters', data);
		}
	}
};
</script>
