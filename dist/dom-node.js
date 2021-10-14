"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInViewportCompletely = exports.isInViewport = exports.isVisible = exports.isDomNode = void 0;
var dom_window_1 = require("./dom-window");
/**
 * 判断是否是DOM节点
 * @param obj 待验证对象
 */
function isDomNode(obj) {
    return typeof HTMLElement === 'object'
        ? obj instanceof HTMLElement
        : (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string');
}
exports.isDomNode = isDomNode;
/**
 * 判断元素是否可见
 * @param obj Dom 元素
 */
function isVisible(obj) {
    var result;
    if (!obj || !obj.offsetParent) {
        // obj.offsetParent 验证元素本身及祖先元素是否是 display:none 隐藏
        result = false;
    }
    else {
        // 验证 visibility 和 opacity
        var style = window.getComputedStyle(obj);
        result = parseFloat(style.width) !== 0 &&
            parseFloat(style.height) !== 0 &&
            parseFloat(style.opacity) !== 0 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden';
    }
    return result;
}
exports.isVisible = isVisible;
/**
 * 判断元素是否在可视区域内
 * @param obj Dom 元素
 */
function isInViewport(obj) {
    if (!obj) {
        return false;
    }
    var rect = obj.getBoundingClientRect();
    var isViewTop = rect.top >= 0 && rect.top < dom_window_1.getWindowHeight();
    var isViewBottom = rect.top < 0 && (rect.top + rect.height > 0);
    var isViewLeft = rect.left >= 0 && rect.left < dom_window_1.getWindowWidth() - dom_window_1.getScrollBarWidth();
    var isViewRight = rect.left < 0 && (rect.left + rect.width > 0);
    return (isViewTop || isViewBottom) && (isViewLeft || isViewRight);
}
exports.isInViewport = isInViewport;
/**
 * 判断元素是否在可视区域内完整展示
 * @param obj Dom 元素
 */
function isInViewportCompletely(obj) {
    var rect = obj.getBoundingClientRect();
    var isHorizontalOk = rect.left >= 0 && (rect.left + rect.width <= dom_window_1.getWindowWidth());
    var isVerticalOK = rect.top >= 0 && (rect.top + rect.height <= dom_window_1.getWindowHeight());
    return isHorizontalOk && isVerticalOK;
}
exports.isInViewportCompletely = isInViewportCompletely;
