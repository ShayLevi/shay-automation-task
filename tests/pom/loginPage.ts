import {Locator, Page} from '@playwright/test';

const EMAIL_FIELD_SELECTOR = "//*[@id='user_session_email']";
const PASSWORD_FIELD_SELECTOR = "//*[@id='user_session_password']";
const LOGIN_BUTTON_SELECTOR = "//*[@id='sign-in']";


/**
 * Login page object
 */
export class LoginPage {
    public page: Page;
    public emailInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator(EMAIL_FIELD_SELECTOR);
        this.passwordInput = page.locator(PASSWORD_FIELD_SELECTOR);
        this.loginButton = page.locator(LOGIN_BUTTON_SELECTOR);
    }

    /**
     * Make login
     */
    public async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async goto(): Promise<void> {
        await this.page.goto('https://console-staging.cloudinary.com/users/login');
    }
}