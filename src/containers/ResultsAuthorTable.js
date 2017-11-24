import {connect} from "react-redux";
import AuthorTable from "../components/AuthorTable";

const getFilteredAuthors = (authors, filterFormValues) => {
    const {nameFilter = "", numberOfBooksFilter = 0} = filterFormValues

    return authors === undefined ? [] :
        Object.values(authors.entities.data).filter(a =>
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
