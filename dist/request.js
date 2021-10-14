"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUrl = exports.updateSearch = exports.getParamInSearch = exports.getParamsInSearch = void 0;
/**
 * 获取 url 中的参数并解析成对象
 * @param search 待解析search
 */
function getParamsInSearch(search) {
    if (search === void 0) {
        search = typeof window !== 'undefined' ? window.location.search : '';
    }
    var params = {};
    if (search.indexOf('?') !== -1) {
        var str = search.substr(1);
        var strs = str.split('&');
        for (var i = 0; i < strs.length; i++) {
            params[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
        }
    }
    return params;
}
exports.getParamsInSearch = getParamsInSearch;
/**
 * 获取 url 中指定参数的值
 * @param key 指定参数名
 * @param search 待解析网址
 */
function getParamInSearch(key, search) {
    var params = getParamsInSearch(search);
    return params[key];
}
exports.getParamInSearch = getParamInSearch;
/**
 * 传入json格式对象更新search
 * @param obj 待解析网址
 * @param search search
 */
function updateSearch(obj, search) {
    var params = getParamsInSearch(search);
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            params[key] = encodeURIComponent(obj[key]);
        }
    }
    var newSearch = '';
    for (var key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            newSearch += (newSearch === '' ? '?' : '&') + (key + '=' + params[key]);
        }
    }
    return newSearch;
}
exports.updateSearch = updateSearch;
function getClearUrl(url) {
    if (url.includes('?') || url.includes('#')) {
        var matched = url.match(/^.*?(?=[?|#])/);
        return matched[0];
    }
    return url;
}
function getSearch(url) {
    var search = '';
    if (url.includes('?')) {
        var matched = url.match(/\?.*$/);
        search = matched[0].replace(/#.*$/, '');
    }
    return search === '?' ? '' : search;
}
function getHash(url) {
    var hash = '';
    if (url.includes('#')) {
        var matched = url.match(/#.*$/);
        hash = matched[0].replace(/\?.*$/, '');
    }
    return hash;
}
function updateUrl(obj, url) {
    url = url === void 0 ? (typeof window !== 'undefined' ? window.location.href : '') : url;
    return getClearUrl(url) + updateSearch(obj, getSearch(url)) + getHash(url);
}
exports.updateUrl = updateUrl;
