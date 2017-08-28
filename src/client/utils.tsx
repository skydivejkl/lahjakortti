import qs from "qs";

export const parseQS = (search: string) => {
    const ob: {
        [key: string]: string | undefined;
    } = qs.parse(search.slice(1));
    return ob;
};
