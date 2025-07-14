/**
 * 设置和获取cookie
 * @author yywang1
 */

interface CookieOption {
    expires?: number; // 距离当前的有效天数
    samesite?: string; // SameSite属性
    secure?: boolean; // Secure属性
}

/**
 * Get domain for cookie.
 * @ignore
 */

/* istanbul ignore next */
function getDomain(): string {
    const domain = window.location.host;
    if (/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}$/.test(domain)) {
        // 一级域名直接返回
        return domain;
    } else if (/^www\./.test(domain) && /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}){2,}$/.test(domain)) {
        // 二级域名去掉倒数第二个点前面的部分
        return domain.replace(/^(.*)(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})$/, '$2');
    }
    return domain.replace(/:.*/, '');
}

/**
 * Set a cookie in browser.
 * @param {string} name - Cookie's name.
 * @param {number | string} value - Cookie's value.
 * @param {number | CookieOption} options - Cookie's expires or other options.
 */
export function setCookie(name: string, value: number | string, options: number | CookieOption = {}): boolean {
    if (name.length === 0) {
        return false;
    }
    let expires: number = 365;
    let samesite: string = 'lax';
    let secure: boolean = false;

    if (typeof options === 'number') {
        expires = options;
    } else {
        if (options.expires !== void 0) {
            expires = options.expires;
        }
        if (options.samesite) {
            if (['Strict', 'Lax', 'None', 'strict', 'lax', 'none'].indexOf(options.samesite) !== -1) {
                samesite = options.samesite;
            } else {
                throw new TypeError('The value of SameSite can only be "Strict", "Lax" or "None"');
            }
        }

        // SameSite 为 None 时，必须加 Secure 属性
        if (samesite.toLowerCase() === 'none') {
            secure = true;
        } else if (options.secure !== void 0) {
            secure = options.secure;
        }
    }

    let cookie = name + '=' + encodeURIComponent(value + '');
    cookie += ';path=/';

    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (expires * 24 * 3600 * 1000));
    const expiresTrans = expiresDate.toUTCString();
    cookie += ';expires=' + expiresTrans;

    const domain = getDomain();

    /* istanbul ignore if */
    if (domain !== '') {
        cookie += ';domain=' + getDomain();
    }

    cookie += ';samesite=' + samesite;

    if (secure) {
        cookie += ';secure';
    }
    /* istanbul ignore next */
    try {
        document.cookie = cookie;
        return true;
    } catch (err) {
        console.log('cookie is disabled');
        return false;
    }
}

/**
 * Get cookie's value in brower.
 * @param {string} name - Cookie's name.
 */
export function getCookie(name: string): string | undefined {
    let cookies: string = '';
    let cookie: string | undefined = void 0;
    try {
        cookies = document.cookie;
    } catch (err) {
        /* istanbul ignore next */
        console.log('cookie is disabled');
    }
    /* istanbul ignore else */
    if (cookies.length > 0) {
        let begin = cookies.indexOf(name + '=');
        /* istanbul ignore else */
        if (begin !== -1) {
            begin += name.length + 1;
            const end = cookies.indexOf(';', begin) === -1 ? cookies.length : cookies.indexOf(';', begin);
            cookie = decodeURIComponent(cookies.substring(begin, end));
        }
    }
    return cookie;
}

/**
 * Delete cookie
 * @param {string} name - Cookie's name.
 */
export function delCookie(name: string): void {
    setCookie(name, '', -1);
}

export default {
    set: setCookie,
    get: getCookie,
    del: delCookie
};
