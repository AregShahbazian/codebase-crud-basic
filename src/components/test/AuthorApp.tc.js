import Page from "./page-model"
import {consoleCheck, maximize} from "./hooks"

fixture `Author CRUD page`
    .page `localhost:8080`
// assert no errors in console
    .beforeEach((t) => {
        maximize()
    })
    .afterEach((t) => {
        consoleCheck()
    });

const page = new Page()

const AUTHOR_ID_1 = "author-row-1"
const AUTHOR_ID_2 = "author-row-2"
const AUTHOR_ID_3 = "author-row-3"

const AUTHOR_NAME_1 = "Author 1"
const AUTHOR_NAME_2 = "Author 2"
const AUTHOR_NAME_2_EDIT = "Sir Author 2"
const AUTHOR_NAME_3 = "Author 3"

const AUTHOR_DOB_1 = "01-01-1991"
const AUTHOR_DOB_2 = "02-02-1992"
const AUTHOR_DOB_3 = "03-03-1993"

const AUTHOR_NAME_ERROR = "Name is required"
const AUTHOR_DOB_ERROR = "Date of birth is required"

const AUTHOR_CORRECT_FILTER_NAME = "2"
const AUTHOR_CORRECT_FILTER_DOB = "1992"
const AUTHOR_WRONG_FILTER_NAME = "foo"
const AUTHOR_WRONG_FILTER_DOB = "bar"

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

test("Test adding new row", async t => {
    await t
    // click create new button
        .click(page.createButton)
        // fill author 3 data
        .typeText(page.authorCreateForm.nameInput, AUTHOR_NAME_3)
        .typeText(page.authorCreateForm.dateOfBirthInput, AUTHOR_DOB_3)
        // click Save button
        .click(page.authorCreateForm.saveButton)
        // assert edit form empty
        .expect(page.authorCreateForm.nameInput.value).eql("")
        .expect(page.authorCreateForm.dateOfBirthInput.value).eql("")
        // assert 3rd row created with author 3 data
        .expect(authorRow3.tdName.innerText).eql(AUTHOR_NAME_3)
        .expect(authorRow3.tdDateOfBirth.innerText).eql(AUTHOR_DOB_3)
});

test("Test editing a row", async t => {
    await t
    // click edit row 2 button
        .click(authorRow2.updateButton)
        // assert edit form filled with author 2 data
        .expect(page.authorUpdateForm.nameInput.value).eql(AUTHOR_NAME_2)
        .expect(page.authorUpdateForm.dateOfBirthInput.value).eql(AUTHOR_DOB_2)
        // fill author 2 edited data
        .typeText(page.authorUpdateForm.nameInput, AUTHOR_NAME_2_EDIT, {replace: true})
        // click save
        .click(page.authorUpdateForm.saveButton)
        // assert row 2 edited
        .expect(authorRow2.tdName.innerText).eql(AUTHOR_NAME_2_EDIT)
        .expect(authorRow2.tdDateOfBirth.innerText).eql(AUTHOR_DOB_2)
});

test("Test deleting a row", async t => {
    await t
    // click delete row 2 button
        .click(authorRow2.deleteButton)
        // assert author 2 doesn't exist
        .expect(authorRow2.tr.exists).notOk()
});

test("Test form validation for adding new row", async t => {
    await t
    // click create new button
        .click(page.createButton)
        // assert no validation errors
        .expect(page.authorCreateForm.nameError.exists).notOk()
        .expect(page.authorCreateForm.dateOfBirthError.exists).notOk()
        // assert save button disabled
        .expect(page.authorCreateForm.saveButton.hasAttribute('disabled')).ok()
        // click on name input without typing
        .click(page.authorCreateForm.nameInput)
        // click on form body
        .click(page.authorCreateForm.form)
        // assert validation error for empty name
        .expect(page.authorCreateForm.nameError.innerText).eql(AUTHOR_NAME_ERROR)
        // assert save button disabled
        .expect(page.authorCreateForm.saveButton.hasAttribute('disabled')).ok()
        // type value in name input
        .typeText(page.authorCreateForm.nameInput, AUTHOR_NAME_3)
        // assert no validation error for name
        .expect(page.authorCreateForm.nameError.exists).notOk()
        // assert save button enabled
        .expect(page.authorCreateForm.saveButton.hasAttribute('disabled')).notOk()
        // click on save button
        .click(page.authorCreateForm.saveButton)
        // assert validation error for empty dateOfBirth
        .expect(page.authorCreateForm.dateOfBirthError.innerText).eql(AUTHOR_DOB_ERROR)
        // assert no new row created
        .expect(authorRow3.tr.exists).notOk()
        // type value in dateOfBirth input
        .typeText(page.authorCreateForm.dateOfBirthInput, AUTHOR_DOB_3)
        // assert no validation error for dateOfBirth
        .expect(page.authorCreateForm.dateOfBirthError.exists).notOk()
        // click on save button
        .click(page.authorCreateForm.saveButton)
        // assert new row created
        .expect(authorRow3.tr.exists).ok()
});

