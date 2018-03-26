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
const AUTHOR_NAME_2_EDIT = "Sir Author 2"
const AUTHOR_NAME_3 = "Author 3"

const AUTHOR_DOB_1 = "01-01-1991"
const AUTHOR_DOB_2 = "02-02-1992"
const AUTHOR_DOB_3 = "03-03-1993"

const AUTHOR_NAME_ERROR = "Name is required"
const AUTHOR_DOB_ERROR = "Date of birth is required"

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


test("Test adding new row", async t => {
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
});

test("Test editing a row", async t => {
    await t
    // click edit row 2 button
        .click(authorRow2.editButton)
        // assert edit form filled with author 2 data
        .expect(page.authorForm.nameInput.value).eql(AUTHOR_NAME_2)
        .expect(page.authorForm.dateOfBirthInput.value).eql(AUTHOR_DOB_2)
        // fill author 2 edited data
        .typeText(page.authorForm.nameInput, AUTHOR_NAME_2_EDIT, {replace: true})
        // click save
        .click(page.authorForm.saveButton)
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

test("Test form validation", async t => {
    await t
    // assert no validation errors
        .expect(page.authorForm.nameError.exists).notOk()
        .expect(page.authorForm.dateOfBirthError.exists).notOk()
        // assert save button disabled
        .expect(page.authorForm.saveButton.hasAttribute('disabled')).ok()
        // click on name and dateOfBirth inputs without typing
        .click(page.authorForm.nameInput)
        .click(page.authorForm.dateOfBirthInput)
        // click on form body
        .click(page.authorForm.form)
        // assert validation errors for empty name and dateOfBirth
        .expect(page.authorForm.nameError.innerText).eql(AUTHOR_NAME_ERROR)
        .expect(page.authorForm.dateOfBirthError.innerText).eql(AUTHOR_DOB_ERROR)
        // assert save button disabled
        .expect(page.authorForm.saveButton.hasAttribute('disabled')).ok()
        // type value in name input
        .typeText(page.authorForm.nameInput, AUTHOR_NAME_3)
        // assert no validation error for name
        .expect(page.authorForm.nameError.exists).notOk()
        // assert validation error for empty dateOfBirth
        .expect(page.authorForm.dateOfBirthError.innerText).eql(AUTHOR_DOB_ERROR)
        // assert save button enabled
        .expect(page.authorForm.saveButton.hasAttribute('disabled')).notOk()
        // type value in dateOfBirth input
        .typeText(page.authorForm.dateOfBirthInput, AUTHOR_DOB_3)
        // assert no validation errors
        .expect(page.authorForm.nameError.exists).notOk()
        .expect(page.authorForm.dateOfBirthError.exists).notOk()
});

















