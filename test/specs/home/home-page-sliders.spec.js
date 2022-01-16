const HomePage = require('../../pageobjects/home.page');

describe('Home Page with three sliders', () => {
    
    before(() => {
        HomePage.openPage();
    });

    it('verify home page should have three sliders only', () => {
        // Navigate to Shop Page.
        const shopOption = HomePage.getTopBarOptionByName('Shop');
        expect(shopOption).toBeDisplayed();
        shopOption.click();

        // Navigate to Home Page via logo button.
        HomePage.goHomeByLogo();

        // Validate sliders in Home Page.
        const pageSliders = HomePage.pageSliders;
        expect(pageSliders).toBeElementsArrayOfSize(3);
    });
});
