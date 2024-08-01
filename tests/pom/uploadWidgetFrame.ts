import {FrameLocator, Locator, Page} from '@playwright/test';

const UPLOAD_WIDGET_IFRAME_LOCATOR = "//iframe[@data-test='uw-iframe']";
const ADVANCED_BUTTON_SELECTOR = "//*[@data-test='btn-advanced' and @type='button']";
const PUBLIC_ID_INPUT_SELECTOR = "//*[@data-test='public-id']";
const UPLOAD_INPUT_SELECTOR = "//input[@name='file']";
const UPLOAD_STATUS_COMPLETED_SELECTOR = "//*[@data-test='show-completed-button']";


/**
 * Upload widget iFrame object
 */
export class UploadWidgetFrame {
    public page: Page;
    public uploadWidgetIframe: FrameLocator;
    public advanceButton: Locator;
    public publicId: Locator;
    public fileInput: Locator;
    public uploadStatusCompleted: Locator;


    constructor(page: Page) {
        this.page = page;
        this.uploadWidgetIframe = page.frameLocator(UPLOAD_WIDGET_IFRAME_LOCATOR);
        this.advanceButton = page.frameLocator(UPLOAD_WIDGET_IFRAME_LOCATOR).locator(ADVANCED_BUTTON_SELECTOR);
        this.publicId = page.frameLocator(UPLOAD_WIDGET_IFRAME_LOCATOR).locator(PUBLIC_ID_INPUT_SELECTOR);
        this.fileInput = page.frameLocator(UPLOAD_WIDGET_IFRAME_LOCATOR).locator(UPLOAD_INPUT_SELECTOR);
        this.uploadStatusCompleted = page.frameLocator(UPLOAD_WIDGET_IFRAME_LOCATOR).locator(UPLOAD_STATUS_COMPLETED_SELECTOR);
    }
    public async uploadLocalFile(filePath: string) {
        // Wait for the file input to be visible before setting the file
        await this.fileInput.waitFor({ state: 'visible' });
        await this.fileInput.setInputFiles(filePath);
    }
}