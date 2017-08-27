import React from "react";
import glamorous from "glamorous";

import {View} from "./core";

const SIZE = 200;

const PDFPreview = glamorous.iframe({
    display: "flex",
    boxSizing: "border-box",
    flex: 1,
});

const Sidebar = glamorous(View)({
    width: SIZE,
    alignItems: "center",
});

const Container = glamorous(View)({
    flexDirection: "row",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
});

interface IEmail {
    id: string;
}

const Email = (props: IEmail) => {
    const url = `/assets/pdf/${props.id}.pdf`;
    return (
        <Container>
            <Sidebar>
                <a href={url} download>
                    Lataa
                </a>
            </Sidebar>
            <PDFPreview frameBorder={0} src={url} />
        </Container>
    );
};

export default Email;
