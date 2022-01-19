const HomePage = require('../../pageobjects/home.page');
const ProductPage = require('../../pageobjects/product.page');
const HomeConstants = require('../../utils/home/HomeConstants');

describe('Home Page Arrival Items Description', () => {

    it('verify item description present in Item page', async () => {
        // Check Home page has three arrivals only.
        await HomePage.openPage();
        const arrivals = await HomePage.arrivalElements;
        await expect(arrivals).toBeElementsArrayOfSize(3);
        await expect(arrivals).toBePresent();

        // Scroll to arrivals, navigate to Item page and verify description.
        for (const [index, itemDetail] of HomeConstants.arrivalItems.entries()) {
            await arrivals[index].scrollIntoView();
            console.log(`Verify description for Arrival Item - ${itemDetail.itemName}`);

            // Navigate to arrival item page.
            const itemImg = await HomePage.getArrivalImgElem(index, itemDetail.itemName);
            await itemImg.click();
            await expect(browser).toHaveUrl(itemDetail.urlLink);

            // Verify arrival item details in product page.
            await expect(await ProductPage.productTitle).toHaveText(itemDetail.itemName);
            // TODO: handle separate image link for product and offer price elements.
            // await expect(await ProductPage.productImg).toHaveAttrContaining('src', itemDetail.imageLink);
            // await expect(await ProductPage.productPrice).toHaveTextContaining(itemDetail.itemPrice);
            await expect(await ProductPage.productDescription).toHaveText(itemDetail.description);

            // Scroll to, click and verify description tab contents.
            await ProductPage.tabsSection.scrollIntoView();
            const descriptionTab = await ProductPage.descriptionTab;
            await expect(descriptionTab).toHaveText('DESCRIPTION');
            await expect(descriptionTab).toHaveElementClassContaining('active');
            await expect(await ProductPage.tabDescriptionHeader).toHaveText('Product Description');
            await expect(await ProductPage.tabDescriptionContent).toHaveText(itemDetail.tabDescription);
            browser.url(HomePage.pageUrl);
        }
    });
});
