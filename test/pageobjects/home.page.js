const BasePage = require('./base.page');

const singleSelectors = {
    pageContent: '//div[@id="content"]',
    siteLogoButton: '//div[@id="site-logo"]',
    pageTitle: '//div[@class="header-bar"]//a',
    arrivalsHeader: '//div[@id="text-22-sub_row_1-0-1-1-0"]//h2',
    viewBasketLink: '//a[@class="added_to_cart wc-forward"]',
    menuItems: '//a[@class="wpmenucart-contents"]//span[@class="cartcontents"]',
    menuAmount: '//a[@class="wpmenucart-contents"]//span[@class="amount"]',
    emptyCartElem: '//a[@class="wpmenucart-contents empty-wpmenucart-visible"]',
    menuCartElem: '//a[@class="wpmenucart-contents"]',
}

const multiSelectors = {
    pageSliders: '//div[@data-slide-duration]',
    arrivalElements: '//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div',
}

class HomePage extends BasePage {

    constructor() {
        super();
        this.installGetters({ selectors: singleSelectors, type: 'single' });
        this.installGetters({ selectors: multiSelectors, type: 'multi' });
        this.pageUrl = this.appUrl;
    }

    async openPage() {
        await this.open(this.pageUrl);
        await this.pageContent.waitForDisplayed({ timeout: 5000 });
    }

    async navigateToPage() {
        const siteLogoButton = await this.siteLogoButton;
        await expect(siteLogoButton).toBeDisplayed();
        await siteLogoButton.click();
        const pageContent = await this.pageContent;
        await pageContent.waitForDisplayed({ timeout: 5000 });
    }

    async getArrivalLink(index) {
        const linkElement = await browser.$(
            `//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div[${index + 1}]//a[@class="woocommerce-LoopProduct-link"]`
        );
        await expect(linkElement).toBePresent();
        return linkElement;
    }

    async getArrivalImgElem(index, title) {
        const imgElement = await browser.$(
            `//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div[${index + 1}]//img[@title="${title}"]`
        );
        await expect(imgElement).toBeDisplayed();
        return imgElement;
    }

    async getArrivalItemName(index) {
        const nameElement = await browser.$(
            `//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div[${index + 1}]//h3`
        );
        await expect(nameElement).toBeDisplayed();
        return nameElement;
    }

    async getArrivalItemPrice(index) {
        const priceElement = await browser.$(
            `//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div[${index + 1}]//span[@class="price"]`
        );
        await expect(priceElement).toBeDisplayed();
        return priceElement;
    }

    async getArrivalAddToBasketElem(index) {
        const addToBasketElem = await browser.$(
            `//*[@id="themify_builder_content-22"]/div[2]/div/div/div/div/div[2]/div[${index + 1}]//a[@rel="nofollow"]`
        );
        await expect(addToBasketElem).toBeDisplayed();
        return addToBasketElem;
    }

    async navigateToProductPage(options) {
        const { index, itemDetail } = options;
        const itemImg = await this.getArrivalImgElem(index, itemDetail.itemName);
        await itemImg.click();
        await expect(browser).toHaveUrl(itemDetail.urlLink);
    }

    async getItemsFromCart(menuCartElem) {
        const itemsElem = await menuCartElem.$('//span[@class="cartcontents"]');
        await expect(itemsElem).toBeDisplayed();
        return itemsElem;
    }

    async getAmountFromCart(menuCartElem) {
        const amountElem = await menuCartElem.$('//span[@class="amount"]');
        await expect(amountElem).toBeDisplayed();
        return amountElem;
    }
}

module.exports = new HomePage();
