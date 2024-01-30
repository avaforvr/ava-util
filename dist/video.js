"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadVideo = void 0;
var hls_js_1 = require("hls.js");
/**
 * 加载视频
 * @param src 视频地址
 * @param config 视频标签属性
 */
function loadVideo(src, config) {
    return new Promise(function (resolve, reject) {
        src = src.replace(/[?#].*$/, '');
        if (!/\.(mp4|webm|m3u8)$/.test(src)) {
            reject(new Error('Website only supports mp4, webm and m3u8 formats.'));
            return;
        }
        var video = document.createElement('video');
        video.autoplay = false;
        video.setAttribute('crossOrigin', 'anonymous');
        var _a = config || {}, _b = _a.preload, preload = _b === void 0 ? 'metadata' : _b, _c = _a.muted, muted = _c === void 0 ? true : _c;
        video.setAttribute('preload', preload);
        if (muted) {
            video.setAttribute('muted', 'muted');
        }
        for (var key in config) {
            video.setAttribute(key, config[key]);
        }
        if (/\.(mp4|webm)$/.test(src) || video.canPlayType('application/vnd.apple.mpegurl')) {
            video.setAttribute('src', src);
        }
        else if (hls_js_1.default.isSupported()) {
            var hls = new hls_js_1.default();
            hls.loadSource(src);
            hls.attachMedia(video);
        }
        else {
            reject(new Error('This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'));
            return;
        }
        video.addEventListener('loadeddata', function () {
            resolve(video);
        });
        video.addEventListener('error', function (err) {
            reject(err);
        });
    });
}
exports.loadVideo = loadVideo;
