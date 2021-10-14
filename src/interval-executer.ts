interface ExecuterType {
    start: () => void;
    stop: () => void;
}

const requestAnimFrame = (function() {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || (window as any).mozRequestAnimationFrame || (window as any).oRequestAnimationFrame || (window as any).msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60, (new Date()).getTime());
    };
})();
const cancelAnimFrame = (function() {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || (window as any).mozCancelAnimationFrame || function(id) {
        clearTimeout(id);
    };
}());

/**
 * 生成控制器（excuter）的函数工厂，返回可以控制开关的周期运行对象
 * @param callback 回调
 * @param interval 周期
 */
function intervalExecuter(callback: () => void | boolean, interval: number): ExecuterType {
    if (typeof window === 'undefined') {
        return null;
    }
    let requestId = null;
    let record = 0;
    interval = interval || 16.667;

    const step = function(timestamp) {
        const past = timestamp - record;
        let toContinue = true;
        if (past >= interval) {
            toContinue = callback() !== false;
            record = timestamp;
        }
        requestId = toContinue ? requestAnimFrame(step) : null;
    };

    return {
        start: () => {
            if (requestId === null) {
                requestId = requestAnimFrame(step);
            }
        },
        stop: () => {
            cancelAnimFrame(requestId);
            requestId = null;
        }
    };
}

export default intervalExecuter;
