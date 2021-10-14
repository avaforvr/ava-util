import { getWindowWidth, getWindowHeight, getScrollBarWidth } from './dom-window';

/**
 * 判断是否是DOM节点
 * @param obj 待验证对象
 */
export function isDomNode(obj:any) {
    return typeof HTMLElement === 'object'
        ? obj instanceof HTMLElement
        : (obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string');
}

/**
 * 判断元素是否可见
 * @param obj Dom 元素
 */
export function isVisible(obj: HTMLElement): boolean {
    let result;
    if (!obj || !obj.offsetParent) {
        // obj.offsetParent 验证元素本身及祖先元素是否是 display:none 隐藏
        result = false;
    } else {
        // 验证 visibility 和 opacity
        const style = window.getComputedStyle(obj);
        result = parseFloat(style.width) !== 0 &&
            parseFloat(style.height) !== 0 &&
            parseFloat(style.opacity) !== 0 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden';
    }
    return result;
}

/**
 * 判断元素是否在可视区域内
 * @param obj Dom 元素
 */
export function isInViewport(obj: HTMLElement): boolean {
    if (!obj) {
        return false;
    }

    const rect = obj.getBoundingClientRect();
    const isViewTop = rect.top >= 0 && rect.top < getWindowHeight();
    const isViewBottom = rect.top < 0 && (rect.top + rect.height > 0);
    const isViewLeft = rect.left >= 0 && rect.left < getWindowWidth() - getScrollBarWidth();
    const isViewRight = rect.left < 0 && (rect.left + rect.width > 0);
    return (isViewTop || isViewBottom) && (isViewLeft || isViewRight);
}

/**
 * 判断元素是否在可视区域内完整展示
 * @param obj Dom 元素
 */
export function isInViewportCompletely(obj: HTMLElement): boolean {
    const rect = obj.getBoundingClientRect();
    const isHorizontalOk = rect.left >= 0 && (rect.left + rect.width <= getWindowWidth());
    const isVerticalOK = rect.top >= 0 && (rect.top + rect.height <= getWindowHeight());
    return isHorizontalOk && isVerticalOK;
}