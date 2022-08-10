/**
 * 绑定事件
 * @param domElem    Dom 元素
 * @param eventName  事件名
 * @param func       事件触发时执行的函数
 * @param useCapture 指定事件是否在捕获或冒泡阶段执行
 */
export function addEvent(domElem, eventName, func, useCapture = false): void {
    useCapture = typeof useCapture !== 'undefined' ? useCapture : false;
    domElem.addEventListener(eventName, func, useCapture);
}

/**
 * 解除绑定事件
 * @param domElem    Dom 元素
 * @param eventName  事件名
 * @param func       事件触发时执行的函数
 */
export function removeEvent(domElem, eventName, func) {
    domElem.removeEventListener(eventName, func, false);
}

/**
 * 判断触发事件的节点是否某DOM元素或其子孙元素
 * @param e 触发事件
 * @param domElem 对比DOM元素
 */
export function checkWrappedBy(e, domElem) {
    var target = e.target;
    do {
        if (target === domElem) {
            return true;
        }
        target = target.parentNode;
    } while (target && target.parentNode);
    return false;
}
/**
 * 判断触发事件的节点是否某指定类型的标签或包含在标签内
 * @param e 触发事件
 * @param diffTagName 指定的标签名（小写）
 */
export function checkWrappedByTag(e: MouseEvent, diffTagName: string) {
    let target = e.target as HTMLElement;
    do {
        if (target.tagName.toLowerCase() === diffTagName) {
            return true;
        }
        target = target.parentNode as HTMLElement;
    } while (target && target.parentNode);
    return false;
}

export default {
    add: addEvent,
    remove: removeEvent,
    checkWrappedBy,
    checkWrappedByTag
};
