import {Selector} from "testcafe";

class AuthorRow {
    constructor(parent, id) {
        this.tr = parent.find("tr#" + id).nth(0);
        this.tdName = this.tr.find("td.author-name")
        this.tdDateOfBirth = this.tr.find("td.author-dateOfBirth")
        this.updateButton = this.tr.find("button.update-button")
        this.deleteButton = this.tr.find("button.delete-button")
    }
}

class AuthorCreateForm {
    constructor() {
        this.form = Selector("#author-create-form")
        this.nameInput = this.form.find("input[name=name")
        this.dateOfBirthInput = this.form.find("input[name=dateOfBirth")
        this.nameError = this.form.find("span#name-error")
        this.dateOfBirthError = this.form.find("span#dateOfBirth-error")
        this.saveButton = this.form.find("button#author-create-save-button")
    }
}

class AuthorUpdateForm {
    constructor() {
        this.form = Selector("#author-update-form")
        this.nameInput = this.form.find("input[name=name")
        this.dateOfBirthInput = this.form.find("input[name=dateOfBirth")
        this.nameError = this.form.find("span#name-error")
        this.dateOfBirthError = this.form.find("span#dateOfBirth-error")
        this.saveButton = this.form.find("button#author-update-save-button")
    }
}

export default class Page {
    constructor() {
        this.authorTable = Selector("#author-table");
        this.authorUpdateForm = new AuthorUpdateForm()
        this.authorCreateForm = new AuthorCreateForm()
        this.allAuthorRows = this.authorTable.find("tr")
        this.createButton = Selector("#create-button")
    }

    authorRowById(id) {
        return new AuthorRow(this.authorTable, id)
    }
}