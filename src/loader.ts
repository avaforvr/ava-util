interface LoadScriptOptions {
    id?: string;
    async?: boolean;
    checkLoad?: () => boolean;
    checkInterval?: number;
    checkTimeout?: number;
}

/**
 * 加载js文件
 * @param src
 * @param options 配置
 */
export function loadScript(src: string, options?: LoadScriptOptions): Promise<any> {
    return new Promise((resolve, reject) => {
        options = options || {};
        // 判断是否已经加载，推荐使用 checkLoad
        const checkLoad = options.checkLoad;
        if (checkLoad && checkLoad()) {
            resolve('Script has been exist.');
        }
        // 创建script对象
        const container = document.getElementsByTagName('head')[0];
        const script = <HTMLScriptElement>document.createElement('script');
        script.src = src;
        if (options.id) {
            script.id = options.id;
        }
        if (options.async) {
            script.async = options.async;
        }

        // 加载失败
        script.onerror = (err) => {
            reject(err);
        };

        // 加载成功（根据网上资料，onload 存在兼容性问题，未验证，建议使用checkLoad）
        if (!checkLoad) {
            script.onload = function() {
                resolve('Loaded.');
            };
        } else {
            const interval = options.checkInterval || 200;
            const timeout = options.checkTimeout || 60000;
            const maxTimes = timeout / interval;
            let count = 0;

            var check = () => {
                if (checkLoad()) {
                    resolve('Loaded.');
                } else if (count < maxTimes) {
                    count++;
                    setTimeout(check, interval);
                } else {
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
