"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImage = void 0;
/**
 * 加载图片
 * @param url 图片 url
 */
function loadImage(url) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            resolve(img);
        };
        img.onerror = function () {
            img.onerror = null;
            reject(url);
        };
        img.src = url;
    });
}
exports.loadImage = loadImage;
