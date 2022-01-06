import { compile } from 'path-to-regexp';
import qs, { ParseOptions } from 'query-string';

const qsOptions: ParseOptions = { arrayFormat: 'bracket' };

/**
 * 获取 url 中的参数并解析成对象
 * @param search 待解析search
 */
export function getParamsInSearch(search?: string): Record<string, any> {
    if (search === void 0) {
        search = typeof window !== 'undefined' ? window.location.search : '';
    }
    return qs.parse(search, qsOptions);
}

/**
 * 获取 url 中指定参数的值
 * @param key 指定参数名
 * @param search 待解析网址
 */
export function getParamInSearch(key: string, search?: string): string | undefined {
    const params = getParamsInSearch(search);
    return params[key];
}

/**
 * 传入json格式对象更新search
 * @param obj 待解析网址
 * @param search search
 */
export function updateSearch(obj: Record<string, string | number>, search: string = '') {
    const merged = {
        ...qs.parse(search, qsOptions),
        ...obj
    };
    return `?${qs.stringify(merged, qsOptions)}`;
}

/**
 * 获取 pathname
 * @param url
 */
export function getPathname(url: string): string {
    if (url.includes('?') || url.includes('#')) {
        const matched = url.match(/^.*?(?=[?|#])/) as RegExpMatchArray;
        return matched[0];
    }
    return url;
}

/**
 * 获取 search
 * @param url
 */
export function getSearch(url: string): string {
    let search: string = '';
    if (url.includes('?')) {
        const matched = url.match(/\?.*$/) as RegExpMatchArray;
        search = matched[0].replace(/#.*$/, '');
    }
    return search === '?' ? '' : search;
}

/**
 * 获取 hash
 * @param url
 */
export function getHash(url: string): string {
    let hash = '';
    if (url.includes('#')) {
        const matched = url.match(/#.*$/) as RegExpMatchArray;
        hash = matched[0].replace(/\?.*$/, '');
    }
    return hash;
}

/**
 * 生成完整路径
 * @param url url
 * @param params 动态路由参数
 * @param query query
 */
export function generatePath(
    url?: string | Record<string, any>,
    params?: Record<string, any>,
    query?: Record<string, any>
): string {
    if (typeof url !== 'string') {
        params = url;
        url = typeof window !== 'undefined' ? window.location.href.replace(/^\w*:\/\/.*?\//, '/') : '';
    }

    let pathname: string = getPathname(url);
    let search: string = getSearch(url);

    if (pathname.includes(':') && params) {
        // 动态路由变量替换
        pathname = compile(pathname, { encode: encodeURIComponent })(params);
    } else {
        // 非动态路由，第二个参数作为 query 使用
        query = params;
    }
    if (query) {
        search = updateSearch(query, search);
    }

    return pathname + search + getHash(url);
}
