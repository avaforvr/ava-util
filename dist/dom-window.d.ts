/**
 * 获取window的宽度
 */
export declare function getWindowWidth(): number;
/**
 * 获取window的高度
 */
export declare function getWindowHeight(): number;
/**
 * 获取window的滚动高度
 */
export declare function getWindowScrollTop(): number;
/**
 * 获取浏览器滚动条的宽度
 */
export declare function getScrollBarWidth(): number;
/**
 * 触发 window scroll 事件
 */
export declare function dispatchWindowScroll(): void;
/**
 * 触发 window resize 事件
 */
export declare function dispatchWindowResize(): void;
/**
 * window.onload 的 Promise 封装
 */
export declare function windowLoad(): Promise<void>;
declare const _default: {
    getWindowWidth: typeof getWindowWidth;
    getWindowHeight: typeof getWindowHeight;
    getWindowScrollTop: typeof getWindowScrollTop;
    getScrollBarWidth: typeof getScrollBarWidth;
    dispatchWindowScroll: typeof dispatchWindowScroll;
    dispatchWindowResize: typeof dispatchWindowResize;
    windowLoad: typeof windowLoad;
};
export default _default;
