import {t} from 'testcafe';

export async function consoleCheck() {
    const {error} = await t.getBrowserConsoleMessages();
    await t.expect(error[0]).notOk();
}

export async function maximize() {
    await t.maximizeWindow();
}