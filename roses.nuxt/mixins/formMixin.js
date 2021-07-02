import { updateFormData } from '@/helpers';

const itemFormMixin = {
	methods: {

		setupForm(itemData, formData) {
			// console.log(itemData, formData)
			return updateFormData(itemData, formData);
		},

		setupPage(item, options = {}) {
			// console.log(item);
			const prop = options.formDataName || 'formData';

			if (item) {
				this.itemId = item.id;
				this[prop] = this.setupForm(item, this[prop]);
			} else if (this.new_item_type) {
				this.formData.type = this.new_item_type;
			}
		},

		validateForm(options = {}) {
			const ref = options.activeFormName || 'itemForm';

			if (ref) {
				this.$refs[ref].validate(valid => {
					if (valid) {
						this.submitForm(options);
					} else {
						this.$notify({
							type: 'warning',
							title: "Form isn't ready",
							message: `Please check fields errors first`
						});
						return false;
					}
				});
			} else {
				this.submitForm(options);
			}
			
		},

		submitForm(options) {
			const formDataName = options.formDataName || 'formData';

			const data = {
				id: this.itemId,
				...this[formDataName]
			};
			// console.log(data);
			this.$emit('submit', data);
		}
	},

	watch: {
		itemData(data) {
			this.setupPage(data);
		}
	},

	created() {
		this.setupPage(this.itemData);
	}
};

export default itemFormMixin;
