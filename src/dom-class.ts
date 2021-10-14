/**
 * 添加class类名
 * @param obj dom元素
 * @param cls class名
 * @param notCheckExist 是否忽略dom已经有这个class
 */
export function addClass(obj, cls, notCheckExist) {
    if (notCheckExist || !hasClass(obj, cls)) {
        const oldClass = obj.className.trim();
        obj.className = oldClass + (oldClass !== '' ? ' ' : '') + cls;
    }
}

/**
 * 移除class类名
 * @param obj dom元素
 * @param cls class名
 * @param notCheckExist 是否忽略dom没有这个class
 */
export function removeClass(obj, cls, notCheckExist) {
    if (notCheckExist || hasClass(obj, cls)) {
        let objClass = obj.className.trim().replace(/(\s+)/gi, ' ');
        objClass = ' ' + objClass + ' '; // 首尾各加一个空格
        obj.className = objClass.replace(' ' + cls + ' ', ' ').trim();
    }
}

/**
 * 判断这个dom是否有这个clas
 * @param obj dom元素
 * @param cls class名
 */
export function hasClass(obj, cls) {
    let objClass = obj.className.trim().replace(/(\s+)/gi, ' ');
    objClass = ' ' + objClass + ' '; // 首尾各加一个空格
    return objClass.indexOf(' ' + cls + ' ') !== -1;
}

/**
 * dom元素切换class类名
 * @param obj dom元素
 * @param cls class名
 */
export function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls, true);
    } else {
        addClass(obj, cls, true);
    }
}

export default {
    add: addClass,
    remove: removeClass,
    has: hasClass,
    toggle: toggleClass
};
