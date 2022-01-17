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

    openPage() {
        this.open(this.pageUrl);
        this.sidebar.waitForDisplayed({ timeout: 5000 });
    }

    navigateToPage() {
        const shopOption = this.getTopBarOptionByName('Shop');
        expect(shopOption).toBeDisplayed();
        shopOption.click();
        this.sidebar.waitForDisplayed({ timeout: 5000 });
    }

}

module.exports = new ShopPage();