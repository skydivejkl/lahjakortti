import React from "react";

import TandemGift from "./TandemGift";
import AmountGift from "./AmountGift";
import {IBaseGift} from "./BaseGift";

const amountRe = /^ *summa +([0-9]+) *$/i;

interface IPreview {
    type: string;
    name: string;
    id: string;
    date: Date;
}

const Preview = (props: IPreview) => {
    const amountMatch = amountRe.exec(props.type);
    if (amountMatch) {
        return (
            <AmountGift
                {...props}
                bg="solo"
                amount={parseInt(amountMatch[1], 10)}
            />
        );
    }

    return <TandemGift bg="tandem" {...props} />;
};

export default Preview;
