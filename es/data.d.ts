/**
 * 判断传入的参数是不是JSON对象
 * @param {any} param: 需要验证的表达式
 */
export declare function isJson(param: any): boolean;
/**
 * 获取数据类型，区分不同对象类型
 * @param {any} param: 需要验证的表达式
 */
export declare function getDataType(param: any): string;
/**
 * 深度克隆数组或对象
 * @param {any} origin: 要克隆的对象
 */
export declare function clone(origin: any): any;
/**
 * 深度克隆并合并对象
 * @param {any} target: 合并后的对象
 * @param {any[]} args: 剩余参数
 */
export declare function merge(target: any[] | object, ...args: any[]): any[] | object;
declare const _default: {
    isJson: typeof isJson;
    getDataType: typeof getDataType;
    clone: typeof clone;
    merge: typeof merge;
};
export default _default;
