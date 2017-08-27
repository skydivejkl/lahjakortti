import React from "react";

import TandemGift from "./TandemGift";
import AmountGift from "./AmountGift";
import {IBaseGift} from "./BaseGift";

const amountRe = /^ *summa +([0-9]+) *$/i;

const Preview = (props: IBaseGift) => {
    console.log("Testing", props.type);
    const amountMatch = amountRe.exec(props.type);
    if (amountMatch) {
        return <AmountGift {...props} amount={parseInt(amountMatch[1], 10)} />;
    }

    return <TandemGift {...props} />;
};

export default Preview;
