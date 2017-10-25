import React from 'react'
import AuthorFilter from './AuthorFilter'
import ResultsAuthorTable from '../containers/ResultsAuthorTable'
import AuthorEditor from '../containers/AuthorEditor'
import AllActionsTest from '../components/AllActionsTest'

const App = () => (
    <div>
        <AuthorFilter/>
        <ResultsAuthorTable/>
        <AuthorEditor/>
        <AllActionsTest/>
    </div>
)

export default App