test("Test form validation for editing row", async t => {
    await t
    // click edit row 2 button
        .click(authorRow2.updateButton)
        // assert no validation errors
        .expect(page.authorUpdateForm.nameError.exists).notOk()
        .expect(page.authorUpdateForm.dateOfBirthError.exists).notOk()
        // assert save button enabled
        .expect(page.authorUpdateForm.saveButton.hasAttribute('disabled')).notOk()
        // click on name and dateOfBirth inputs and delete all
        .click(page.authorUpdateForm.nameInput)
        .pressKey('ctrl+a delete')
        .click(page.authorUpdateForm.dateOfBirthInput)
        .pressKey('ctrl+a delete')
        // click on form body
        .click(page.authorUpdateForm.form)
        // assert validation error for empty name and empty dateOfBirth
        .expect(page.authorUpdateForm.nameError.innerText).eql(AUTHOR_NAME_ERROR)
        .expect(page.authorUpdateForm.dateOfBirthError.innerText).eql(AUTHOR_DOB_ERROR)
        // assert save button enabled
        .expect(page.authorUpdateForm.saveButton.hasAttribute('disabled')).notOk()
        // type value in name input
        .typeText(page.authorUpdateForm.nameInput, AUTHOR_NAME_2_EDIT)
        // assert no validation error for name
        .expect(page.authorUpdateForm.nameError.exists).notOk()
        // click on save button
        .click(page.authorUpdateForm.saveButton)
        // assert validation error for empty dateOfBirth
        .expect(page.authorUpdateForm.dateOfBirthError.innerText).eql(AUTHOR_DOB_ERROR)
        // assert row 2 not updated name
        .expect(authorRow2.tdName.innerText).notEql(AUTHOR_NAME_2_EDIT)
        // type value in dateOfBirth input
        .typeText(page.authorUpdateForm.dateOfBirthInput, AUTHOR_DOB_3)
        // assert no validation error for dateOfBirth
        .expect(page.authorUpdateForm.dateOfBirthError.exists).notOk()
        // click on save button
        .click(page.authorUpdateForm.saveButton)
        // assert row 2 updated name
        .expect(authorRow2.tdName.innerText).eql(AUTHOR_NAME_2_EDIT)
});

test("Test filtering", async t => {
    await t
    // click apply button
        .click(page.authorFilterForm.saveButton)
        // assert 2 author rows are rendered
        .expect(page.allAuthorRows.count).eql(2)
        // assert author 1 and 2 data in table rows
        .expect(authorRow1.tdName.innerText).eql(AUTHOR_NAME_1)
        .expect(authorRow1.tdDateOfBirth.innerText).eql(AUTHOR_DOB_1)
        .expect(authorRow2.tdName.innerText).eql(AUTHOR_NAME_2)
        .expect(authorRow2.tdDateOfBirth.innerText).eql(AUTHOR_DOB_2)
        // type "2" in name filter
        .typeText(page.authorFilterForm.nameInput, AUTHOR_CORRECT_FILTER_NAME)
        // type "1992" in dob filter
        .typeText(page.authorFilterForm.dateOfBirthInput, AUTHOR_CORRECT_FILTER_DOB)
        // click apply button
        .click(page.authorFilterForm.saveButton)
        // assert 1 author row is rendered
        .expect(page.allAuthorRows.count).eql(1)
        // assert 2 data in table row
        .expect(authorRow2.tdName.innerText).eql(AUTHOR_NAME_2)
        .expect(authorRow2.tdDateOfBirth.innerText).eql(AUTHOR_DOB_2)
        // type "foo" in name filter
        .typeText(page.authorFilterForm.nameInput, AUTHOR_WRONG_FILTER_NAME, {replace: true})
        // type "bar" in dob filter
        .typeText(page.authorFilterForm.dateOfBirthInput, AUTHOR_WRONG_FILTER_DOB, {replace: true})
        // click apply button
        .click(page.authorFilterForm.saveButton)
        // assert NO author rows are rendered
        .expect(page.allAuthorRows.count).eql(0)
});
















