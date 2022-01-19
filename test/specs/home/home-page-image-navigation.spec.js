const HomePage = require('../../pageobjects/home.page');
const HomeConstants = require('../../utils/home/HomeConstants');

describe('Home Page Images in Arrivals Navigation', () => {

    it('verify user can navigate to page via image and add book to basket', async () => {
        // Check Home page has three arrivals only.
        await HomePage.openPage();
        const arrivals = await HomePage.arrivalElements;
        await expect(arrivals).toBeElementsArrayOfSize(3);
        await expect(arrivals).toBePresent();

        // Scroll to arrivals and verify arrival element details.
        for (const [index, arrivalDetail] of HomeConstants.arrivalItems.entries()) {
            await arrivals[index].scrollIntoView();
            console.log(`Verify details for Arrival Item - ${arrivalDetail.itemName}`);

            // Verify arrival details - link, img, name and price for each arrival.
            await expect(await HomePage.getArrivalLink(index)).toHaveAttributeContaining('href', arrivalDetail.urlLink);
            const arrivalImg = await HomePage.getArrivalImgElem(index, arrivalDetail.itemName);
            await expect(arrivalImg).toHaveAttributeContaining('src', arrivalDetail.imageLink);
            await expect(arrivalImg).toBeClickable();

            await expect(await HomePage.getArrivalItemName(index)).toHaveText(arrivalDetail.itemName);
            await expect(await HomePage.getArrivalItemPrice(index)).toHaveTextContaining(arrivalDetail.itemPrice);

            // Verify add to basket button and navigation.
            const addToBasketElem = await HomePage.getArrivalAddToBasketElem(index);
            await expect(addToBasketElem).toHaveText('ADD TO BASKET');

            await arrivalImg.click();
            await expect(browser).toHaveUrl(arrivalDetail.urlLink);
            browser.url(HomePage.pageUrl);
        }
    });
});
