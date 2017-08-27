import React from "react";
import glamorous from "glamorous";
import moment from "moment";

import {View} from "./core";

const Logo = glamorous(View)({
    position: "absolute",
    top: 10,
    left: "50%",
    transform: "translateX(-50%)",

    backgroundImage: "url(assets/skydivejkl_logo.svg)",
    backgroundSize: "contain",
    width: 200,
    height: 200,
    backgroundRepeat: "no-repeat",
});

const TextContainer = glamorous(View)({
    flexDirection: "column",
    marginTop: 130,
    textAlign: "center",
    justifyContent: "center",
});

const CardContainer = glamorous(View)({
    border: "5px solid black",
    width: 1123 / 2,
    height: 750 / 2,
    overflow: "hidden",
    backgroundColor: "white",

    alignItems: "center",
});

export const Title = glamorous(View)({
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
});

interface IBackground {
    type: "tandem" | "solo";
}

const Background = glamorous(View)<IBackground>(
    {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    },
    props => ({
        backgroundImage: `url(assets/${props.type}.jpg)`,
    }),
);

export const Text = glamorous(View)({
    fontSize: 18,
    justifyContent: "center",
    marginTop: 3,
    marginBottom: 3,
});

export const TextSmall = glamorous(Text)({
    fontSize: 15,
});

const Line = glamorous(View)({
    backgroundColor: "black",
    width: "100%",
    height: 1,
    marginTop: 5,
    marginBottom: 5,
});

const Sign = glamorous(View)({
    top: -15,
    flexDirection: "column",
    alignItems: "center",
});

const SignImage = glamorous(View)({
    backgroundImage: "url(assets/allekirjoitus.png)",
    backgroundSize: "contain",
    width: 400,
    height: 60,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    top: 10,
});

const SignLine = glamorous(Line)({
    marginTop: 0,
    marginBottom: 0,
    width: 250,
});

const FooterText = glamorous("span")<{bold?: boolean}>(
    {
        fontSize: 10,
    },
    props => ({fontWeight: props.bold ? "bold" : "normal"}),
);

const Footer = glamorous(View)({
    position: "absolute",
    bottom: 1,
});

export interface IBaseGift {
    name: string;
    id: string;
    date: Date;
    type: string;
    bg: "tandem" | "solo";
}

const Container = glamorous(View)({
    alignItems: "center",
});

const BaseGift = (props: IBaseGift & {footerText: string; children?: any}) =>
    <Container>
        <CardContainer>
            <Background type={props.bg} />
            <Logo />
            <TextContainer>
                <Title>LAHJAKORTTI</Title>
                <Line />
                {props.children}

                <Sign>
                    <SignImage />
                    <SignLine />
                    <TextSmall>Jyväskylän Laskuvarjokerho Ry</TextSmall>
                </Sign>
            </TextContainer>
            <Footer>
                <div>
                    <FooterText bold>
                        #{props.id}
                    </FooterText>
                    <FooterText>
                        , voimassa{" "}
                        {moment(props.date)
                            .add(2, "years")
                            .format("MM/YYYY")}{" "}
                        saakka — {props.footerText}
                    </FooterText>
                </div>
            </Footer>
        </CardContainer>
    </Container>;

export default BaseGift;
