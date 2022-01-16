const HomePage = require('../../pageobjects/home.page');
const ShopPage = require('../../pageobjects/shop.page');

describe('Home Page with three sliders', () => {
    
    before(() => {
        HomePage.openPage();
    });

    it('verify home page should have three sliders only', () => {
        // Navigate to Shop Page.
        ShopPage.navigateToPage();

        // Navigate to Home Page via logo button.
        HomePage.navigateToPage();

        // Validate sliders in Home Page.
        const pageSliders = HomePage.pageSliders;
        expect(pageSliders).toBeElementsArrayOfSize(3);
        expect(pageSliders).toBePresent();
    });
});
