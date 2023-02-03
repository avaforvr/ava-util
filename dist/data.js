"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFields = exports.isEmpty = exports.transJsonKeys = exports.filterJson = exports.jsonToUnder = exports.jsonToCamel = exports.parseJson = exports.merge = exports.clone = exports.getDataType = exports.isJson = void 0;
var string_1 = require("./string");
/**
 * 判断传入的参数是不是JSON对象
 * @param param: 需要验证的表达式
 */
function isJson(param) {
    return (typeof param === 'object' &&
        Object.prototype.toString.call(param).toLowerCase() === '[object object]' &&
        !param.length);
}
exports.isJson = isJson;
/**
 * 获取数据类型，区分不同对象类型
 * @param param: 需要验证的表达式
 */
function getDataType(param) {
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
exports.getDataType = getDataType;
/**
 * 深度克隆数组或对象
 * @param origin: 要克隆的对象
 */
function clone(origin) {
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
exports.clone = clone;
/**
 * 深度克隆并合并对象
 * @param target: 合并后的对象
 * @param args: 剩余参数
 */
function merge(target) {
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
exports.merge = merge;
/**
 * 获取 json 格式的对象
 * @param data
 */
function parseJson(data) {
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
exports.parseJson = parseJson;
function trans(source, format) {
    if (source instanceof Array) {
        return source.map(function (v) { return trans(v, format); });
    }
    else if (isJson(source)) {
        var result_1 = {};
        Object.keys(source).forEach(function (key) {
            var newKey = format === 'camel' ? string_1.underToCamel(key) : string_1.camelToUnder(key);
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
function jsonToCamel(source) {
    return trans(source, 'camel');
}
exports.jsonToCamel = jsonToCamel;
/**
 * json 对象 key 转换成小写下划线格式
 * @param source 源对象
 */
function jsonToUnder(source) {
    return trans(source, 'under');
}
exports.jsonToUnder = jsonToUnder;
/**
 * 过滤空数据
 * @param o 需要过滤的对象
 */
function filterJson(o) {
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
exports.filterJson = filterJson;
function transJsonKeys(obj, mapKeys, keepKeys) {
    var newObj = {};
    Object.entries(obj).map(function (_a) {
        var key = _a[0], value = _a[1];
        if (mapKeys && key in mapKeys) {
            newObj[mapKeys[key]] = value;
        }
        else if (!keepKeys || keepKeys.includes(key)) {
            newObj[key] = value;
        }
    });
    return newObj;
}
exports.transJsonKeys = transJsonKeys;
/**
 * 判断是不是空值、空数组、空对象
 * @param data 各种数据类型的数据
 */
function isEmpty(data) {
    if (data === undefined || data === null || data === '') {
        return true;
    }
    var type = getDataType(data);
    if (type === 'array') {
        return data.length === 0;
    }
    if (type === 'json') {
        return JSON.stringify(data) === '{}';
    }
    return false;
}
exports.isEmpty = isEmpty;
/**
 * 判断json属性是否保留
 * @param key json属性名
 * @param keepFields 待保留属性名
 * @param exludeFields 待删除属性名
 */
function checkKeepField(key, keepFields, exludeFields) {
    if (typeof exludeFields !== 'undefined') {
        return !exludeFields.includes(key);
    }
    if (typeof keepFields !== 'undefined') {
        return keepFields.includes(key);
    }
    return true;
}
function filterFields(data, rules) {
    var dataType = getDataType(data);
    if (isEmpty(data) || isEmpty(rules) || !(['json', 'array'].includes(dataType))) {
        return data;
    }
    var keepFields = Array.isArray(rules) ? rules : rules === null || rules === void 0 ? void 0 : rules.keepFields;
    var exludeFields = Array.isArray(rules) ? undefined : rules === null || rules === void 0 ? void 0 : rules.exludeFields;
    if (dataType === 'json') {
        var _data_1 = {};
        Object.entries(data).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (checkKeepField(key, keepFields, exludeFields)) {
                // @ts-ignore
                _data_1[key] = key in rules ? filterFields(value, rules[key]) : value;
            }
        });
        return _data_1;
    }
    else {
        // @ts-ignore
        return data.map(function (value) { return filterFields(value, rules); });
    }
}
exports.filterFields = filterFields;
exports.default = {
    isJson: isJson,
    parseJson: parseJson,
    getDataType: getDataType,
    clone: clone,
    merge: merge,
    jsonToCamel: jsonToCamel,
    jsonToUnder: jsonToUnder,
    filterJson: filterJson,
    transJsonKeys: transJsonKeys,
    isEmpty: isEmpty,
    filterFields: filterFields
};
