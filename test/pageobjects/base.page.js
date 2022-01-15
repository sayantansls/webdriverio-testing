module.exports = class BasePage {

    constructor() {
        this.appUrl = browser.config.baseUrl;
    }

    get siteLogoButton() {
        return browser.$('//div[@id="site-logo"]');
    }

    get pageTitle() {
        return browser.$('//div[@class="header-bar"]').$('a');
    }

    open() {
        browser.maximizeWindow();
        return browser.url(this.appUrl);
    }

    getPageTitle() {
        expect(this.pageTitle).toExist();
        return this.pageTitle.getText();
    }

    getTopBarOptionByName(optionName) {
        return browser.$(`//ul/li/a[contains(text(), "${optionName}")]`);
    }
}
