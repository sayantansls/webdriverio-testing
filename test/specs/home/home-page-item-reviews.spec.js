const HomePage = require('../../pageobjects/home.page');
const ProductPage = require('../../pageobjects/product.page');
const HomeConstants = require('../../utils/home/HomeConstants');

describe('Home Page Arrival Item Reviews', () => {

    beforeEach(async () => {
        await HomePage.openPage();
    });

    it.skip('verify item with no reviews present in Product Page', async () => {
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
        expect(reviewsTab).toHaveText('REVIEWS (0)');

        // Verify details associated for item with no reviews.
        await expect(await ProductPage.tabReviewsHeader).toHaveText('Reviews');
        await expect(await ProductPage.noReviewsContent).toHaveText('There are no reviews yet.');
        await expect(await ProductPage.reviewFormTitle).toHaveText(`Be the first to review “${itemDetail.itemName}”`);
    });

    // TODO: add handling for adding reviews.
    it.skip('verify item with reviews present in Product Page', async () => {
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
        expect(reviewsTab).toHaveText('REVIEWS (0)');

        // Verify details associated for item with reviews.
        await expect(await ProductPage.tabReviewsHeader).toHaveText('Reviews');
        await expect(await ProductPage.noReviewsContent).not.toExist();
        await expect(await ProductPage.reviewFormTitle).toHaveText('Add a review');
        await expect(await ProductPage.reviewContainer).toExist();
        
        const reviewItemElements = await ProductPage.reviewItems;
        await expect(reviewItemElements).toBeElementsArrayOfSize(itemDetail.reviews.length);
        for (const [index, reviewDetail] of itemDetail.reviews) {
            await expect(await ProductPage.getReviewImage(index)).toExist();
            await expect(await ProductPage.getReviewDescription(index)).toHaveText(reviewDetail.description);
            await expect(await ProductPage.getReviewRating(index)).toHaveAttrContaining('title', `Rated ${reviewDetail.rating} out of 5`);
        }
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
        expect(reviewsTab).toHaveText('REVIEWS (0)');

        // Verify review form attributes.
        await expect(await ProductPage.reviewNotes).toHaveText('Your email address will not be published. Required fields are marked *');
        const formRating = await ProductPage.reviewFormRating;
        await expect(await ProductPage.getReviewFormAttrLabel(formRating)).toHaveText('Your Rating');
        await expect(await ProductPage.reviewFormStars).toBeDisplayed();

        const formComment = await ProductPage.reviewFormComment;
        await expect(await ProductPage.getReviewFormAttrLabel(formComment)).toHaveText('Your Review *');
        await ProductPage.checkFieldMandatory({ fieldElem: formComment, type: 'textarea' });
        await ProductPage.verifyTextInputField({ inputField: formComment, type: 'textarea', inputText: 'This is a dummy comment' });

        const formName = await ProductPage.reviewFormAuthor;
        await expect(await ProductPage.getReviewFormAttrLabel(formName)).toHaveText('Name *');
        await ProductPage.checkFieldMandatory({fieldElem: formName, type: 'input' });
        await ProductPage.verifyTextInputField({ inputField: formName, type: 'input', inputText: 'Michael Scott' });

        const formEmail = await ProductPage.reviewFormEmail;
        await expect(await ProductPage.getReviewFormAttrLabel(formEmail)).toHaveText('Email *');
        await ProductPage.checkFieldMandatory({fieldElem: formEmail, type: 'input' });
        await ProductPage.verifyTextInputField({ inputField: formEmail, type: 'input', inputText: 'greatscottproductions@gmail.com' });
    });
});
