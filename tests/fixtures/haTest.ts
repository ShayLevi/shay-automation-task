import { test } from '@playwright/test';
import {AssetManagePage} from "../pom/assetManagePage";
import {DeveloperDashboardPage} from "../pom/developerDashboardPage";
import {LoginPage} from "../pom/loginPage";
import {MediaLibraryPage} from "../pom/mediaLibraryPage";
import {UploadWidgetFrame} from "../pom/uploadWidgetFrame";


/**
 * Fixture parameters.
 */
type FixtureParams = {
    mlAssetPage: MediaLibraryPage;
    assetManagePage: AssetManagePage;
    devDashPage : DeveloperDashboardPage;
    loginPage: LoginPage;
    mlPage : MediaLibraryPage;
    uwFrame: UploadWidgetFrame;
};

/**
 * Extend Playwright test with custom fixtures.
 */
export const haTest = test.extend<FixtureParams>({
    /**
     * Fixture for the video player examples page object.
     */
    mlAssetPage: [
        async ({ page }, use) => {
            const mlAssetPage = new MediaLibraryPage(page);
            await use(mlAssetPage);
        },
        { auto: true },
    ],

    assetManagePage: [
        async ({ page }, use) => {
            const assetManagePage = new AssetManagePage(page);
            await use(assetManagePage);
        },
        { auto: true },
    ],

    devDashPage: [
        async ({ page }, use) => {
            const devDashPage = new DeveloperDashboardPage(page);
            await use(devDashPage);
        },
        { auto: true },
    ],

    loginPage: [
        async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            await loginPage.goto();
            await use(loginPage);
        },
        { auto: true },
    ],

    mlPage: [
        async ({ page }, use) => {
            const mlPage = new MediaLibraryPage(page);
            await mlPage.goto();
            await use(mlPage);
        },
        { auto: true },
    ],


    uwFrame: [
        async ({ page }, use) => {
            const uwFrame = new UploadWidgetFrame(page);
            await use(uwFrame);
        },
        { auto: true },
    ],
});
