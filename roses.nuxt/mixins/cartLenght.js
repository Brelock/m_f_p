const cartLenght = {
	computed: {
		cartLenght() {
			const { cartData } = this;
			if (cartData && cartData.orderProducts) {
				return cartData.orderProducts.length;
			}
			return 0;

			/*for(let cartItem of this.cartData) {
				quantity += cartItem.orderProducts.length;
				final_amount += cartItem.final_amount;
			}

			return {quantity:quantity, final_amount:final_amount};*/
		},
	}
};

export default cartLenght;
