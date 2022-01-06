"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleClass = exports.hasClass = exports.removeClass = exports.addClass = void 0;
/**
 * 添加class类名
 * @param obj dom元素
 * @param cls class名
 * @param notCheckExist 是否忽略dom已经有这个class
 */
function addClass(obj, cls, notCheckExist) {
    if (notCheckExist || !hasClass(obj, cls)) {
        var oldClass = obj.className.trim();
        obj.className = oldClass + (oldClass !== '' ? ' ' : '') + cls;
    }
}
exports.addClass = addClass;
/**
 * 移除class类名
 * @param obj dom元素
 * @param cls class名
 * @param notCheckExist 是否忽略dom没有这个class
 */
function removeClass(obj, cls, notCheckExist) {
    if (notCheckExist || hasClass(obj, cls)) {
        var objClass = obj.className.trim().replace(/(\s+)/gi, ' ');
        objClass = ' ' + objClass + ' '; // 首尾各加一个空格
        obj.className = objClass.replace(' ' + cls + ' ', ' ').trim();
    }
}
exports.removeClass = removeClass;
/**
 * 判断这个dom是否有这个clas
 * @param obj dom元素
 * @param cls class名
 */
function hasClass(obj, cls) {
    var objClass = obj.className.trim().replace(/(\s+)/gi, ' ');
    objClass = ' ' + objClass + ' '; // 首尾各加一个空格
    return objClass.indexOf(' ' + cls + ' ') !== -1;
}
exports.hasClass = hasClass;
/**
 * dom元素切换class类名
 * @param obj dom元素
 * @param cls class名
 */
function toggleClass(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls, true);
    }
    else {
        addClass(obj, cls, true);
    }
}
exports.toggleClass = toggleClass;
exports.default = {
    add: addClass,
    remove: removeClass,
    has: hasClass,
    toggle: toggleClass
};
