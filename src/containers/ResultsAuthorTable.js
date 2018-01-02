import {concat, forEach} from "lodash";
import {connect} from "react-redux";
import AuthorTable from "../components/AuthorTable";

const getFilteredAuthors = (authors, filterFormValues) => {
    let {nameFilter = "", numberOfBooksFilter = 0} = filterFormValues
    let cachedAuthors = []

    forEach(authors.result, (id) => (cachedAuthors = concat(cachedAuthors, authors.entities.authors[id])))

    return Object.values(cachedAuthors).filter(a =>
        a.name.match(new RegExp(nameFilter, 'i'))
        && a.numberOfBooks >= numberOfBooksFilter
    )
}


const mapStateToProps = (state) => ({
    authors: getFilteredAuthors(state.author.present, state.form.filterForm.values === undefined ? {} : state.form.filterForm.values)
})


const ResultsAuthorTable = connect(
    mapStateToProps
)(AuthorTable)

export default ResultsAuthorTable
