const HomePage = require('../../pageobjects/home.page');
const ShopPage = require('../../pageobjects/shop.page');

describe('Home Page with three arrivals', () => {

    it('verify home page should have three arrivals only', async () => {
        await HomePage.openPage();

        // Navigate to Shop Page.
        await ShopPage.navigateToPage();

        // Navigate to Home Page via logo button.
        await HomePage.navigateToPage();

        // Verify arrivals in Home Page.
        const arrivalsHeader = await HomePage.arrivalsHeader;
        await expect(arrivalsHeader).toHaveText('new arrivals');
        const arrivals = await HomePage.arrivalElements;
        await expect(arrivals).toBeElementsArrayOfSize(3);
        await expect(arrivals).toBePresent();
    });
});