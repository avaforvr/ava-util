"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkWrappedByTag = exports.checkWrappedBy = exports.removeEvent = exports.addEvent = void 0;
/**
 * 绑定事件
 * @param domElem    Dom 元素
 * @param eventName  事件名
 * @param func       事件触发时执行的函数
 * @param useCapture 指定事件是否在捕获或冒泡阶段执行
 */
function addEvent(domElem, eventName, func, useCapture) {
    if (useCapture === void 0) { useCapture = false; }
    useCapture = typeof useCapture !== 'undefined' ? useCapture : false;
    domElem.addEventListener(eventName, func, useCapture);
}
exports.addEvent = addEvent;
/**
 * 解除绑定事件
 * @param domElem    Dom 元素
 * @param eventName  事件名
 * @param func       事件触发时执行的函数
 */
function removeEvent(domElem, eventName, func) {
    domElem.removeEventListener(eventName, func, false);
}
exports.removeEvent = removeEvent;
/**
 * 判断触发事件的节点是否某DOM元素或其子孙元素
 * @param e 触发事件
 * @param domElem 对比DOM元素
 */
function checkWrappedBy(e, domElem) {
    var target = e.target;
    do {
        if (target === domElem) {
            return true;
        }
        target = target.parentNode;
    } while (target && target.parentNode);
    return false;
}
exports.checkWrappedBy = checkWrappedBy;
/**
 * 判断触发事件的节点是否某指定类型的标签或包含在标签内
 * @param e 触发事件
 * @param diffTagName 指定的标签名（小写）
 */
function checkWrappedByTag(e, diffTagName) {
    var target = e.target;
    do {
        if (target.tagName.toLowerCase() === diffTagName) {
            return true;
        }
        target = target.parentNode;
    } while (target && target.parentNode);
    return false;
}
exports.checkWrappedByTag = checkWrappedByTag;
exports.default = {
    add: addEvent,
    remove: removeEvent,
    checkWrappedBy: checkWrappedBy,
    checkWrappedByTag: checkWrappedByTag
};
