import React from "react";

import BaseGift, {IBaseGift, Text, Title, TextSmall} from "./BaseGift";

const TandemGift = (props: IBaseGift) =>
    <BaseGift
        {...props}
        footerText="ilmoittautuminen kurssille www.skydivejkl.fi/tandem, tiedustelut 045 323 4200"
    >
        <Text>Tämän lahjakortin saaja</Text>
        <Title>
            {props.name}
        </Title>
        <Text>on oikeutettu tandemhyppykurssiin</Text>
        <TextSmall>(sisältää koulutuksen ja tandemhypyn)</TextSmall>
    </BaseGift>;

export default TandemGift;
