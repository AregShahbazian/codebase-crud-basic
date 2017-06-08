import React from 'react'
import AuthorFilter from './AuthorFilter'
import AuthorEditor from './AuthorEditor'
import ResultsAuthorTable from '../containers/ResultsAuthorTable'

const App = () => (
    <div>
        <AuthorFilter/>
        <ResultsAuthorTable/>
        <AuthorEditor/>
    </div>
)

export default App
