import {Locator, Page} from '@playwright/test';

const ASSETS_TAB_SELECTOR = "//*[@data-test='tab-mediaLibraryAssets']";
const UPLOAD_BUTTON_SELECTOR = "//*[@data-test='upload-btn']";
const ASSET_ACTION_MANAGE_BUTTON_SELECTOR = "//*[@data-test='action-manage-btn']";




/**
 * Media Library object
 */
export class MediaLibraryPage {
    public page: Page;
    public assetsTab: Locator;
    public uploadButton: Locator;
    public assetActionManageButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.assetsTab = page.locator(ASSETS_TAB_SELECTOR);
        this.uploadButton = page.locator(UPLOAD_BUTTON_SELECTOR);
        this.assetActionManageButton = page.locator(ASSET_ACTION_MANAGE_BUTTON_SELECTOR);
    }

    public async goToMLHomePage() : Promise<void> {
        await this.page.goto('https://console-staging.cloudinary.com/console/media_library/homepage');
    }

}