/**
 * 判断是否是DOM节点
 * @param obj 待验证对象
 */
export declare function isDomNode(obj: any): boolean;
/**
 * 判断元素是否可见
 * @param obj Dom 元素
 */
export declare function isVisible(obj: HTMLElement): boolean;
/**
 * 判断元素是否在可视区域内
 * @param obj Dom 元素
 */
export declare function isInViewport(obj: HTMLElement): boolean;
/**
 * 判断元素是否在可视区域内完整展示
 * @param obj Dom 元素
 */
export declare function isInViewportCompletely(obj: HTMLElement): boolean;
