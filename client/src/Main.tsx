import React from "react";
import glamorous from "glamorous";
import {css} from "glamor";

css.global("html,body", {
    padding: 0,
    margin: 0,
});

const View = glamorous.div({
    display: "flex",
    position: "relative",
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

const Logo = glamorous(View)({
    position: "absolute",
    top: 10,
    left: "50%",
    transform: "translateX(-50%)",

    backgroundImage: "url(assets/skydivejkl_logo.svg)",
    backgroundSize: "contain",
    width: 300,
    height: 200,
    backgroundRepeat: "no-repeat",
    backgroundColor: "blue",
});

const CardContainer = glamorous(View)({
    border: "5px solid black",
    width: 1205 / 2,
    height: 865 / 2,

    backgroundImage: "url(assets/tandem.png)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
});

const Main = () =>
    <MainContainer>
        <CardContainer>
            <Logo />
        </CardContainer>
    </MainContainer>;

export default Main;
