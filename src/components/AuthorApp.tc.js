import {Selector} from 'testcafe'

fixture `Getting Started`
    .page `localhost:8080`;

test('My first test', async t => {
    await t
        .maximizeWindow()
        .debug()
});