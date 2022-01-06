var CLIENT_KEYS = ['isPhone', 'isTablet', 'isMobile', 'isIOS', 'isAndroid'];
var CLIENT_REGS = {
    isPhone: /(iPhone|iPod|Android|BlackBerry|SymbianOS|Windows Phone|ZuneWP7|webOS)/i,
    isTablet: /iPad/i,
    isMobile: /(iPad|iPhone|iPod|Android|ios|Windows Phone)/i,
    isIOS: /(iPhone|iPad|iPod|iOS)/i,
    isAndroid: /Android/i,
};
var uaUtils = Object.create(null);
/**
 * isXxx 接口
 * @param userAgent user-agent
 */
CLIENT_KEYS.forEach(function (key) {
    /**
     * 根据 userAgent 判断设备类型
     * @param userAgent user-agent
     */
    uaUtils[key] = function (userAgent) {
        if (!userAgent) {
            userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
        }
        return CLIENT_REGS[key].test(userAgent);
    };
});
/**
 * 解析 userAgent
 * @param userAgent user-agent
 */
uaUtils.parse = function (userAgent) {
    var obj = Object.create(null);
    Object.keys(CLIENT_REGS).forEach(function (key) {
        obj[key] = CLIENT_REGS[key].test(userAgent);
    });
    return obj;
};
/**
 * 获取 App 版本号
 * @param userAgent user-agent
 */
uaUtils.getAppVersion = function (userAgent) {
    var pattern = /(lq-App)\s([\S]*?)\s([0-9]+?\.[0-9]+?\.[0-9]+)[\s]*/;
    var matches = userAgent.match(pattern);
    if (matches && matches.length > 0) {
        return matches[3] ? matches[3] : '';
    }
    return '';
};
export default uaUtils;
