import {Locator, Page} from '@playwright/test';
import {BasePage} from "../../infra/components/BasePage";

const ASSET_TITLE_SELECTOR = "//*[@data-test='manage-top-bar']//*[@data-test='asset-title']";


/**
 * Asset manage page object
 */
export class AssetManagePage extends BasePage{
    public readonly assetTitle: Locator

    constructor(page: Page) {
        super({page, url: ''});
        this.assetTitle = page.locator(ASSET_TITLE_SELECTOR);
    }
}