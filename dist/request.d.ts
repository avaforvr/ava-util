/**
 * 获取 url 中的参数并解析成对象
 * @param search 待解析search
 */
export declare function getParamsInSearch(search?: string): Record<string, any>;
/**
 * 获取 url 中指定参数的值
 * @param key 指定参数名
 * @param search 待解析网址
 */
export declare function getParamInSearch(key: string, search?: string): string | undefined;
/**
 * 传入json格式对象更新search
 * @param obj 待解析网址
 * @param search search
 */
export declare function updateSearch(obj: Record<string, string | number>, search?: string): string;
/**
 * 获取 pathname
 * @param url
 */
export declare function getPathname(url: string): string;
/**
 * 获取 search
 * @param url
 */
export declare function getSearch(url: string): string;
/**
 * 获取 hash
 * @param url
 */
export declare function getHash(url: string): string;
/**
 * 生成完整路径
 * @param url url
 * @param params 动态路由参数
 * @param query query
 */
export declare function generatePath(url?: string | Record<string, any>, params?: Record<string, any>, query?: Record<string, any>): string;
