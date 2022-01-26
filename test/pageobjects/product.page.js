const BasePage = require('./base.page');

const singleSelectors = {
    productImg: '//a[@class="woocommerce-main-image zoom"]//img',
    productTitle: '//div[@class="summary entry-summary"]//h1',
    productPrice: '//p[@class="price"]//span[@class="woocommerce-Price-amount amount"]',
    originalPrice: '//p[@class="price"]//del//span[@class="woocommerce-Price-amount amount"]',
    newPrice: '//p[@class="price"]//ins//span[@class="woocommerce-Price-amount amount"]',
    productDescription: '//div[@class="summary entry-summary"]//div[@itemprop="description"]//p',
    productStock: '//div[@class="summary entry-summary"]//p[@class="stock in-stock"]',
    tabsSection: '//div//ul[@class="tabs wc-tabs"]',
    descriptionTab: '//div//ul//li[contains(@class, "description_tab")]',
    reviewsTab: '//div//ul//li[contains(@class, "reviews_tab")]',
    tabDescriptionHeader: '//div[@id="tab-description"]//h2',
    tabDescriptionContent: '//div[@id="tab-description"]//p',
    tabReviewsHeader: '//div[@id="reviews"]//div[@id="comments"]//h2',
    noReviewsContent: '//div[@id="comments"]//p[@class="woocommerce-noreviews"]',
    reviewFormTitle: '//div[@id="review_form"]//h3[@id="reply-title"]',
    reviewContainer: '//div[@class="comment_container"]',
    reviewNotes: '//div[@id="review_form"]//p[@class="comment-notes"]',
    reviewFormRating: '//div[@id="review_form"]//p[@class="comment-form-rating"]',
    reviewFormStars: '//div[@id="review_form"]//p[@class="comment-form-rating"]//p[@class="stars"]',
    reviewFormComment: '//div[@id="review_form"]//p[@class="comment-form-comment"]',
    reviewFormAuthor: '//div[@id="review_form"]//p[@class="comment-form-author"]',
    reviewFormEmail: '//div[@id="review_form"]//p[@class="comment-form-email"]',
    reviewSubmitButton: '//div[@id="review_form"]//p[@class="form-submit"]//input[@class="submit"]',
};

const multiSelectors = {
    reviewItems: '//div[@id="comments"]//ol//li',
    reviewImages: '//div[@id="comments"]//ol//li//div//img',
    reviewDescriptions: '//div[@id="comments"]//ol//li//div[@class="description"]',
    reviewRatings: '//div[@id="comments"]//ol//li//div[@class="star-rating"]',
};

class ProductPage extends BasePage {

    constructor() {
        super();
        this.installGetters({ selectors: singleSelectors, type: 'single' });
        this.installGetters({ selectors: multiSelectors, type: 'multi' });
    }

    getProductImgLink(itemDetail) {
        return itemDetail.imageLink.replace('300x300', '600x600');
    }

    async checkTabSelected(tabElement) {
        await expect(tabElement).toHaveElementClassContaining('active');
    }

    async selectTab(tabElement) {
        await this.tabsSection.scrollIntoView({ behavior: 'smooth' });
        await tabElement.click();
    }

    async getReviewImage(index = 0) {
        const reviewImgElem = await this.reviewImages[index];
        await expect(reviewImgElem).toBeDisplayed();
        return reviewImgElem;
    }

    async getReviewDescription(index = 0) {
        const reviewRatingElem = await this.reviewDescriptions[index];
        await expect(reviewRatingElem).toBeDisplayed();
        return reviewRatingElem;
    }

    async getReviewRating(index = 0) {
        const reviewRatingElem = await this.reviewRatings[index];
        await expect(reviewRatingElem).toBeDisplayed();
        return reviewRatingElem;
    }

    async getReviewFormAttrLabel(formAttr) {
        const formAttrLabel = await formAttr.$('label');
        await expect(formAttrLabel).toBePresent();
        return formAttrLabel;
    }

    async checkFieldMandatory(options) {
        const { fieldElem, type } = options;
        await expect(fieldElem).toExist();
        const fieldLabel = await this.getReviewFormAttrLabel(fieldElem);
        await expect(fieldLabel).toHaveTextContaining('*');
        const fieldInput = await fieldElem.$(`${type}`);
        await expect(fieldInput).toHaveAttribute('required');
    }

    async verifyTextInputField(options) {
        const { inputField, type, inputText } = options;
        await expect(inputField).toExist();
        const fieldInput = await inputField.$(`${type}`);
        await fieldInput.setValue(inputText);
        await expect(await fieldInput.getValue()).toEqual(inputText);
    }

    async createStarRating(reviewRating) {
        await expect(await this.reviewFormStars).toBeDisplayed();
        const starRatingElement = await browser.$(`//p[@class="stars"]//a[@class="star-${reviewRating}"]`);
        await expect(starRatingElement).toBeClickable();
        await starRatingElement.click(); 
    };

    async createReview(reviewDetails) {
        await this.createStarRating(reviewDetails.starRating);
        await this.verifyTextInputField({ inputField: await this.reviewFormComment, type: 'textarea', inputText: reviewDetails.comment });
        await this.verifyTextInputField({ inputField: await this.reviewFormAuthor, type: 'input', inputText: reviewDetails.author });
        await this.verifyTextInputField({ inputField: await this.reviewFormEmail, type: 'input', inputText: reviewDetails.email });
        await this.reviewSubmitButton.click();
    }
}

module.exports = new ProductPage();
