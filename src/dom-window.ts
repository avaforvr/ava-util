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

export default {
    getWindowWidth,
    getWindowHeight,
    getWindowScrollTop,
    getScrollBarWidth
};
