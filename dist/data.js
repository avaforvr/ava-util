import { camelToUnder, underToCamel } from './string';
/**
 * 判断传入的参数是不是JSON对象
 * @param param: 需要验证的表达式
 */
export function isJson(param) {
    return (typeof param === 'object' &&
        Object.prototype.toString.call(param).toLowerCase() === '[object object]' &&
        !param.length);
}
/**
 * 获取数据类型，区分不同对象类型
 * @param param: 需要验证的表达式
 */
export function getDataType(param) {
    var type = typeof param;
    if (type === 'object') {
        /* istanbul ignore else */
        if (param === null) {
            type = 'null';
        }
        else if (Array.isArray(param)) {
            type = 'array';
        }
        else {
            type = 'json';
        }
    }
    return type;
}
/**
 * 深度克隆数组或对象
 * @param origin: 要克隆的对象
 */
export function clone(origin) {
    var cloned;
    var type = getDataType(origin);
    if (type === 'array' || type === 'json') {
        cloned = type === 'array' ? [] : {};
        Object.keys(origin).forEach(function (key) {
            var nextType = getDataType(origin[key]);
            cloned[key] = nextType === 'array' || nextType === 'json'
                ? clone(origin[key])
                : origin[key];
        });
    }
    else {
        cloned = origin;
    }
    return cloned;
}
/**
 * 深度克隆并合并对象
 * @param target: 合并后的对象
 * @param args: 剩余参数
 */
export function merge(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    target = target || {};
    var targetType = getDataType(target);
    args.forEach(function (arg) {
        // target 和 arg 数据类型不一致时直接赋值
        if (getDataType(arg) !== targetType) {
            target = clone(arg);
        }
        else {
            Object.keys(arg).forEach(function (key) {
                if (isJson(arg[key])) {
                    // Json对象
                    target[key] = merge(target[key], arg[key]);
                }
                else if (Array.isArray(arg[key])) {
                    // 普通数组
                    target[key] = merge([], arg[key]);
                }
                else {
                    // 其它对象不拷贝
                    target[key] = arg[key];
                }
            });
        }
    });
    return target;
}
/**
 * 获取 json 格式的对象
 * @param data
 */
export function parseJson(data) {
    var result = null;
    if (isJson(data)) {
        result = clone(data);
    }
    else if (typeof data === 'string') {
        try {
            result = JSON.parse(data.replace(/'/g, '"'));
        }
        catch (err) {
            throw new TypeError("Illegal json format: " + data);
        }
    }
    else {
        throw new TypeError("Parameter can only be string or json: " + data);
    }
    return result;
}
function trans(source, format) {
    if (source instanceof Array) {
        return source.map(function (v) { return trans(v, format); });
    }
    else if (isJson(source)) {
        var result_1 = {};
        Object.keys(source).forEach(function (key) {
            var newKey = format === 'camel' ? underToCamel(key) : camelToUnder(key);
            result_1[newKey] = trans(source[key], format);
        });
        return result_1;
    }
    return source;
}
/**
 * json 对象 key 转换成驼峰格式
 * @param source 源对象
 */
export function jsonToCamel(source) {
    return trans(source, 'camel');
}
/**
 * json 对象 key 转换成小写下划线格式
 * @param source 源对象
 */
export function jsonToUnder(source) {
    return trans(source, 'under');
}
/**
 * 过滤空数据
 * @param o
 */
export function filterJson(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key];
        }
        else if (getDataType(o[key]) === 'string') {
            o[key] = o[key].trim();
        }
        else if (getDataType(o[key]) === 'object' || getDataType(o[key]) === 'array') {
            o[key] = filterJson(o[key]);
        }
    }
    return o;
}
export default {
    isJson: isJson,
    parseJson: parseJson,
    getDataType: getDataType,
    clone: clone,
    merge: merge,
    jsonToCamel: jsonToCamel,
    jsonToUnder: jsonToUnder,
    filterJson: filterJson
};
