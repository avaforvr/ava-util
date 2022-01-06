/**
 * 加载js文件
 * @param src
 * @param options 配置
 */
export function loadScript(src, options) {
    return new Promise(function (resolve, reject) {
        options = options || {};
        // 判断是否已经加载，推荐使用 checkLoad
        var checkLoad = options.checkLoad;
        if (checkLoad && checkLoad()) {
            resolve('Script has been exist.');
        }
        // 创建script对象
        var container = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.src = src;
        if (options.id) {
            script.id = options.id;
        }
        if (options.async) {
            script.async = options.async;
        }
        // 加载失败
        script.onerror = function (err) {
            reject(err);
        };
        // 加载成功（根据网上资料，onload 存在兼容性问题，未验证，建议使用checkLoad）
        if (!checkLoad) {
            script.onload = function () {
                resolve('Loaded.');
            };
        }
        else {
            var interval_1 = options.checkInterval || 200;
            var timeout = options.checkTimeout || 60000;
            var maxTimes_1 = timeout / interval_1;
            var count_1 = 0;
            var check = function () {
                if (checkLoad()) {
                    resolve('Loaded.');
                }
                else if (count_1 < maxTimes_1) {
                    count_1++;
                    setTimeout(check, interval_1);
                }
                else {
                    reject(new Error('Timeout.'));
                }
            };
            check();
        }
        // 插入标签
        container.appendChild(script);
    });
}
export default {
    loadScript: loadScript
};
