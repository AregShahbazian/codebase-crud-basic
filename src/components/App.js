import React from "react";
import AuthorTableContainer from "../containers/AuthorTableContainer";
import AuthorEditorContainer from "../containers/AuthorEditorContainer";
import AllActionsTest from "../components/AllActionsTest";

const App = () => (
    <div>
        <AuthorTableContainer/>
        <AuthorEditorContainer/>
        <AllActionsTest/>
    </div>
)

export default App
