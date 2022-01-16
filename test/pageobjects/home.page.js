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
        this.pageUrl = this.appUrl;
    }

    openPage() {
        this.open(this.pageUrl);
        this.pageContent.waitForDisplayed({ timeout: 5000 });
    }

    navigateToPage() {
        expect(this.siteLogoButton).toBeDisplayed();
        this.siteLogoButton.click();
        this.pageContent.waitForDisplayed({ timeout: 5000 });
    }
}

module.exports = new HomePage();
