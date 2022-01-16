module.exports = class BasePage {

    constructor() {
        this.appUrl = browser.config.baseUrl;
    }

    open(urlPath) {
        browser.maximizeWindow();
        return browser.url(urlPath);
    }

    installGetters(options) {
        const { selectors, type } = options;
        for (const key of Object.keys(selectors)) {
            if (type == 'multi') {
                Object.defineProperty(this, key, {
                    get() {
                        return browser.$$(selectors[key]);
                    }
                });
            } else {
                Object.defineProperty(this, key, {
                    get() {
                        return browser.$(selectors[key]);
                    }
                });
            }
        }
    }

    getTopBarOptionByName(optionName) {
        return browser.$(`//ul/li/a[contains(text(), "${optionName}")]`);
    }
}
