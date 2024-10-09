import {Locator, Page} from '@playwright/test';
import {BasePage} from "../../infra/components/BasePage";

const CLOUDINARY_LOGO_SELECTOR = "//*[@data-testid='cloudlogo']";


/**
 * Developer Dashboard page object
 */
export class DeveloperDashboardPage extends BasePage{
    public readonly cloudinaryLogo: Locator

    constructor(page: Page) {
        super({page, url: ''});
        this.cloudinaryLogo = page.locator(CLOUDINARY_LOGO_SELECTOR);
    }
}