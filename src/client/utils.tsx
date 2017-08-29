import qs from "qs";

export const parseQS = (search: string) => {
    const ob: {
        [key: string]: string | undefined;
    } = qs.parse(search.slice(1));
    return ob;
};

export type StringDiff<T extends string, U extends string> = ({[K in T]: K} &
    {[K in U]: never} & {[K: string]: never})[T];
export type ObjectOmit<T extends object, K extends keyof T> = Pick<
    T,
    StringDiff<keyof T, K>
>;
