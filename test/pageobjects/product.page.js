const BasePage = require('./base.page');

const singleSelectors = {
    productImg: '//a[@class="woocommerce-main-image zoom"]//img',
    productTitle: '//div[@class="summary entry-summary"]//h1',
    productPrice: '//p[@class="price"]//span[@class="woocommerce-Price-amount amount"]',
    productDescription: '//div[@class="summary entry-summary"]//div[@itemprop="description"]//p',
    productStock: '//div[@class="summary entry-summary"]//p[@class="stock in-stock"]',
    tabsSection: '//div//ul[@class="tabs wc-tabs"]',
    descriptionTab: '//div//ul//li[contains(@class, "description_tab")]',
    reviewsTab: '//div//ul//li[contains(@class, "reviews_tab")]',
    tabDescriptionHeader: '//div[@id="tab-description"]//h2',
    tabDescriptionContent: '//div[@id="tab-description"]//p',
};

class ProductPage extends BasePage {

    constructor() {
        super();
        this.installGetters({ selectors: singleSelectors, type: 'single' });
    }

}

module.exports = new ProductPage();
