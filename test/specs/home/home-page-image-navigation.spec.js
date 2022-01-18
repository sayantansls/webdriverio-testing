const HomePage = require('../../pageobjects/home.page');

describe('Home Page Images in Arrivals Navigation', () => {

    it('verify user can navigate to page via image and add book to basket', async () => {
        // Check Home page has three arrivals only.
        await HomePage.openPage();
        const arrivals = await HomePage.arrivalElements;
        await expect(arrivals).toBeElementsArrayOfSize(3);
        await expect(arrivals).toBePresent();

        // Scroll to arrivals and verify arrival element details.
        const arrivalDetails = [
            {
                urlLink: 'http://practice.automationtesting.in/product/selenium-ruby/',
                imageLink: 'http://practice.automationtesting.in/wp-content/uploads/2017/01/Selenium-Ruby-300x300.jpg',
                itemName: 'Selenium Ruby',
                itemPrice: '500.00',
            },
            {
                urlLink: 'http://practice.automationtesting.in/product/thinking-in-html/',
                imageLink: 'http://practice.automationtesting.in/wp-content/uploads/2017/01/Thinking-in-HTML-300x300.jpg',
                itemName: 'Thinking in HTML',
                itemPrice: '400.00',
            },
            {
                urlLink: 'http://practice.automationtesting.in/product/mastering-javascript/',
                imageLink: 'http://practice.automationtesting.in/wp-content/uploads/2017/01/Mastering-JavaScript-300x300.jpg',
                itemName: 'Mastering JavaScript',
                itemPrice: '350.00',
            },
        ];
        for (const [index, arrivalDetail] of arrivalDetails.entries()) {
            await arrivals[index].scrollIntoView();
            console.log(`Verify details for Arrival Item - ${index}`);

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
