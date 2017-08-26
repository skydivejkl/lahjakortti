import * as React from "react";
import * as ReactDOM from "react-dom";
import glamorous from "glamorous";
import {createStore} from "redux";
import {Provider} from "react-redux";

const store = createStore(state => {
    return state;
});

const Title = glamorous.div({fontSize: 40});

const Main = () =>
    <div>
        <Title>Hello</Title> from React 2
    </div>;

const container = document.getElementById("app");

const App = () =>
    <Provider store={store}>
        <Main />
    </Provider>;

ReactDOM.render(<App />, container);
