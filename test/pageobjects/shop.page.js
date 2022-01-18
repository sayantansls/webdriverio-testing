const BasePage = require('./base.page');

const singleSelectors = {
    sidebar: '//aside[@id="sidebar"]'
}

class ShopPage extends BasePage {

    constructor() {
        super();
        this.installGetters({ selectors: singleSelectors, type: 'single' });
        this.pageUrl = new URL('/shop/', this.appUrl).href;
    }

    async openPage() {
        await this.open(this.pageUrl);
        const sidebarElem = await this.sidebar;
        await sidebarElem.waitForDisplayed({ timeout: 5000 });
    }

    async navigateToPage() {
        const shopOption = await this.getTopBarOptionByName('Shop');
        await expect(shopOption).toBeDisplayed();
        await shopOption.click();
        const sidebarElem = await this.sidebar;
        await sidebarElem.waitForDisplayed({ timeout: 5000 });
    }

}

module.exports = new ShopPage();