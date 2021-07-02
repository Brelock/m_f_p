class Thnstkapi {
  constructor() {
    this._hostUrl = window.location.origin; 
    this._baseUrlCabinet = `${this._hostUrl}/cabinet/`; 
    this._baseUrlDeliveries = `${this._hostUrl}/deliveries/`; 
    this._baseUrlFavorite = `${this._hostUrl}/`; 
    this._baseUrlStores = `${this._hostUrl}/stores`; 
    this._baseUrlAutocomplete = `/topSearch/`
  }

  getResource(url) {
    return axios.get(url);
  }

  postResource(url) {
    return axios.post(url);
  }

  getNewPostDepartmentsById(id) {
    let url = `${this._baseUrlCabinet}addresses/get-np-warehouses/${id}`;
    return this.getResource(url);
  }

  getNewPostCitiesByQuery(query) {
    var url = `${this._baseUrlDeliveries}nova-poshta/get-cities?q=${query}`;
    return this.getResource(url);
  }

  getNewPostDepartmentsByIdInCheckout(id) {
    let url = `${this._baseUrlDeliveries}nova-poshta/get-warehouses/${id}`;
    return this.getResource(url);
  }

  getPickupDepartmentsById(id) {
    let url = `${this._baseUrlDeliveries}pickup/get-stores/${id}`;
    return this.getResource(url);
  }

  postToggleFavorites(id) {
    let url = `${this._baseUrlFavorite}favorites/${id}/toggle`;
    return this.postResource(url);
  }

  // addGuarantee(prodId, guaranteeId) {
  // 	axios.post(`/cart/add-warranty/${prodId}/${guaranteeId}`)
  // 		.then(response => {
  // 			console.log('/add-warranty', response);
  // 		});
  // }

  // removeGuarantee(prodId, cb) {
  // 	axios.post(`/cart/remove-warranty/${prodId}`)
  // 		.then(response => {
  // 			console.log(`/remove-warranty/${prodId}`, response);
  // 		})
  // 		.then(response => {
  // 			if ( cb ) {
  // 				cb();
  // 			}
  // 		});
  // }

  getAllCitiesInOfficesPage() {
    const url = `${this._baseUrlStores}`
    return this.getResource(url);
  }

  getOfficesByCityId(id) {
    const url = `${this._baseUrlStores}?city=${id}`
    return this.getResource(url);
  }

  getAutocompleteData(str, isRuLang) {
    const url = isRuLang ? 
      `${this._hostUrl}/ru${this._baseUrlAutocomplete}${str}` :
      `${this._hostUrl}${this._baseUrlAutocomplete}${str}`;
    return this.getResource(url);
  }

};