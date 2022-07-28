/**
 * 获取window的宽度
 */
export function getWindowWidth() {
    return window.innerWidth ? window.innerWidth : document.documentElement.offsetWidth;
}

/**
 * 获取window的高度
 */
export function getWindowHeight() {
    return window.innerHeight ? window.innerHeight : document.documentElement.offsetHeight;
}

/**
 * 获取window的滚动高度
 */
export function getWindowScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

/**
 * 获取浏览器滚动条的宽度
 */
export function getScrollBarWidth(): number {
    if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight)) {
        const oDiv = document.createElement('div');
        oDiv.style.cssText = 'position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;';
        const noScroll = document.body.appendChild(oDiv).clientWidth;
        oDiv.style.overflowY = 'scroll';
        const scroll = oDiv.clientWidth;
        document.body.removeChild(oDiv);
        return noScroll - scroll;
    } else {
        return 0;
    }
}

/**
 * 触发 window scroll 事件
 */
export function dispatchWindowScroll() {
    window.scrollTo(window.pageXOffset, window.pageYOffset - 1);
    window.scrollTo(window.pageXOffset, window.pageYOffset + 1);
}

/**
 * 触发 window resize 事件
 */
export function dispatchWindowResize() {
    if (typeof (Event) === 'function') {
        // modern browsers
        window.dispatchEvent(new Event('resize'));
    } else {
        // for IE and other old browsers
        // causes deprecation warning on modern browsers
        var evt = window.document.createEvent('UIEvents');
        // @ts-ignore
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
    }
}

export default {
    getWindowWidth,
    getWindowHeight,
    getWindowScrollTop,
    getScrollBarWidth,
    dispatchWindowScroll,
    dispatchWindowResize
};
