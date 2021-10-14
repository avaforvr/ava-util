"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportWebp = void 0;
/**
 * 判断是否支持webp
 */
function isSupportWebp() {
    var canvas = document.createElement('canvas');
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}
exports.isSupportWebp = isSupportWebp;
exports.default = {
    isSupportWebp: isSupportWebp
};
