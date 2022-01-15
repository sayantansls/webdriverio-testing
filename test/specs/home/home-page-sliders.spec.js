const HomePage = require('../../pageobjects/home.page');

describe('Home Page with three sliders', () => {
    it('verify home page should have three sliders only', () => {
        HomePage.openPage();
        browser.pause(4000);
        const shopOption = HomePage.getTopBarOptionByName('Shop');
        expect(shopOption).toBeDisplayed();
        shopOption.click();
        HomePage.goHomeByLogo();
        const pageSliders = HomePage.pageSliders;
        expect(pageSliders).toBeElementsArrayOfSize(3);
    });
});
