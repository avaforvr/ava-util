var requestAnimFrame = (function () {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        return window.setTimeout(callback, 1000 / 60, (new Date()).getTime());
    };
})();
var cancelAnimFrame = (function () {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (id) {
        clearTimeout(id);
    };
}());
/**
 * 生成控制器（excuter）的函数工厂，返回可以控制开关的周期运行对象
 * @param callback 回调
 * @param interval 周期
 */
function intervalExecuter(callback, interval) {
    if (typeof window === 'undefined') {
        return null;
    }
    var requestId = null;
    var record = 0;
    interval = interval || 16.667;
    var step = function (timestamp) {
        var past = timestamp - record;
        var toContinue = true;
        if (past >= interval) {
            toContinue = callback() !== false;
            record = timestamp;
        }
        requestId = toContinue ? requestAnimFrame(step) : null;
    };
    return {
        start: function () {
            if (requestId === null) {
                requestId = requestAnimFrame(step);
            }
        },
        stop: function () {
            cancelAnimFrame(requestId);
            requestId = null;
        }
    };
}
export default intervalExecuter;
