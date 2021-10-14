/**
 * 判断是否支持webp
 */
export function isSupportWebp() {
    var canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

export default {
    isSupportWebp
};
