const BasePage = require('./base.page');

class HomePage extends BasePage {

    get pageContent() {
        return browser.$('//div[@id="content"]');
    }

    get pageSliders() {
        return browser.$$('//div[@data-slide-duration]');
    }

    openPage() {
        this.open();
        this.pageContent.waitForDisplayed({ timeout: 5000 });
    }

    goHomeByLogo() {
        expect(this.siteLogoButton).toBeDisplayed();
        this.siteLogoButton.click();
    }   
}

module.exports = new HomePage();
