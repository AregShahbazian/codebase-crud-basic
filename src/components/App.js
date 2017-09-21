import React from 'react'
import AuthorFilter from './AuthorFilter'
import AuthorEditor from './AuthorEditor'
import ResultsAuthorTable from '../containers/ResultsAuthorTable'
import ReduxFormExample from './ReduxFormExample'
import ReduxFormReactWidgetsExample from './ReduxFormReactWidgetsExample'

const App = () => (
    <div>
        <AuthorFilter/>
        <ResultsAuthorTable/>
        <AuthorEditor/>
        <ReduxFormExample/>
        <ReduxFormReactWidgetsExample/>
    </div>
)

export default App
