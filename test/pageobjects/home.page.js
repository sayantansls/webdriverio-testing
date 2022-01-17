const BasePage = require('./base.page');

const singleSelectors = {
    pageContent: '//div[@id="content"]',
    siteLogoButton: '//div[@id="site-logo"]',
    pageTitle: '//div[@class="header-bar"]//a',
    arrivalsHeader: '//div[@id="text-22-sub_row_1-0-1-1-0"]//h2',
}

const multiSelectors = {
    pageSliders: '//div[@data-slide-duration]',
    arrivalElements: '//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div',
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
