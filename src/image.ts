/**
 * 加载图片
 * @param url 图片 url
 */
export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function() {
            img.onload = null;
            resolve(img);
        };
        img.onerror = function() {
            img.onerror = null;
            reject(url);
        };
        img.src = url;
    });
}
