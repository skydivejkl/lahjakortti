import glamorous from "glamorous";

export const View = glamorous.div<{flex?: boolean}>(
    {
        flexDirection: "column",
        display: "flex",
        boxSizing: "border-box",
        position: "relative",
        fontFamily: "arial",
    },
    props => (props.flex ? {flex: 1} : {}),
);
