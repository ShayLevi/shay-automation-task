import {Locator, Page} from '@playwright/test';
import {BasePage} from "../../infra/components/BasePage";

const EMAIL_FIELD_SELECTOR = "//*[@id='user_session_email']";
const PASSWORD_FIELD_SELECTOR = "//*[@id='user_session_password']";
const LOGIN_BUTTON_SELECTOR = "//*[@id='sign-in']";


/**
 * Login page object
 */
export class LoginPage extends BasePage{
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;


    constructor(page: Page) {
        super({page, url: 'https://console-staging.cloudinary.com/users/login'});
        this.emailInput = page.locator(EMAIL_FIELD_SELECTOR);
        this.passwordInput = page.locator(PASSWORD_FIELD_SELECTOR);
        this.loginButton = page.locator(LOGIN_BUTTON_SELECTOR);
    }

    /**
     * Make login
     */
    public async login(email: string, password: string) {
        await this.goto();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}