module.exports = class BasePage {

    constructor() {
        this.appUrl = browser.config.baseUrl;
    }

    open() {
        browser.maximizeWindow();
        return browser.url(this.appUrl);
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
}
