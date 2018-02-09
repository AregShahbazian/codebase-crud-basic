import {concat, forEach} from "lodash";
import {connect} from "react-redux";
import AuthorTable from "../components/AuthorTable";

const getFilteredAuthors = (authors, filterFormValues) => {
    let {nameFilter = ""} = filterFormValues
    let cachedAuthors = []

    forEach(authors.result, (id) => (cachedAuthors = concat(cachedAuthors, authors.entities.author[id])))

    return Object.values(cachedAuthors).filter(a =>
        a.name.match(new RegExp(nameFilter, 'i'))
    )
}


const mapStateToProps = (state) => ({
    authors: getFilteredAuthors(state.author, state.form.filterForm.values === undefined ? {} : state.form.filterForm.values)
})


const ResultsAuthorTable = connect(
    mapStateToProps
)(AuthorTable)

export default ResultsAuthorTable
