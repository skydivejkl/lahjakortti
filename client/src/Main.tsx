import React from "react";
import qs from "qs";
import glamorous from "glamorous";
import {css} from "glamor";
import {BrowserRouter as Router, Route} from "react-router-dom";

import {View} from "./core";
import TandemGift from "./TandemGift";

css.global("html,body", {
    padding: 0,
    margin: 0,
});

const MainContainer = glamorous(View)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
});

interface IGiftProps {
    name: string;
    id: string;
    email: string;
}

const parseQS = (search: string): IGiftProps => {
    const ob: {
        [key: string]: string | undefined;
    } = qs.parse(search.slice(1));
    return {
        name: ob.name || "",
        id: ob.id || "",
        email: ob.email || "",
    };
};

const Button = glamorous.button({
    padding: 20,
    margin: 40,
});

const Main = () =>
    <Router>
        <Route
            path="/tandem"
            exact
            render={props =>
                <MainContainer>
                    <Button>render pdf</Button>
                    <TandemGift
                        {...parseQS(props.location.search)}
                        date={new Date()}
                    />
                </MainContainer>}
        />
    </Router>;

export default Main;
