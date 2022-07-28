declare type UtilFunc = (userAgent?: string) => boolean;
declare const CLIENT_KEYS: ReadonlyArray<string>;
declare type ClientKeyType = typeof CLIENT_KEYS[number];
export declare type UAParsedMap = Record<ClientKeyType, boolean>;
export declare type UAUtilsType = Record<ClientKeyType, UtilFunc> & {
    parse: (userAgent: string) => UAParsedMap;
};
declare const uaUtils: UAUtilsType;
export default uaUtils;
