import React from "react";

import BaseGift, {IBaseGift, Text, Title, TextSmall} from "./BaseGift";

import {ObjectOmit} from "./utils";

type IAmountGift = ObjectOmit<IBaseGift, "bg"> & {amount: number};

const AmountGift = (props: IAmountGift) => (
    <BaseGift
        {...props}
        bg="solo"
        footerText="toimii maksuvälineenä Jyväskylän Laskuvarjokerho Ry:ssä"
    >
        <Text>Tämä henkilökohtainen lahjakortti laskuvarjohyppääjälle</Text>
        <Title>{props.name}</Title>
        <Text>toimii maksuvälineenä JLK:ssa arvostaan</Text>
        <Title>{props.amount} €</Title>
    </BaseGift>
);

export default AmountGift;
