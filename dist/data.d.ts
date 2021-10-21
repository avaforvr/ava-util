/**
 * 判断传入的参数是不是JSON对象
 * @param param: 需要验证的表达式
 */
export declare function isJson(param: any): boolean;
/**
 * 获取数据类型，区分不同对象类型
 * @param param: 需要验证的表达式
 */
export declare function getDataType(param: any): string;
/**
 * 深度克隆数组或对象
 * @param origin: 要克隆的对象
 */
export declare function clone<T>(origin: T): T;
/**
 * 深度克隆并合并对象
 * @param target: 合并后的对象
 * @param args: 剩余参数
 */
export declare function merge(target: any[] | object, ...args: any[]): any[] | object;
/**
 * 获取 json 格式的对象
 * @param data
 */
export declare function parseJson(data: object | string): object | null;
/**
 * json 对象 key 转换成驼峰格式
 * @param source 源对象
 */
export declare function jsonToCamel<T>(source: T): T;
/**
 * json 对象 key 转换成小写下划线格式
 * @param source 源对象
 */
export declare function jsonToUnder<T>(source: T): T;
/**
 * 过滤空数据
 * @param o
 */
export declare function filterJson(o: Record<string | number, any>): Record<string | number, any>;
declare const _default: {
    isJson: typeof isJson;
    parseJson: typeof parseJson;
    getDataType: typeof getDataType;
    clone: typeof clone;
    merge: typeof merge;
    jsonToCamel: typeof jsonToCamel;
    jsonToUnder: typeof jsonToUnder;
    filterJson: typeof filterJson;
};
export default _default;
