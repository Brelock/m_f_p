import Vue from 'vue';
// import Element from 'element-ui';
// import locale from 'element-ui/lib/locale/lang/en';
import langEn from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import Select from 'element-ui/lib/select';

// import MessageBox from 'element-ui/lib/message-box';
// import Message from 'element-ui/lib/message';
// import Notification from 'element-ui/lib/notification';


Vue.component('ElMessageBox', () => import(/* webpackChunkName: "ElMessageBox"*/ 'element-ui/lib/message-box'));
Vue.component('ElMessage', () => import(/* webpackChunkName: "ElMessage"*/ 'element-ui/lib/message'));
Vue.component('ElNotification', () => import(/* webpackChunkName: "ElNotification"*/ 'element-ui/lib/notification'));
// Vue.component('ElForm', () => import(/* webpackChunkName: "ElForm"*/ 'element-ui/lib/form'));
// Vue.component('ElFormItem', () => import(/* webpackChunkName: "ElFormItem"*/ 'element-ui/lib/form-item'));
Vue.component('ElInput', () => import(/* webpackChunkName: "ElInput"*/ 'element-ui/lib/input'));
Vue.component('ElInputNumber', () => import(/* webpackChunkName: "ElInputNumber"*/ 'element-ui/lib/input-number'));
// Vue.component('ElCollapse', () => import(/* webpackChunkName: "ElCollapse"*/ 'element-ui/lib/collapse'));
// Vue.component('ElCollapseItem', () => import(/* webpackChunkName: "ElCollapseItem"*/ 'element-ui/lib/collapse-item'));
// Vue.component('ElSelect', () => import(/* webpackChunkName: "ElSelect"*/ 'element-ui/lib/select'));
Vue.component('ElOption', () => import(/* webpackChunkName: "ElOption"*/ 'element-ui/lib/option'));
Vue.component('ElCheckbox', () => import(/* webpackChunkName: "ElCheckbox"*/ 'element-ui/lib/checkbox'));
Vue.component('ElRadio', () => import(/* webpackChunkName: "ElRadio"*/ 'element-ui/lib/radio'));

// Vue.component('ElCheckboxGroup', () => import(/* webpackChunkName: "ElCheckboxGroup"*/ 'element-ui/lib/checkbox-group'));
// Vue.component('ElPagination', () => import(/* webpackChunkName: "ElPagination"*/ 'element-ui/lib/pagination'));
Vue.component('ElSlider', () => import(/* webpackChunkName: "ElSlider"*/ 'element-ui/lib/slider'));
Vue.component('ElDialog', () => import(/* webpackChunkName: "ElDialog"*/ 'element-ui/lib/dialog'));


Select.computed.readonly = function() {
	const isIE = !this.$isServer && !Number.isNaN(Number(document.documentMode));

	return !(this.filterable || this.multiple || !isIE) && !this.visible;
};
Vue.use(Select);

locale.use(langEn);

// import { MessageBox, Message, Notification } from 'element-ui';



// Vue.use(Element, { locale });
