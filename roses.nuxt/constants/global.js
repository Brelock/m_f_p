/*const test = {
	get data() {
		return []
	}
}*/

const USER_TYPES = {
	INTERNAL: 1,
	CLIENT: 2
};

const userTypesList = [
	{ id: USER_TYPES.INTERNAL, name: 'Internal' },
	{ id: USER_TYPES.CLIENT, name: 'Client' }
];

const PRODUCT_ACTION_TYPES = {
	HIT: 1,
	NEW: 2,
	DISCOUNT: 3
};

const product_actions = [
	{ id: PRODUCT_ACTION_TYPES.HIT, name: 'ХИТ', className: 'hit' },
	{ id: PRODUCT_ACTION_TYPES.NEW, name: 'NEW', className: 'new' },
	{ id: PRODUCT_ACTION_TYPES.DISCOUNT, name: 'скидка', className: 'discount' }
];

const DELIVERY_TYPES = {
	PICKUP: 2,
  REGION: 3
};

const deliveryTypesList = [
	{ id: DELIVERY_TYPES.PICKUP, title_ru: 'Самовывоз', title_uk: 'איסוף עצמי' },
	{ id: DELIVERY_TYPES.REGION, title_ru: 'Курьер', title_uk: 'שָׁלִיחַ' }
];

const PAYMENTS_TYPES = {
	CASH: 1,
	CARD: 2
};

const paymentsTypesList = [
	{ id: PAYMENTS_TYPES.CASH, title_ru: 'Наличными', title_uk: 'במזומן' },
	{ id: PAYMENTS_TYPES.CARD, title_ru: 'Банковской картой', title_uk: 'כרטיס בנק' },
];

// const logoSrc = 'static/img/main-logo.svg';
// const logoSrc = 'static/img/150x150.jpg';
const mockImg = require('@/assets/img/icons/150x150.jpg');
const mockImgBig = require('@/assets/img/icons/290x290.jpg');
// const logoImg = require('@/assets/img/main-logo.svg');

export {
	USER_TYPES,
	userTypesList,
	PRODUCT_ACTION_TYPES,
	product_actions,
	DELIVERY_TYPES,
	deliveryTypesList,
	PAYMENTS_TYPES,
	paymentsTypesList,
	mockImg,
	mockImgBig,
	// logoImg
};
