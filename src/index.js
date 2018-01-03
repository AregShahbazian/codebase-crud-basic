import "regenerator-runtime/runtime";
import "./config";
import React from "react";
import {render} from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";

import App from "./components/App";
import reducer from "./reducers/domain";
import rootSaga from "./sagas/domain";

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


render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
