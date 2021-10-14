/**
 * 获取 url 中的参数并解析成对象
 * @param search 待解析search
 */
export function getParamsInSearch(search?: string): Record<string, string> {
    if (search === void 0) {
        search = typeof window !== 'undefined' ? window.location.search : '';
    }
    const params: Record<string, string> = {};
    if (search.indexOf('?') !== -1) {
        const str = search.substr(1);
        const strs = str.split('&');
        for (let i = 0; i < strs.length; i++) {
            params[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
        }
    }
    return params;
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
export function updateSearch(obj: Record<string, string | number>, search?: string) {
    const params = getParamsInSearch(search);
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            params[key] = encodeURIComponent(obj[key]);
        }
    }
    let newSearch = '';
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            newSearch += (newSearch === '' ? '?' : '&') + (key + '=' + params[key]);
        }
    }
    return newSearch;
}

function getClearUrl(url: string): string {
    if (url.includes('?') || url.includes('#')) {
        const matched = url.match(/^.*?(?=[?|#])/) as RegExpMatchArray;
        return matched[0];
    }
    return url;
}

function getSearch(url: string): string {
    let search: string = '';
    if (url.includes('?')) {
        const matched = url.match(/\?.*$/) as RegExpMatchArray;
        search = matched[0].replace(/#.*$/, '');
    }
    return search === '?' ? '' : search;
}

function getHash(url: string): string {
    let hash = '';
    if (url.includes('#')) {
        const matched = url.match(/#.*$/) as RegExpMatchArray;
        hash = matched[0].replace(/\?.*$/, '');
    }
    return hash;
}

export function updateUrl(obj: {}, url?: string): string {
    url = url === void 0 ? (typeof window !== 'undefined' ? window.location.href : '') : url;
    return getClearUrl(url) + updateSearch(obj, getSearch(url)) + getHash(url);
}