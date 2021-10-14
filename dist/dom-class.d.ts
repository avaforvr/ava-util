/**
 * 添加class类名
 * @param obj dom元素
 * @param cls class名
 * @param notCheckExist 是否忽略dom已经有这个class
 */
export declare function addClass(obj: any, cls: any, notCheckExist: any): void;
/**
 * 移除class类名
 * @param obj dom元素
 * @param cls class名
 * @param notCheckExist 是否忽略dom没有这个class
 */
export declare function removeClass(obj: any, cls: any, notCheckExist: any): void;
/**
 * 判断这个dom是否有这个clas
 * @param obj dom元素
 * @param cls class名
 */
export declare function hasClass(obj: any, cls: any): boolean;
/**
 * dom元素切换class类名
 * @param obj dom元素
 * @param cls class名
 */
export declare function toggleClass(obj: any, cls: any): void;
declare const _default: {
    add: typeof addClass;
    remove: typeof removeClass;
    has: typeof hasClass;
    toggle: typeof toggleClass;
};
export default _default;
