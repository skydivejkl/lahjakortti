import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";

import Main from "./Main";

const store = createStore(state => {
    return state;
});

const container = document.getElementById("app");

const App = () =>
    <Provider store={store}>
        <Main />
    </Provider>;

ReactDOM.render(<App />, container);
