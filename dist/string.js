/**
 * 驼峰转下划线
 * @param str 待转换字符串
 */
export function camelToUnder(str) {
    return str.replace(/[A-Z]/g, function (matched) { return ('_' + matched.toLowerCase()); });
}
/**
 * 下划线转驼峰
 * @param str 待转换字符串
 */
export function underToCamel(str) {
    return str.replace(/_(\w)/g, function (matched, letter) { return letter.toUpperCase(); });
}
/**
 * 首字母大写
 * @param str 待转换字符串
 */
export function upperFirstLetter(str) {
    return str.replace(/(^|\s+)\w/g, function (s) { return s.toUpperCase(); });
}
/**
 * 首字母小写
 * @param str 待转换字符串
 */
export function lowerFirstLetter(str) {
    return str.replace(/(^|\s+)\w/g, function (s) { return s.toLowerCase(); });
}
