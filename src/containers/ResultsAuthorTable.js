import {connect} from 'react-redux'
import AuthorTable from '../components/AuthorTable'

const getFilteredAuthors = (authors, nameFilter) => {
    return authors.filter(a => a.name.match(new RegExp(nameFilter, 'i')));
}


const mapStateToProps = (state) => ({
    authors: getFilteredAuthors(state.authors.present, state.authorsFilter)
})


const ResultsAuthorTable = connect(
    mapStateToProps
)(AuthorTable)

export default ResultsAuthorTable
