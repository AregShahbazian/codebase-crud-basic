import React from "react";
import AuthorTable from "../containers/AuthorTable";
import AuthorEditor from "../containers/AuthorEditor";
import AllActionsTest from "../components/AllActionsTest";

const App = () => (
    <div>
        <AuthorTable/>
        <AuthorEditor/>
        <AllActionsTest/>
    </div>
)

export default App
