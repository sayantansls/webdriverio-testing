const HomePage = require('../../pageobjects/home.page');
const ShopPage = require('../../pageobjects/shop.page');

describe('Home Page with three arrivals', () => {

    before(() => {
        HomePage.openPage();
    });

    it('verify home page should have three arrivals only', () => {
        // Navigate to Shop Page.
        ShopPage.navigateToPage();

        // Navigate to Home Page via logo button.
        HomePage.navigateToPage();

        // Verify arrivals in Home Page.
        const arrivalsHeader = HomePage.arrivalsHeader;
        expect(arrivalsHeader).toHaveText('new arrivals');
        const arrivals = HomePage.arrivalElements;
        expect(arrivals).toBeElementsArrayOfSize(3);
        expect(arrivals).toBePresent();
    });
});