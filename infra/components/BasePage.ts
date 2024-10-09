import { Page } from '@playwright/test';

/**
 * base page interface
 */
export interface IBasePage {
    page: Page;
    url: string;
}

/**
 * Base Page represent an application page
 * Such as login page, setting page etc.
 */
export class BasePage {
    protected _props: IBasePage;

    constructor(topPageProps: IBasePage) {
        this._props = { page: topPageProps.page, url: topPageProps.url };
    }
    get props(): IBasePage {
        return this._props;
    }
    /**
     * Navigate to the page's URL
     */
    public async goto() {
        await this._props.page.goto(this._props.url);
    }
}
