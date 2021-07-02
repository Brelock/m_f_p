<template>
	<div class="">
		<div class="slider-inputs flex" v-if="showInputs">
			<el-input-number :min="min" :max="max" :controls="false"
				@change="val=>handleInputChange(val, 0)"
				:value="value[0]"
				:label="$t('common.from')"
			/>
			<el-input-number :min="min" :max="max" :controls="false"
				@change="val=>handleInputChange(val, 1)"
				:value="value[1]"
				:label="$t('common.to')"
			/>
		</div>

		<el-slider ref="ElSlider"
			tooltip-class="slider-tooltip"
			@change="handleSliderChange"
			v-model="value"
			range
			:min="min"
			:max="max"
		>
		</el-slider>
	</div>	
</template>

<script>
export default {
	props: {
		options: {
			type: Object,
			default: () => ({})
		},

		min: {
			type: Number,
			default: 10
		},
		max: {
			type: Number,
			default: 100000
		},
		/*initialMin: {
			type: Number,
			default: 10
		},
		initialMax: {
			type: Number,
			default: 10000
		},*/
		showInputs: Boolean
	},

	data() {
		return {
			value: [],
		};
	},
	methods: {
		handleInputChange(val, idx) {
			this.value[idx] = val;
			if (idx == 0) {
				this.$refs.ElSlider.firstValue = val;
			} else {
				this.$refs.ElSlider.secondValue = val;
			}
			this.handleSliderChange(this.value);
		},

		handleSliderChange(val) {
			this.$emit('onChange', { minPrice:val[0], maxPrice:val[1] });
		}
	},

	watch: {
		min(min) {
			if (min != this.value[0]) {
				this.value[0] = min || 0;
			}
		},
		max(max) {
			if (max != this.value[1]) {
				this.value[1] = max || 1;
			}
		}
	},

	created() {
		this.value = [this.min, this.max];
	}
};
</script>

