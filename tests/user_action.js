import {t, Selector} from 'testcafe';
import { faker } from '@faker-js/faker';
import LoginModel from "../page_models/LoginModel";

fixture('User actions test suite')
.page('https://qa-practice.netlify.app')
.beforeEach(async t =>  {
  await t.click(Selector('#forms'));
})

test('Register test', async t => {
    // await t.click(Selector('#forms'));
    await t.click(Selector('a[href="register.html"]'))
            .typeText(Selector('#emailAddress'), faker.internet.email('Jeanne', 'Doe', 'example.fakerjs.dev'))
            .typeText(Selector('#password'), '123456', {parse: true, replace: true})
            .click(Selector('#exampleCheck1'));

    // await t.click(Selector('#countries_dropdown_menu'));
    // await t.click(Selector('option').withText('Romania'));
    await selectCountry('Romania');

    await t.click(Selector('#registerBtn'));

    await t.expect(Selector('#message').withText('The account has been successfully created!').exists).ok();
});

test('Login test - valid creds', async t =>{
    // await t.click(Selector('#forms'));
    await t.click(Selector('#login'));
    await t.typeText(LoginModel.email, 'admin@admin.com');
    await t.typeText(LoginModel.password, 'admin123');
    await t.click(LoginModel.submitLoginBtn);
    await t.expect(Selector('#message').withText('admin@admin.com, you have successfully logged in!').exists).ok();
});

test('Login test - invalid creds', async t =>{
  // await t.click(Selector('#forms'));
  await t.click(Selector('#login'));
  await t.typeText(LoginModel.email, 'admin2@admin.com');
  await t.typeText(LoginModel.password, 'admin123');
  await t.click(LoginModel.submitLoginBtn);
  await t.expect(LoginModel.loginResultMessage.withText("admin2@admin.com, Bad credentials! Please try again! Make sure that you've registered.").exists).ok();
});

test('File upload test suit', async t =>{
    await t.click(Selector('#file-upload-item'));

    await t
        .setFilesToUpload('#file_upload', [
            '../files/file.txt'
        ]);

    await t.click(Selector('button[type="submit"]'));
    
    await t.expect(Selector('#file_upload_response').withText('You have successfully uploaded "file.txt"').exists).ok();
});

async function selectCountry(country) {
  await t.click(Selector('#countries_dropdown_menu'));
  await t.click(Selector('option').withText(country));

}