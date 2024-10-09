import {Locator, Page} from '@playwright/test';
import {BasePage} from "../../infra/components/BasePage";

const ASSETS_TAB_SELECTOR = "//*[@data-test='tab-mediaLibraryAssets']";
const UPLOAD_BUTTON_SELECTOR = "//*[@data-test='upload-btn']";
const ASSET_ACTION_MANAGE_BUTTON_SELECTOR = "//*[@data-test='action-manage-btn']";




/**
 * Media Library object
 */
export class MediaLibraryPage extends BasePage {
    public readonly assetsTab: Locator;
    public readonly uploadButton: Locator;
    public readonly assetActionManageButton: Locator;



    constructor(page: Page) {
        super({page, url: 'https://console-staging.cloudinary.com/console/media_library/homepage'});
        this.assetsTab = page.locator(ASSETS_TAB_SELECTOR);
        this.uploadButton = page.locator(UPLOAD_BUTTON_SELECTOR);
        this.assetActionManageButton = page.locator(ASSET_ACTION_MANAGE_BUTTON_SELECTOR);
    }

    /**
     * Function which return the locator of the uploaded image based on the unique ID which is set as data-test-specifier
     */
    public async findUploadAssetLocator(page: Page, uniqueId: string): Promise<Locator> {
      const locator = page.locator(`//*[@data-test-specifier='${uniqueId}']`);
      return locator;
    }
}