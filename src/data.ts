import {camelToUnder, underToCamel} from './string';

/**
 * 判断传入的参数是不是JSON对象
 * @param param: 需要验证的表达式
 */
export function isJson(param: any): boolean {
    return (
        typeof param === 'object' &&
        Object.prototype.toString.call(param).toLowerCase() === '[object object]' &&
        !param.length
    );
}

/**
 * 获取数据类型，区分不同对象类型
 * @param param: 需要验证的表达式
 */
export function getDataType(param: any): string {
    let type: string = typeof param;
    if (type === 'object') {
        /* istanbul ignore else */
        if (param === null) {
            type = 'null';
        } else if (Array.isArray(param)) {
            type = 'array';
        } else {
            type = 'json';
        }
    }
    return type;
}

/**
 * 深度克隆数组或对象
 * @param origin: 要克隆的对象
 */
export function clone<T>(origin: T): T {
    let cloned: any;
    const type = getDataType(origin);
    if (type === 'array' || type === 'json') {
        cloned = type === 'array' ? [] : {};
        Object.keys(origin).forEach(key => {
            const nextType = getDataType(origin[key]);
            cloned[key] = nextType === 'array' || nextType === 'json'
                ? clone(origin[key])
                : origin[key];
        });
    } else {
        cloned = origin;
    }
    return cloned;
}

/**
 * 深度克隆并合并对象
 * @param target: 合并后的对象
 * @param args: 剩余参数
 */
export function merge(target: any[] | object, ...args: any[]): any[] | object {
    target = target || {};
    const targetType = getDataType(target);

    args.forEach(arg => {
        // target 和 arg 数据类型不一致时直接赋值
        if (getDataType(arg) !== targetType) {
            target = clone(arg);
        } else {
            Object.keys(arg).forEach(key => {
                if (isJson(arg[key])) {
                    // Json对象
                    target[key] = merge(target[key], arg[key]);
                } else if (Array.isArray(arg[key])) {
                    // 普通数组
                    target[key] = merge([], arg[key]);
                } else {
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
export function parseJson(data: object | string): object | null {
    let result: object | null = null;
    if (isJson(data)) {
        result = <object>clone(data);
    } else if (typeof data === 'string') {
        try {
            result = JSON.parse(data.replace(/'/g, '"'));
        } catch (err) {
            throw new TypeError(`Illegal json format: ${data}`);
        }
    } else {
        throw new TypeError(`Parameter can only be string or json: ${data}`);
    }
    return result;
}

function trans(source: any, format: 'camel' | 'under'): any {
    if (source instanceof Array) {
        return source.map(v => trans(v, format));
    } else if (isJson(source)) {
        const result = {};
        Object.keys(source).forEach(function (key) {
            var newKey = format === 'camel' ? underToCamel(key) : camelToUnder(key);
            result[newKey] = trans(source[key], format);
        });
        return result;
    }
    return source;
}

/**
 * json 对象 key 转换成驼峰格式
 * @param source 源对象
 */
export function jsonToCamel<T>(source: T): T {
    return trans(source, 'camel');
}

/**
 * json 对象 key 转换成小写下划线格式
 * @param source 源对象
 */
export function jsonToUnder<T>(source: T): T {
    return trans(source, 'under');
}

/**
 * 过滤空数据
 * @param o
 */
export function filterJson(o: Record<string | number, any>): Record<string | number, any> {
    for (const key in o) {
        if (o[key] === null) {
            delete o[key];
        } else if (getDataType(o[key]) === 'string') {
            o[key] = o[key].trim();
        } else if (getDataType(o[key]) === 'object' || getDataType(o[key]) === 'array') {
            o[key] = filterJson(o[key]);
        }
    }
    return o;
}

export default {
    isJson,
    parseJson,
    getDataType,
    clone,
    merge,
    jsonToCamel,
    jsonToUnder,
    filterJson
};
