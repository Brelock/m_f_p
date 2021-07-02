<template>
	<!-- <client-only> -->
		<div class="">
			<div
				class="sidebarOpenButton mcol-md-hide flex center el-collapse-item__header"
				:data-text="$t('phrase.show_filters')"
				:data-text-active="$t('phrase.hide_filters')"
				data-target="asideFilters"
				@click="e => dropDown(e, {onlyMobile: true})"
			>
				<div class="title-container">
					<div class="title section-title medium">
						<span class="buttonText">{{ $t('phrase.show_filters') }}</span>
					</div>
				</div>

				<div class="arrow-button-container push-right">
					<i class="icomoon icon-arrow2"></i>
				</div>
			</div>

			<div
				id="asideFilters"
				class="sidebar-dropdown hiddenContent height submenuWrapper"
			>
				<div class="content-container">
					<el-collapse class="aside-filters-list" ref="ElCollapse"
						@change="()=>handleCollapseChange()"
					>
						<el-collapse-item
							class="filter-item"
							:title="$t('form.price')"
							name="price"
						>
							<div class="content-container">
								<!-- @onChange="setFilters" -->
									<!-- :min="filters.minPrice" -->
									<!-- :max="filters.maxPrice" -->
								<PriceSlider
									showInputs
									@onChange="(data) => emitEvent('setFilters', data)"
									:min="min_max_prices.min || 0"
									:max="min_max_prices.max || 0"
								/>
							</div>
						</el-collapse-item>

						<el-collapse-item
							v-if="!hideCategoryFilters"
							class="filter-item"
							:title="$t('phrase.active_filters')"
							name="active_filters"
							:disabled="!activeFiltersList.length"
						>
							<div class="content-container">
								<ul class="active-filters-list sectionBlock">
									<li
										v-for="item in activeFiltersList"
										:key="`active_filter-${item.id}`"
									>
										<span v-text="item[`title_${locale}`]"></span>
										<i
											class="icomoon icon-cross1"
											@click="emitEvent('removeFilter', item)"
										/>
										<!-- <span></span> -->
										<!-- <span class="quantity-prods">64</span> -->
									</li>
								</ul>

								<div
									class="sectionBlock wrapperBlock"
									v-show="activeFiltersList.length"
								>
									<button
										type="button"
										class="standardButton primary-inverted uppercase"
										@click="emitEvent('removeFilter', { all: true })"
									>
										{{ $t('common.clean') }}
									</button>
								</div>
							</div>
						</el-collapse-item>

						<div class="filterOptionsContainer" v-if="!hideCategoryFilters">
							<SimpleSpinner :active="categoryFiltersLoading" />
							<el-collapse-item
								class="filter-item"
								:title="item[`title_${locale}`]"
								v-for="item in categoryFiltersList"
								:key="`category_filter-${item.id}`"
								:name="`category_filter-${item.id}`"
							>
								<div class="content-container customCheckboxContainer inverted">
									<div
										class="formRow"
										v-for="option in item.filter_options"
										:key="`filter_option-${option.id}`"
									>
										<el-checkbox
											@input="emitEvent('setFilterOptionIds', option.id)"
											:value="filters.filterOptionIds.some((o) => o === option.id)"
										>
											<span	class="boldLabel capitalize">
												{{ option[`title_${locale}`] }}
												({{ option.products_count}})
											</span>
										</el-checkbox>
									</div>
								</div>
							</el-collapse-item>
						</div>
					</el-collapse>

					<!-- <div class="control-block text-center">
						<div class="grey-highlight">Подобрано 76 товаров</div>
						<div class="wrapperBlock">
							<a href="#" class="standardButton primary-inverted">ПОКАЗАТЬ</a>
						</div>
						<div class="wrapperBlock">
							<a href="#" class="standardButton third">СБРОСИТЬ</a>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	<!-- </client-only> -->
</template>

<style lang="css" src="@/assets/css/collapse.css"></style>
<!-- <style lang="scss" src="@/assets/scss/modules/collapse.scss"></style> -->

<script>
import { dropDown } from '@/helpers/domHelpers';
import { getLocaleCode } from "@/helpers";

export default {
	components: {
		ElCollapse: () => import(/* webpackChunkName: "ElCollapse"*/ 'element-ui/lib/collapse'),
		ElCollapseItem: () => import(/* webpackChunkName: "ElCollapseItem"*/ 'element-ui/lib/collapse-item'),
	},
	props: {
		filters: Object,
		categoryFiltersLoading: Boolean,

		brandsList: {
			type: Array,
			default: () => []
		},
		categoryFiltersList: {
			type: Array,
			default: () => []
		},
		dropDown: {
			type: Function,
			default: dropDown
		},
		activeFiltersList: {
			type: Array,
			default: () => []
		},
		openItemsList: {
			type: Array,
			default: () => []
		},
		min_max_prices: {
			type: Object,
			default: () => ({})
		},

		hideCategoryFilters: Boolean
	},

	computed: {
		// getLocaleCode: () => getLocaleCode
		locale() {
			return getLocaleCode(this.$i18n.locale);
		},
	},

	methods: {
		emitEvent(eventName, data) {
			// console.log(eventName)
			this.$emit('event', eventName, data);
		},

		handleCollapseChange(timeout) {
			dropDown(null, { 
					onlyMobile: true,
					recalculateHeight:true,
					target:'asideFilters',
					timeout: timeout || 300
				}
			);
		},
	},

	watch: {
		openItemsList(list) {
			// console.log(list, this.$refs.ElCollapse)
			if (list.length && this.$refs && this.$refs.ElCollapse) {
				this.$refs.ElCollapse.activeNames = list;
			}
		},

		activeFiltersList: function (list, oldList) {
			// console.log('activeFiltersList', list.length, oldList.length, list != oldList)
			if (list.length != oldList.length) {
				if (this.$refs && this.$refs.ElCollapse) {
					this.handleCollapseChange(400);

					if (list.length < 1) {
						this.$refs.ElCollapse.activeNames = this.$refs.ElCollapse.activeNames.filter(
							(fi) => fi != 'active_filters'
						);
					} else {
						this.$refs.ElCollapse.activeNames.push('active_filters');
						// this.isActiveFiltersChange = true;
					}
				} else {
					setTimeout(() => {
						if (this.$refs && this.$refs.ElCollapse) {
							this.handleCollapseChange();

							if (list.length < 1) {
								this.$refs.ElCollapse.activeNames = this.$refs.ElCollapse.activeNames.filter(
									(fi) => fi != 'active_filters'
								);
							} else {
								this.$refs.ElCollapse.activeNames.push('active_filters');
								// this.isActiveFiltersChange = true;							
							}
						}
					}, 800);
				}
			}
		},
	},

	beforeMount() {
		if (this.openItemsList.length) {
			if (this.$refs && this.$refs.ElCollapse) {
				this.$refs.ElCollapse.activeNames = this.openItemsList;				
			} else {
				setTimeout(() => {
					if (this.$refs && this.$refs.ElCollapse) {
						this.$refs.ElCollapse.activeNames = this.openItemsList;				
					}
				}, 800);
			}
		}
	}
};
</script>

