import {Locator, Page} from '@playwright/test';

const ASSET_TITLE_SELECTOR = "//*[@data-test='manage-top-bar']//*[@data-test='asset-title']";;


/**
 * Asset manage page object
 */
export class AssetManagePage {
    public page: Page;
    public assetTitle: Locator

    constructor(page: Page) {
        this.page = page;
        this.assetTitle = page.locator(ASSET_TITLE_SELECTOR);
    }
}