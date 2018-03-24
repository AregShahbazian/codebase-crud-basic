import {Selector} from "testcafe"
import Page from "./page-model"
import consoleCheck from "./console-check"

fixture `Author CRUD page`
    .page `localhost:8080`
// assert no errors in console
    .afterEach(() => consoleCheck());

const page = new Page()

const AUTHOR_ID_1 = "author-row-1"
const AUTHOR_ID_2 = "author-row-2"
const AUTHOR_ID_3 = "author-row-3"

const AUTHOR_NAME_1 = "Author 1"
const AUTHOR_NAME_2 = "Author 2"
const AUTHOR_NAME_3 = "Author 3"
const AUTHOR_NAME_3_EDIT = "Sir Author 3"

const AUTHOR_DOB_1 = "01-01-1991"
const AUTHOR_DOB_2 = "02-02-1992"
const AUTHOR_DOB_3 = "03-03-1993"

const authorRow1 = page.authorRowById(AUTHOR_ID_1)
const authorRow2 = page.authorRowById(AUTHOR_ID_2)
const authorRow3 = page.authorRowById(AUTHOR_ID_3)

test("Test initial page render", async t => {
    await t
    // assert 2 author rows are rendered
        .expect(page.allAuthorRows.count).eql(2)
        // assert author 1 and 2 data in table rows
        .expect(authorRow1.tdName.innerText).eql(AUTHOR_NAME_1)
        .expect(authorRow1.tdDateOfBirth.innerText).eql(AUTHOR_DOB_1)
        .expect(authorRow2.tdName.innerText).eql(AUTHOR_NAME_2)
        .expect(authorRow2.tdDateOfBirth.innerText).eql(AUTHOR_DOB_2)
});

test("Edit and new button, and form populating/clearing", async t => {
    await t
    // click edit 2 button
        .click(authorRow2.editButton)
        // assert row 2 in edit form
        .expect(page.authorForm.nameInput.value).eql(AUTHOR_NAME_2)
        .expect(page.authorForm.dateOfBirthInput.value).eql(AUTHOR_DOB_2)
        // click create new button
        .click(page.createButton)
        // assert edit form empty
        .expect(page.authorForm.nameInput.value).eql("")
        .expect(page.authorForm.dateOfBirthInput.value).eql("")
});


test("Test adding new row, editing it and deleting it", async t => {
    await t
    // click create new button
        .click(page.createButton)
        // fill author 3 data
        .typeText(page.authorForm.nameInput, AUTHOR_NAME_3)
        .typeText(page.authorForm.dateOfBirthInput, AUTHOR_DOB_3)
        // click Save button
        .click(page.authorForm.saveButton)
        // assert edit form empty
        .expect(page.authorForm.nameInput.value).eql("")
        .expect(page.authorForm.dateOfBirthInput.value).eql("")
        // assert 3rd row created with author 3 data
        .expect(authorRow3.tdName.innerText).eql(AUTHOR_NAME_3)
        .expect(authorRow3.tdDateOfBirth.innerText).eql(AUTHOR_DOB_3)
        // click edit row 3 button
        .click(authorRow3.editButton)
        // assert edit form filled with author 3 data
        .expect(page.authorForm.nameInput.value).eql(AUTHOR_NAME_3)
        .expect(page.authorForm.dateOfBirthInput.value).eql(AUTHOR_DOB_3)
        // fill author 3 edited data
        .typeText(page.authorForm.nameInput, AUTHOR_NAME_3_EDIT, {replace: true})
        // click save
        .click(page.authorForm.saveButton)
        // assert row 3 edited
        .expect(authorRow3.tdName.innerText).eql(AUTHOR_NAME_3_EDIT)
        .expect(authorRow3.tdDateOfBirth.innerText).eql(AUTHOR_DOB_3)
// click delete row 3 button
// assert 2 author rows are left
// assert author 1 and 2 data


});

















