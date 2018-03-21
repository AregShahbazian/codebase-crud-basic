import React from "react";
import AuthorTable from "../containers/AuthorTable";
import AuthorEditorContainer from "../containers/AuthorEditorContainer";
import AllActionsTest from "../components/AllActionsTest";

const App = () => (
    <div>
        <AuthorTable/>
        <AuthorEditorContainer/>
        <AllActionsTest/>
    </div>
)

export default App
