import React from "react";
import glamorous from "glamorous";
import {css} from "glamor";

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

    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
});

const Main = () =>
    <MainContainer>
        <TandemGift name="Esa-Matti Suuronen" id={1234} date={new Date()} />
    </MainContainer>;

export default Main;
