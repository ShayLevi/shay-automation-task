import { test, expect } from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import {MediaLibraryPage} from "../pom/mediaLibraryPage";
import {UploadWidgetFrame} from "../pom/uploadWidgetFrame";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import {AssetManagePage} from "../pom/assetManagePage";
// @ts-ignore
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

//Generating unique public ID
const uniquePublicId = `ha-${uuidv4()}`;
test('Shay Automation home assignment', async ({ page }) => {
    await test.step('Login to Cloudinary', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
        const cloudinaryLogo = page.locator("//*[@data-testid='cloudlogo']");
        // Wait for Cloudinary logo to be displayed, so we know the login succeeded
        await cloudinaryLogo.waitFor();
    });
    await test.step('Open Media Library assets tab', async () => {
        const mlPage = new MediaLibraryPage(page);
        await mlPage.goToMLHomePage();
        await mlPage.assetsTab.click();
        await expect(page).toHaveURL(/.*media_library/);
    });
    await test.step('Click on Upload button to open upload widget', async () => {
        const mlPage = new MediaLibraryPage(page);
        await mlPage.uploadButton.click();
        const uploadWidgetIframe = page.locator("//iframe[@data-test='uw-iframe']");
        // Wait for upload widget to open
        await uploadWidgetIframe.waitFor();
    });
    await test.step('Click on Advance and insert public ID', async () => {
        const uwFrame = new UploadWidgetFrame(page);
        await uwFrame.advanceButton.click();
        await uwFrame.publicId.fill(uniquePublicId);
        await uwFrame.advanceButton.click(); // click again on Advance to close it.
    });
    await test.step('Upload any image from my PC ', async () => {
        const uwFrame = new UploadWidgetFrame(page);
        const filePath = path.resolve('/Users/shaylevi/Downloads/image_upload.jpg');
        await uwFrame.uploadLocalFile(filePath);
        await uwFrame.uploadStatusCompleted.waitFor();
    });
    await test.step('Right click on the uploaded image and open manage page', async () => {
        const mlAssetPage = new MediaLibraryPage(page);
        const uploadedAsset = page.locator(`//*[@data-test-specifier='${uniquePublicId}']`);
        await uploadedAsset.waitFor();
        await uploadedAsset.click({button: "right", force: true});
        await mlAssetPage.assetActionManageButton.click();
    });
    await test.step('Verify, that Public ID that was filled previously appears correctly', async () => {
        const assetManagePage = new AssetManagePage(page);
        const assetManagePublicId = await assetManagePage.assetTitle.innerText();
        expect(assetManagePublicId).toBe(uniquePublicId);
    });
});