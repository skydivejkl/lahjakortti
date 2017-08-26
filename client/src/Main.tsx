import React from "react";
import glamorous from "glamorous";
import {css} from "glamor";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {View} from "./core";
import {parseQS} from "./utils";
import TandemGift from "./TandemGift";
import RenderButton from "./RenderButton";
import Email from "./Email";

css.global("html,body", {
    padding: 0,
    margin: 0,
});

const parseGiftQS = (search: string) => {
    const ob = parseQS(search);

    return {
        name: ob.name || "",
        id: ob.id || "",
        email: ob.email || "",
        pdf: Boolean(ob.pdf),
    };
};

const parseEmailQS = (search: string) => {
    const ob = parseQS(search);

    return {
        id: ob.id || "",
        secret: ob.secret || "",
    };
};

const Sep = glamorous.div({height: 50, width: 50});

const Main = () =>
    <Router>
        <Switch>
            <Route
                path="/tandem"
                exact
                render={props => {
                    const ob = parseGiftQS(props.location.search);
                    return (
                        <View>
                            {!ob.pdf && <RenderButton />}
                            {ob.pdf && <Sep />}
                            <TandemGift {...ob} date={new Date()} />
                        </View>
                    );
                }}
            />
            <Route
                path="/email"
                exact
                render={props =>
                    <Email {...parseEmailQS(props.location.search)} />}
            />
        </Switch>
    </Router>;

export default Main;
