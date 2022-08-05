/**
 * 绑定事件
 * @param domElem    Dom 元素
 * @param eventName  事件名
 * @param func       事件触发时执行的函数
 * @param useCapture 指定事件是否在捕获或冒泡阶段执行
 */
export declare function addEvent(domElem: any, eventName: any, func: any, useCapture?: boolean): void;
/**
 * 解除绑定事件
 * @param domElem    Dom 元素
 * @param eventName  事件名
 * @param func       事件触发时执行的函数
 */
export declare function removeEvent(domElem: any, eventName: any, func: any): void;
/**
 * 判断触发事件的节点是否某DOM元素或其子孙元素
 * @param e 触发事件
 * @param domElem 对比DOM元素
 */
export declare function checkWrappedBy(e: any, domElem: any): boolean;
/**
 * 判断触发事件的节点是否某指定类型的标签或包含在标签内
 * @param e 触发事件
 * @param diffTagName 指定的标签名（小写）
 */
export declare function checkWrappedByTag(e: MouseEvent, diffTagName: string): boolean;
declare const _default: {
    add: typeof addEvent;
    remove: typeof removeEvent;
    checkWrappedBy: typeof checkWrappedBy;
    checkWrappedByTag: typeof checkWrappedByTag;
};
export default _default;
