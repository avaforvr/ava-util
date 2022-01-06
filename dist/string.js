"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowerFirstLetter = exports.upperFirstLetter = exports.underToCamel = exports.camelToUnder = void 0;
/**
 * 驼峰转下划线
 * @param str 待转换字符串
 */
function camelToUnder(str) {
    return str.replace(/[A-Z]/g, function (matched) { return ('_' + matched.toLowerCase()); });
}
exports.camelToUnder = camelToUnder;
/**
 * 下划线转驼峰
 * @param str 待转换字符串
 */
function underToCamel(str) {
    return str.replace(/_(\w)/g, function (matched, letter) { return letter.toUpperCase(); });
}
exports.underToCamel = underToCamel;
/**
 * 首字母大写
 * @param str 待转换字符串
 */
function upperFirstLetter(str) {
    return str.replace(/(^|\s+)\w/g, function (s) { return s.toUpperCase(); });
}
exports.upperFirstLetter = upperFirstLetter;
/**
 * 首字母小写
 * @param str 待转换字符串
 */
function lowerFirstLetter(str) {
    return str.replace(/(^|\s+)\w/g, function (s) { return s.toLowerCase(); });
}
exports.lowerFirstLetter = lowerFirstLetter;
