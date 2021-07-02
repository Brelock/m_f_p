<template functional>
	<client-only>
		<div :class="['custom-dialog-wrapper', props.className, {'active': props.active}]">
			<div class="popupContentWrapper">
				<div class="modalHeader flex wrap relative">
					<div class="modal-title" v-if="props.title">{{props.title}}</div>
					<button class="popupCloseButton" type="button"
						@click="listeners.onClose">
						<i class="icomoon icon-cross1"></i>
					</button>
				</div>
							
				<slot></slot>
			</div>
		</div>
	</client-only>
</template>

<script>

export default {
	functional: true,

	props: {
		// filters: Object,
		active: Boolean,
		className: String,
		title: String
	},
};
</script>