const HomePage = require('../../pageobjects/home.page');
const ShopPage = require('../../pageobjects/shop.page');

describe('Home Page with three sliders', () => {
    
    it('verify home page should have three sliders only', async () => {
        await HomePage.openPage();

        // Navigate to Shop Page.
        await ShopPage.navigateToPage();

        // Navigate to Home Page via logo button.
        await HomePage.navigateToPage();

        // Validate sliders in Home Page.
        const pageSliders = await HomePage.pageSliders;
        await expect(pageSliders).toBeElementsArrayOfSize(3);
        await expect(pageSliders).toBePresent();
    });
});
