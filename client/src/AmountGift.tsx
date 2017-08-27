import React from "react";

import BaseGift, {IBaseGift, Text, Title, TextSmall} from "./BaseGift";

const AmountGift = (props: IBaseGift & {amount: number}) =>
    <BaseGift
        {...props}
        footerText="toimii maksuvälineenä Jyväskylän Laskuvarjokerho Ry:ssä"
    >
        <Text>Tämä henkilökohtainen lahjakortti laskuvarjohyppääjälle</Text>
        <Title>
            {props.name}
        </Title>
        <Text>toimii maksuvälineenä JLK:ssa arvostaan</Text>
        <Title>
            {props.amount} €
        </Title>
    </BaseGift>;

export default AmountGift;
