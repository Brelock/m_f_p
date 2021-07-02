<template functional>
	<transition name="overlay">
		<div
			@click="listeners.onClick"
			v-show="props.active"
			:style="{ zIndex: props.z }"
			:class="['darkOverlay', { 'full-screen': props.fullScreen }, {'lighten':props.lighten}]"
		>
			<div class="caption" v-if="props.text">{{ props.text }}</div>
		</div>
	</transition>
</template>

<script>
export default {
	functional: true,
	props: {
		active: Boolean,
		text: String,
		fullScreen: {
			type: Boolean,
			default: false
		},
		lighten: Boolean,
		z: Number
	}
};
</script>

<style>
	.overlay-enter-active, .overlay-leave-active {
	  transition: opacity .5s;
	}
	.overlay-enter, .overlay-leave-to {
	  opacity: 0;
	}
</style>
