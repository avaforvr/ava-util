type UtilFunc = (userAgent?: string) => boolean;

const CLIENT_KEYS: ReadonlyArray<string> = ['isPhone', 'isTablet', 'isMobile', 'isIOS', 'isAndroid'];

type ClientKeyType = typeof CLIENT_KEYS[number];

export type UAParsedMap = Record<ClientKeyType, boolean>

export type UAUtilsType = Record<ClientKeyType, UtilFunc> & {
    parse: (userAgent: string) => UAParsedMap;
    getAppVersion: (userAgent: string) => string;
};

const CLIENT_REGS: Record<ClientKeyType, RegExp> = {
    isPhone: /(iPhone|iPod|Android|BlackBerry|SymbianOS|Windows Phone|ZuneWP7|webOS)/i,
    isTablet: /iPad/i,
    isMobile: /(iPad|iPhone|iPod|Android|ios|Windows Phone)/i,
    isIOS: /(iPhone|iPad|iPod|iOS)/i,
    isAndroid: /Android/i,
};

const uaUtils: UAUtilsType = Object.create(null);

/**
 * isXxx 接口
 * @param userAgent user-agent
 */
CLIENT_KEYS.forEach(key => {
    /**
     * 根据 userAgent 判断设备类型
     * @param userAgent user-agent
     */
    uaUtils[key] = function (userAgent?: string) {
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
uaUtils.parse = (userAgent: string): UAParsedMap => {
    const obj = Object.create(null);
    Object.keys(CLIENT_REGS).forEach(key => {
        obj[key] = CLIENT_REGS[(key as ClientKeyType)].test(userAgent);
    });
    return obj;
};

/**
 * 获取 App 版本号
 * @param userAgent user-agent
 */
uaUtils.getAppVersion = (userAgent: string): string => {
    const pattern = /(lq-App)\s([\S]*?)\s([0-9]+?\.[0-9]+?\.[0-9]+)[\s]*/;
    const matches = userAgent.match(pattern);
    if (matches && matches.length > 0) {
        return matches[3] ? matches[3] : '';
    }
    return '';
};

export default uaUtils;
