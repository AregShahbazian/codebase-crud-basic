import "regenerator-runtime/runtime";
import React from "react";
import {render} from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/App";
import reducer from "./reducers/domain";
import createSagaMiddleware from "redux-saga";
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
