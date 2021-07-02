const headerMenuData = {
	sub_categories: [
		{
			id: 1, name: 'Phones', slug: 'c_phones',
			sub_categories: [
				{
					id:12, name:'Samsung', slug : 'c_samsung',
					products: [
						{
							id:1, name:'Galaxy 5', slug: 'galaxy_5'
						},
						{
							id:2, name:'Galaxy 6', slug: 'galaxy_6'
						},
						{
							id:3, name:'Galaxy 7', slug: 'galaxy_7'
						},
					]
				},
				{
					id:13, name:'Nokia', slug: 'c_nokia',
					/*products: [
						{
							id:4, name:'Nokia 4410', slug: 'nokia_4410'
						},
						{
							id:5, name:'Nokia 4420', slug: 'nokia_4420'
						},
						{
							id:6, name:'Nokia 4430', slug: 'nokia_4430'
						},
					]*/
				}
			]
		},
		{
			id: 2, name: 'Cars', slug: 'c_cars',
			/*products: [
				{
					id:7, name:'BMW', slug: 'bmw'
				},
				{
					id:8, name:'Audi', slug: 'audi'
				},
				{
					id:9, name:'Ford', slug: 'ford'
				},
			]*/
		}
	]
	
};

/*topOfTheDay: {
	id: 1,
	p_slug: 'Galax,
	category_id: 1,
	c_slug: 'phones',
	category_name: 'Phones',
	sub_category_id: 12,
	sub_category_name: 'Samsung',
	name: 'Galaxy 5',
	is_favorited: false,
	rating: 4,
	comments: [],
	price: 454,
	action_price: null,
	currency_id: 1,
	currency_name: 'грн.',
	actions: [],
	img: require('@/assets/img/products/prod-1.jpg')
}*/


/*let products = [
	{
		id: 1,
		p_slug: 'galaxy_5',
		category_id: 1,
		c_slug: 'phones',
		category_name: 'Phones',
		sub_category_id: 12,
		sub_category_name: 'Samsung',
		name: 'Galaxy 5',
		is_favorited: false,
		rating: 3,
		comments: [],
		price: 454,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [1],
		img: require('@/assets/img/products/prod-1.jpg'),
		isNew: true
	},
	{
		id: 2,
		p_slug: 'galaxy_6',
		category_id: 1,
		c_slug: 'phones',
		category_name: 'Phones',
		sub_category_id: 12,
		sub_category_name: 'Samsung',
		name: 'Galaxy 6',
		is_favorited: false,
		rating: 4,
		comments: [],
		price: 454,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [2],
		img: require('@/assets/img/products/prod-2.jpg'),
		topOfTheDay: true,
		bestSeller: true
	},
	{
		id: 3,
		p_slug: 'galaxy_7',
		category_id: 1,
		c_slug: 'phones',
		category_name: 'Phones',
		sub_category_id: 12,
		sub_category_name: 'Samsung',
		name: 'Galaxy 7',
		is_favorited: false,
		rating: 5,
		comments: [],
		price: 654,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [2],
		img: require('@/assets/img/products/prod-1.jpg'),
		bestSeller: true
	},
	{
		id: 4,
		p_slug: 'nokia_4410',
		category_id: 1,
		c_slug: 'phones',
		category_name: 'Phones',
		sub_category_id: 13,
		sub_category_name: 'Nokia',
		name: 'Nokia 4410',
		is_favorited: false,
		rating: 4,
		comments: [],
		price: 500,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [1],
		img: require('@/assets/img/products/prod-3.jpg'),
		isNew: true
	},
	{
		id: 5,
		p_slug: 'nokia_4420',
		category_id: 1,
		c_slug: 'phones',
		category_name: 'Phones',
		sub_category_id: 13,
		sub_category_name: 'Nokia',
		name: 'Nokia 4420',
		is_favorited: false,
		rating: 5,
		comments: [],
		price: 654,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [1],
		img: require('@/assets/img/products/prod-3.jpg'),
		bestSeller: true,
		isNew: true
	},
	{
		id: 6,
		p_slug: 'nokia_4430',
		category_id: 1,
		c_slug: 'phones',
		category_name: 'Phones',
		sub_category_id: 13,
		sub_category_name: 'Nokia',
		name: 'Nokia 4430',
		is_favorited: false,
		rating: 3,
		comments: [],
		price: 454,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [2],
		img: require('@/assets/img/products/prod-3.jpg'),
		bestSeller: true
	},
	{
		id: 7,
		p_slug: 'bmw',
		category_id: 2,
		c_slug: 'cars',
		category_name: 'Cars',
		sub_category_id: null,
		sub_category_name: '',
		name: 'BMW',
		is_favorited: false,
		rating: 5,
		comments: [],
		price: 4540,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [2],
		img: require('@/assets/img/products/prod-4.jpg'),
		bestSeller: true
	},
	{
		id: 8,
		p_slug: 'audi',
		category_id: 2,
		c_slug: 'cars',
		category_name: 'Cars',
		sub_category_id: null,
		sub_category_name: '',
		name: 'Audi',
		is_favorited: false,
		rating: 4,
		comments: [],
		price: 4540,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [],
		img: require('@/assets/img/products/prod-5.jpg'),
		isNew: true
	},
	{
		id: 9,
		p_slug: 'ford',
		category_id: 2,
		c_slug: 'cars',
		category_name: 'Cars',
		sub_category_id: null,
		sub_category_name: '',
		name: 'Ford',
		is_favorited: false,
		rating: 3,
		comments: [],
		price: 3540,
		action_price: null,
		currency_id: 1,
		currency_name: 'грн.',
		actions: [3],
		discount_price: 2000,
		img: require('@/assets/img/products/prod-6.jpg'),
		isNew: true
	}
];*/

const brands = [
	{id:1, name:'brand 1', brandImg: require('@/assets/img/logo_brand1.png') },
	{id:2, name:'brand 2', brandImg: require('@/assets/img/logo_brand2.png') },
	{id:3, name:'brand 3', brandImg: require('@/assets/img/logo_brand3.png') },
	{id:4, name:'brand 1', brandImg: require('@/assets/img/logo_brand1.png') },
	{id:5, name:'brand 2', brandImg: require('@/assets/img/logo_brand2.png') },
	{id:6, name:'brand 3', brandImg: require('@/assets/img/logo_brand3.png') }
];

	

export { headerMenuData, /*products,*/ brands };
