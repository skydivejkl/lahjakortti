import React from "react";

import BaseGift, { IBaseGift, Text, Title, TextSmall } from "./BaseGift";

import { ObjectOmit } from "./utils";

type ISoloGift = ObjectOmit<IBaseGift, "bg">;

const SoloGift = (props: ISoloGift) => (
    <BaseGift
        {...props}
        bg="solo"
        footerText="ilmoittautuminen kurssille www.skydivejkl.fi"
    >
        <Text>Tämän lahjakortin saaja</Text>
        <Title>{props.name}</Title>
        <Text>on oikeutettu laskuvarjohypyn alkeis- tai tandemkurssiin</Text>
        <TextSmall>(sisältää koulutuksen ja hypyn)</TextSmall>
    </BaseGift>
);

export default SoloGift;
