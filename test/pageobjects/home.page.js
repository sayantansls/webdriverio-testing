const BasePage = require('./base.page');

const singleSelectors = {
    pageContent: '//div[@id="content"]',
    siteLogoButton: '//div[@id="site-logo"]',
    pageTitle: '//div[@class="header-bar"]//a',
}

const multiSelectors = {
    pageSliders: '//div[@data-slide-duration]',
}

class HomePage extends BasePage {

    constructor() {
        super();
        this.installGetters({ selectors: singleSelectors, type: 'single' });
        this.installGetters({ selectors: multiSelectors, type: 'multi' });
        this.pageUrl = new URL('/home', this.appUrl);
    }

    openPage() {
        this.open();
        this.pageContent.waitForDisplayed({ timeout: 5000 });
    }

    goHomeByLogo() {
        expect(this.siteLogoButton).toBeDisplayed();
        this.siteLogoButton.click();
    }

    getTopBarOptionByName(optionName) {
        return browser.$(`//ul/li/a[contains(text(), "${optionName}")]`);
    }
}

module.exports = new HomePage();
