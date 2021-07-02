const tabsMixin = {
	data() {
		return {
			tabsData: {},
			activeTab: ''
		};
	},

	methods: {
		initTabs(tabs) {
			for (let i = 0; i < tabs.length; i++) {
				this.tabsData[tabs[i].prop] = i == 0 ? true : false;
			}
			if (!this.activeTab) {
				this.activeTab = tabs[0].prop;				
			}
		},

		closeTabs(tabs) {
			for (let tab of tabs) {
				this.tabsData[tab.prop] = false;
			}
		},

		toggleTab(tab) {
			if (!this.tabsData[tab.prop]) {
				this.closeTabs(this.tabsList);
				this.tabsData[tab.prop] = true;
				this.activeTab = tab.prop;
				if (this.onChangeTab) {
					this.onChangeTab(tab);
				}
			}
			// console.log(this.tabsData)
		}
	},

	created() {
		this.initTabs(this.tabsList);
	}
};

export default tabsMixin;
