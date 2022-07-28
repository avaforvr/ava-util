"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CLIENT_KEYS = [
    'isPhone',
    'isTablet',
    'isMobile',
    'isIOS',
    'isAndroid',
    'isChrome',
    'isSafari',
    'isEdge',
    'isFirefox',
    'isOpera'
];
var CLIENT_REGS = {
    isPhone: /(iPhone|iPod|Android|BlackBerry|SymbianOS|Windows Phone|ZuneWP7|webOS)/i,
    isTablet: /iPad/i,
    isMobile: /(iPad|iPhone|iPod|Android|ios|Windows Phone)/i,
    isIOS: /(iPhone|iPad|iPod|iOS)/i,
    isAndroid: /Android/i,
    isSafari: /Version\/([\d.]+).*Safari/i,
    isChrome: /(Chrome\/([\d.]+))|(((iPhone|iPad|iPod|iOS)).*CriOS)/i,
    isFirefox: /Firefox/,
    isOpera: /OPR/,
    isEdge: /Edge/
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
exports.default = uaUtils;
