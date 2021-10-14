/**
 * 获取 url 中的参数并解析成对象
 * @param search 待解析search
 */
export declare function getParamsInSearch(search?: string): Record<string, string>;
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
export declare function updateUrl(obj: {}, url?: string): string;
