const HomePage = require('../../pageobjects/home.page');
const ProductPage = require('../../pageobjects/product.page');
const HomeConstants = require('../../utils/home/HomeConstants');
const ProductConstants = require('../../utils/product/ProductConstants');

describe('Home Page Arrival Item Description', () => {

    it('verify item description present in Product Page', async () => {
        // Check Home page has three arrivals only.
        await HomePage.openPage();
        const arrivals = await HomePage.arrivalElements;
        await expect(arrivals).toBeElementsArrayOfSize(3);
        await expect(arrivals).toBePresent();

        // Scroll to arrivals, navigate to Item page and verify description.
        for (const [index, itemDetail] of HomeConstants.arrivalItems.entries()) {
            await arrivals[index].scrollIntoView();
            console.log(`Verify description for Arrival Item - ${itemDetail.itemName}`);
            HomePage.navigateToProductPage({ index, itemDetail });

            // Verify arrival item details in product page.
            await expect(await ProductPage.productTitle).toHaveText(itemDetail.itemName);
            await expect(await ProductPage.productImg).toHaveAttrContaining('src', ProductPage.getProductImgLink(itemDetail));
            if (itemDetail.offerPrice) {
                await expect(await ProductPage.originalPrice).toHaveTextContaining(itemDetail.offerPrice.origPrice);
                await expect(await ProductPage.newPrice).toHaveTextContaining(itemDetail.offerPrice.newPrice);
            } else {
                await expect(await ProductPage.productPrice).toHaveTextContaining(itemDetail.itemPrice);
            }
            await expect(await ProductPage.productDescription).toHaveText(itemDetail.description);

            // Scroll to, click and verify description tab contents.
            const descriptionTabDetails = ProductConstants.descriptionTab;
            await ProductPage.tabsSection.scrollIntoView();
            const descriptionTab = await ProductPage.descriptionTab;
            await expect(descriptionTab).toHaveText(descriptionTabDetails.tabHeader);
            await ProductPage.checkTabSelected(descriptionTab); // Description tab is selected by default.
            
            await expect(await ProductPage.tabDescriptionHeader).toHaveText(descriptionTabDetails.sectionHeader);
            await expect(await ProductPage.tabDescriptionContent).toHaveText(itemDetail.tabDescription);
            browser.url(HomePage.pageUrl);
        }
    });
});
