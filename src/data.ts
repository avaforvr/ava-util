/**
 * 判断传入的参数是不是JSON对象
 * @param {any} param: 需要验证的表达式
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
 * @param {any} param: 需要验证的表达式
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
 * @param {any} origin: 要克隆的对象
 */

export function clone(origin: any): any {
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
 * @param {any} target: 合并后的对象
 * @param {any[]} args: 剩余参数
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

export default {
    isJson,
    getDataType,
    clone,
    merge
};
