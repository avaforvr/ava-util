"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePath = exports.getHash = exports.getSearch = exports.getPathname = exports.updateSearch = exports.getParamInSearch = exports.getParamsInSearch = void 0;
var path_to_regexp_1 = require("path-to-regexp");
var query_string_1 = require("query-string");
var qsOptions = { arrayFormat: 'bracket' };
/**
 * 获取 url 中的参数并解析成对象
 * @param search 待解析search
 */
function getParamsInSearch(search) {
    if (search === void 0) {
        search = typeof window !== 'undefined' ? window.location.search : '';
    }
    return query_string_1.default.parse(search, qsOptions);
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
    if (search === void 0) { search = ''; }
    var merged = __assign(__assign({}, query_string_1.default.parse(search, qsOptions)), obj);
    return "?" + query_string_1.default.stringify(merged, qsOptions);
}
exports.updateSearch = updateSearch;
/**
 * 获取 pathname
 * @param url
 */
function getPathname(url) {
    if (url.includes('?') || url.includes('#')) {
        var matched = url.match(/^.*?(?=[?|#])/);
        return matched[0];
    }
    return url;
}
exports.getPathname = getPathname;
/**
 * 获取 search
 * @param url
 */
function getSearch(url) {
    var search = '';
    if (url.includes('?')) {
        var matched = url.match(/\?.*$/);
        search = matched[0].replace(/#.*$/, '');
    }
    return search === '?' ? '' : search;
}
exports.getSearch = getSearch;
/**
 * 获取 hash
 * @param url
 */
function getHash(url) {
    var hash = '';
    if (url.includes('#')) {
        var matched = url.match(/#.*$/);
        hash = matched[0].replace(/\?.*$/, '');
    }
    return hash;
}
exports.getHash = getHash;
/**
 * 生成完整路径
 * @param url url
 * @param params 动态路由参数
 * @param query query
 */
function generatePath(url, params, query) {
    if (typeof url !== 'string') {
        params = url;
        url = typeof window !== 'undefined' ? window.location.href.replace(/^\w*:\/\/.*?\//, '/') : '';
    }
    var pathname = getPathname(url);
    var search = getSearch(url);
    if (pathname.includes(':') && params) {
        // 动态路由变量替换
        pathname = path_to_regexp_1.compile(pathname, { encode: encodeURIComponent })(params);
    }
    else {
        // 非动态路由，第二个参数作为 query 使用
        query = params;
    }
    if (query) {
        search = updateSearch(query, search);
    }
    return pathname + search + getHash(url);
}
exports.generatePath = generatePath;
