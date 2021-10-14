/**
 * 驼峰转下划线
 * @param str 待转换字符串
 */
export function camelToUnder(str: string): string {
    return str.replace(/[A-Z]/g, matched => ('_' + matched.toLowerCase()));
}

/**
 * 下划线转驼峰
 * @param str 待转换字符串
 */
export function underToCamel(str: string): string {
    return str.replace(/_(\w)/g, (matched, letter) => letter.toUpperCase());
}

/**
 * 首字母大写
 * @param str 待转换字符串
 */
export function upperFirstLetter(str: string): string {
    return str.replace(/(^|\s+)\w/g, s => s.toUpperCase());
}

/**
 * 首字母小写
 * @param str 待转换字符串
 */
export function lowerFirstLetter(str: string): string {
    return str.replace(/(^|\s+)\w/g, s => s.toLowerCase());
}
