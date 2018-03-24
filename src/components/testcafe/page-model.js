import {Selector} from "testcafe";

class AuthorRow {
    constructor(parent, id) {
        this.tr = parent.find("tr#" + id).nth(0);
        this.tdName = this.tr.find("td.author-name")
        this.tdDateOfBirth = this.tr.find("td.author-dateOfBirth")
        this.editButton = this.tr.find("button.edit-button")
        this.deleteButton = this.tr.find("button.delete-button")
    }
}

class AuthorForm {
    constructor() {
        this.form = Selector("#author-form")
        this.nameInput = this.form.find("input[name=name")
        this.dateOfBirthInput = this.form.find("input[name=dateOfBirth")
        this.saveButton = this.form.find("button#save-button")
    }
}

export default class Page {
    constructor() {
        this.authorTable = Selector("#author-table");
        this.authorForm = new AuthorForm()
        this.allAuthorRows = this.authorTable.find("tr")
        this.createButton = Selector("#create-button")
    }

    authorRowById(id) {
        return new AuthorRow(this.authorTable, id)
    }
}