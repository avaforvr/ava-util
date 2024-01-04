import Hls from 'hls.js';

/**
 * 加载视频
 * @param src 视频地址
 * @param config 视频标签属性
 */
export function loadVideo(src: string, config?: HTMLMediaElement): Promise<HTMLVideoElement> {
    return new Promise((resolve, reject) => {
        src = src.replace(/[?#].*$/, '');

        if (!/\.(mp4|webm|m3u8)$/.test(src)) {
            reject(new Error('Website only supports mp4, webm and m3u8 formats.'));
            return;
        }

        const video = document.createElement('video');
        video.autoplay = false;
        video.setAttribute('crossOrigin', 'anonymous');
        const { preload = 'metadata', muted = true } = config || {};
        video.setAttribute('preload', preload);
        if (muted) {
            video.setAttribute('muted', 'muted');
        }
        for (const key in config) {
            video.setAttribute(key, config[key]);
        }

        if (/\.(mp4|webm)$/.test(src) || video.canPlayType('application/vnd.apple.mpegurl')) {
            video.setAttribute('src', src);
        } else if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(src);
            hls.attachMedia(video);
        } else {
            reject(new Error('This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'));
            return;
        }

        video.addEventListener('loadeddata', function() {
            resolve(video);
        });

        video.addEventListener('error', err => {
            reject(err);
        });
    });
}
