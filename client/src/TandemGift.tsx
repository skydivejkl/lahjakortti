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
    width: 400,
});

const CardContainer = glamorous(View)({
    border: "5px solid black",
    width: 1123 / 2,
    height: 746 / 2,
    overflow: "hidden",
    backgroundColor: "white",

    alignItems: "center",
});

const Title = glamorous(View)({
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
});

const Background = glamorous(View)({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundImage: "url(assets/tandem.jpg)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
});

const Text = glamorous(View)({
    fontSize: 18,
    justifyContent: "center",
    marginTop: 3,
    marginBottom: 3,
});

const TextSmall = glamorous(Text)({
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

interface ITandemGift {
    name: string;
    id: string;
    date: Date;
}

const Container = glamorous(View)({
    alignItems: "center",
});

const TandemGift = (props: ITandemGift) =>
    <Container>
        <CardContainer>
            <Background />
            <Logo />
            <TextContainer>
                <Title>LAHJAKORTTI</Title>
                <Line />
                <Text>Tämän lahjakortin saaja</Text>
                <Title>
                    {props.name}
                </Title>
                <Text>on oikeutettu tandemhyppykurssiin</Text>
                <TextSmall>(sisältää koulutuksen ja tandemhypyn)</TextSmall>

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
                        saakka — ilmoittautuminen kurssille
                        www.skydivejkl.fi/tandem, tiedustelut 045 323 4200{" "}
                    </FooterText>
                </div>
            </Footer>
        </CardContainer>
    </Container>;

export default TandemGift;
