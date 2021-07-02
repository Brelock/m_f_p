<template functional>
	<ul class="breadcrumbs mcol-xs-hide mcol-md-show" v-if="props.items.length">
		<li v-for="item in props.items" :key="`crumb_${item.id}`" >
			<nuxt-link class="capitalize-first d-i-block"
				:to="listeners.localePath(item.to)"
				v-text="item[`title_${props.locale(props)}`]"
			/>
		</li>
	</ul>
</template>

<script>
import { getLocaleCode } from '@/helpers';

export default {
	functional: true,
	props: {
		items: {
			type: Array,
			default: () => []
		},
		i18n: {
			type: Object,
			required: true
			// default:() => {}
		},
		locale: {
			type: Function,
			default: props => getLocaleCode(props.i18n.locale)
		}
	}
};
</script>
