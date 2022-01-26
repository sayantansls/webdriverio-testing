const HomePage = require('../../pageobjects/home.page');
const ProductPage = require('../../pageobjects/product.page');
const HomeConstants = require('../../utils/home/HomeConstants');
const ProductConstants = require('../../utils/product/ProductConstants');

describe('Home Page Arrival Item Reviews', () => {

    const reviewTabDetails = ProductConstants.reviewsTab;

    beforeEach(async () => {
        await HomePage.openPage();
    });

    it('verify item with no reviews present in Product Page', async () => {
        const index = 2;
        const arrivals = await HomePage.arrivalElements;
        const itemDetail = HomeConstants.arrivalItems[index];

        // Scroll to arrivals and navigate to selected item page.
        await arrivals[index].scrollIntoView();
        console.log(`Verify description for Arrival Item - ${itemDetail.itemName}`);
        HomePage.navigateToProductPage({ index, itemDetail });

        // Scroll to, click and verify reviews tab contents.
        const reviewsTab = await ProductPage.reviewsTab;
        await ProductPage.selectTab(reviewsTab);
        await ProductPage.checkTabSelected(reviewsTab);
        expect(reviewsTab).toHaveText(reviewTabDetails.tabHeader);

        // Verify details associated for item with no reviews.
        await expect(await ProductPage.tabReviewsHeader).toHaveText(reviewTabDetails.sectionHeader);
        await expect(await ProductPage.noReviewsContent).toHaveText(reviewTabDetails.noReviewContent);
        await expect(await ProductPage.reviewFormTitle).toHaveText(
            ProductPage.getReviewFormTitleText({ hasReview: false, itemName: itemDetail.itemName })
        );
    });

    it('verify user can submit a review for an item in Product Page', async () => {
        const index = 0;
        const arrivals = await HomePage.arrivalElements;
        const itemDetail = HomeConstants.arrivalItems[index];

        // Scroll to arrivals and navigate to selected item page.
        await arrivals[index].scrollIntoView();
        console.log(`Verify description for Arrival Item - ${itemDetail.itemName}`);
        HomePage.navigateToProductPage({ index, itemDetail });

        // Scroll to, click and verify reviews tab contents.
        const reviewsTab = await ProductPage.reviewsTab;
        await ProductPage.selectTab(reviewsTab);
        await ProductPage.checkTabSelected(reviewsTab);
        expect(reviewsTab).toHaveText(reviewTabDetails.tabHeader);

        // Verify review form attributes.
        const reviewFormHeaders = ProductConstants.reviewFormHeaders;
        await expect(await ProductPage.reviewNotes).toHaveText(reviewFormHeaders.commentNotes);
        const formRating = await ProductPage.reviewFormRating;
        await expect(await ProductPage.getReviewFormAttrLabel(formRating)).toHaveText(reviewFormHeaders.formRating);
        await expect(await ProductPage.reviewFormStars).toBeDisplayed();

        const testElementDetails = [
            {
                element: await ProductPage.reviewFormComment,
                label: reviewFormHeaders.formComment,
                type: 'textarea',
                testValue: 'This is a dummy comment',
            },
            {
                element: await ProductPage.reviewFormAuthor,
                label: reviewFormHeaders.formAuthor,
                type: 'input',
                testValue: 'Michael Scott',
            },
            {
                element: await ProductPage.reviewFormEmail,
                label: reviewFormHeaders.formEmail,
                type: 'input',
                testValue: 'greatscottproductions@gmail.com',
            },
        ];

        for (const testElement of testElementDetails) {
            await expect(await ProductPage.getReviewFormAttrLabel(testElement.element)).toHaveText(testElement.label);
            await ProductPage.checkFieldMandatory({ fieldElem: testElement.element, type: testElement.type });
            await ProductPage.verifyTextInputField({ inputField: testElement.element, type: testElement.type, inputText: testElement.testValue });
        }
    });

    it('verify item with reviews present in Product Page', async () => {
        const index = 1;
        const arrivals = await HomePage.arrivalElements;
        const itemDetail = HomeConstants.arrivalItems[index];

        // Scroll to arrivals and navigate to selected item page.
        await arrivals[index].scrollIntoView();
        console.log(`Verify description for Arrival Item - ${itemDetail.itemName}`);
        HomePage.navigateToProductPage({ index, itemDetail });

        // Scroll to, click and verify reviews tab contents.
        const reviewsTab = await ProductPage.reviewsTab;
        await ProductPage.selectTab(reviewsTab);
        await ProductPage.checkTabSelected(reviewsTab);
        expect(reviewsTab).toHaveText(reviewTabDetails.tabHeader);

        // Create a review.
        const testReview = ProductConstants.testReview;
        ProductPage.createReview(testReview);        

        // Verify details associated for item with reviews.
        await expect(await ProductPage.tabReviewsHeader).toHaveText(reviewTabDetails.sectionHeader);
        await expect(await ProductPage.noReviewsContent).not.toExist();
        await expect(await ProductPage.reviewFormTitle).toHaveText(ProductPage.getReviewFormTitleText({ hasReview: true }));
        await expect(await ProductPage.reviewContainer).toExist();
        
        await expect(await ProductPage.reviewItems).toBeElementsArrayOfSize(1);
        await expect(await ProductPage.getReviewImage()).toExist();
        await expect(await ProductPage.getReviewDescription()).toHaveText(testReview.comment);
        await expect(await ProductPage.getReviewRating()).toHaveAttrContaining('title', `Rated ${testReview.starRating} out of 5`);
    });
});
