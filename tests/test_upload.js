import {t, Selector} from 'testcafe';

fixture('User actions test suite')
.page('https://qa-practice.netlify.app');


test('file upload test', async t =>{
    await t.click(Selector('#file-upload-item'));

    await t
        .setFilesToUpload('#file_upload', [
            '../files/file.txt'
        ]);

    await t.click(Selector('button[type="submit"]'));
    
    await t.expect(Selector('#file_upload_response').withText('You have successfully uploaded "file.txt"').exists).ok();
});
