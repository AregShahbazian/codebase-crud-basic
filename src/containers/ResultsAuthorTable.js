import {connect} from 'react-redux'
import AuthorTable from '../components/AuthorTable'

const getFilteredAuthors = (authors, authorsFilter) => {
    return authors.filter(a =>
        a.name.match(new RegExp(authorsFilter.nameFilter, 'i')) &&
        a.numberOfBooks >= authorsFilter.numberOfBooksFilter)
}


const mapStateToProps = (state) => ({
    authors: getFilteredAuthors(state.authorsData.present, state.authorsFilter)
})


const ResultsAuthorTable = connect(
    mapStateToProps
)(AuthorTable)

export default ResultsAuthorTable
