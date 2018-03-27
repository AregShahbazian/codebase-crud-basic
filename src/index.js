import "regenerator-runtime/runtime";
import "./config/index";
import React from "react";
import {render} from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";

import config from "react-global-configuration";
import routines from "./actions/domain";
import crudAppContainerGenerator from "./containers/crudAppContainerGenerator";
import reducer from "./reducers/domain";
import rootSaga from "./sagas/domain";
import AuthorApp from "./components/AuthorApp";

// import Globalize from 'globalize'
// import globalizeLocalizer from 'react-widgets-globalize'
// import 'react-widgets/dist/css/react-widgets.css'

// Globalize.locale('en')
// globalizeLocalizer()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)



const AUTHOR_ENTITY_NAME = "author"
const AUTHOR_ROUTINE_NAME = config.get("entities")[AUTHOR_ENTITY_NAME].routineName
const AuthorAppContainer = crudAppContainerGenerator(routines[AUTHOR_ROUTINE_NAME], AUTHOR_ENTITY_NAME)

render(
    <Provider store={store}>
        <AuthorAppContainer
            crudAppGenerator={
                (crudAppProps) =>
                    <AuthorApp {...crudAppProps}/>}
        />
    </Provider>,
    document.getElementById('root')
)
