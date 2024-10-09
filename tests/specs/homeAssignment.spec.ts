import {test, expect} from '@playwright/test';
import { LoginPage } from '../pom/LoginPage';
import {MediaLibraryPage} from "../pom/mediaLibraryPage";
import {UploadWidgetFrame} from "../pom/uploadWidgetFrame";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import {AssetManagePage} from "../pom/assetManagePage";
// @ts-ignore
import dotenv from 'dotenv';
import {DeveloperDashboardPage} from "../pom/developerDashboardPage";
import {haTest} from "../fixtures/haTest";
//import { haTest as test } from '../fixtures/haTest';

// Load environment variables from .env file
dotenv.config();

//Generating unique public ID
const uniquePublicId = `ha-${uuidv4()}`;
haTest('Shay Automation home assignment', async ({ page, mlPage, devDashPage, mlAssetPage,assetManagePage, loginPage, uwFrame }) => {
    await test.step('Login to Cloudinary', async () => {
        await loginPage.login(process.env.EMAIL, process.env.PASSWORD);
        // Wait for Cloudinary logo to be displayed, so we know the login succeeded
        await devDashPage.cloudinaryLogo.waitFor();
    });
    await test.step('Open Media Library assets tab', async () => {
        await mlPage.goto();
        await mlPage.assetsTab.click();
        await expect(page).toHaveURL(/.*media_library/);
    });
    await test.step('Click on Upload button to open upload widget', async () => {
        await mlPage.uploadButton.click();
        // Wait for upload widget to open
        await uwFrame.uploadWidgetIframe.waitFor();
    });
    await test.step('Click on Advance and insert public ID', async () => {
        await uwFrame.advanceButton.click();
        await uwFrame.publicId.fill(uniquePublicId);
        await uwFrame.advanceButton.click(); // click again on Advance to close it.
    });
    await test.step('Upload any image from my PC ', async () => {
        //Change it to asset from your local PC
        const filePath = path.resolve('/Users/shaylevi/Downloads/image_upload.jpg');
        await uwFrame.uploadLocalFile(filePath);
        await uwFrame.uploadStatusCompleted.waitFor();
    });
    await test.step('Right click on the uploaded image and open manage page', async () => {
        //find the uploaded image selector based on the unique public ID
        const uploadedAsset = await mlAssetPage.findUploadAssetLocator(page, uniquePublicId);
        await uploadedAsset.waitFor();
        await uploadedAsset.click({button: "right", force: true});
        await mlAssetPage.assetActionManageButton.click();
    });
    await test.step('Verify, that Public ID that was filled previously appears correctly', async () => {
        const assetManagePublicId = await assetManagePage.assetTitle.innerText();
        expect(assetManagePublicId).toBe(uniquePublicId);
    });
});