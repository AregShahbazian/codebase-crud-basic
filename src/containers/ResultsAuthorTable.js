import {concat, forEach} from "lodash";
import {connect} from "react-redux";
import AuthorTable from "../components/AuthorTable";

const getAuthorsFromState = (authors) => {
    let cachedAuthors = []

    forEach(authors.result, (id) => (cachedAuthors = concat(cachedAuthors, authors.entities.author[id])))

    return cachedAuthors
}


const mapStateToProps = (state) => ({
    authors: getAuthorsFromState(state.author)
})


const ResultsAuthorTable = connect(
    mapStateToProps
)(AuthorTable)

export default ResultsAuthorTable
