<template functional>
	<client-only>
		<div class="sort-bar">
			<div class="content-container">
				<a href="#" @click.prevent="listeners.onSort(item.prop)"
					v-for="item in props.optionsList"
					:key="`sort_item-${item.prop}`"
					:class="['sortBar-item',
						{'active': props.filters.orderByColumn == item.prop},
						{'asc': props.filters.orderByMethod == 'asc'},
						{'desc': props.filters.orderByMethod == 'desc'}
					]">
					<span v-text="item.label"></span>
					<i class="icomoon icon-arrow2"></i>
				</a>
			</div>
		</div>
	</client-only>
</template>

<script>

export default {
	functional: true,

	props: {
		filters: Object,
		itemsLoading: Boolean,
		optionsList: {
			type: Array,
			default: () => []
		}
	},
};
</script>