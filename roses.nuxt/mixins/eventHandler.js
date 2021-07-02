// import { getParentPageRoute } from '@/helpers';

const eventHandler = {
	methods: {
		handleEvent(eventName, data) {
			// console.log(eventName, data)
			if (this[eventName]) {
				this[eventName](data);
			} else {
				console.warn(`incorrect eventName or component not contains called method (${eventName})`);
			}
		}
	}
};

export default eventHandler;
