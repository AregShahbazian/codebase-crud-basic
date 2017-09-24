import {connect} from 'react-redux'
import AuthorTable from '../components/AuthorTable'

const getFilteredAuthors = (authors, filterFormValues) => {
    console.log(filterFormValues)
    const {nameFilter = "", numberOfBooksFilte = ""} = filterFormValues === undefined ? {} : filterFormValues

    return authors.filter(a =>
            a.name.match(new RegExp(nameFilter, 'i'))
        // && a.numberOfBooks >= filterFormValues.numberOfBooksFilter
    )
}


const mapStateToProps = (state) => ({
    authors: getFilteredAuthors(state.authorsData.present, state.form.filterForm.values)
})


const ResultsAuthorTable = connect(
    mapStateToProps
)(AuthorTable)

export default ResultsAuthorTable
