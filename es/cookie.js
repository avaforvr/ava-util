/**
 * 设置和获取cookie
 * @author yywang1
 */
/**
 * Get domain for cookie.
 * @ignore
 */
/* istanbul ignore next */
function getDomain() {
    const domain = window.location.host;
    if (/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}$/.test(domain)) {
        // 一级域名直接返回
        return domain;
    }
    else if (/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}){2,}$/.test(domain)) {
        // 二级域名去掉第一个点前面的部分
        return domain.replace(/.*?\./, '.');
    }
    else {
        return '';
    }
}
/**
 * Set a cookie in browser.
 * @param {string} name - Cookie's name.
 * @param {number | string} value - Cookie's value.
 * @param {number | CookieOption} options - Cookie's expires or other options.
 */
export function set(name, value, options = {}) {
    if (name.length === 0) {
        return false;
    }
    let expires = 365;
    let samesite = 'lax';
    let secure = false;
    if (typeof options === 'number') {
        expires = options;
    }
    else {
        if (options.expires !== void 0) {
            expires = options.expires;
        }
        if (options.samesite) {
            if (['Strict', 'Lax', 'None', 'strict', 'lax', 'none'].indexOf(options.samesite) !== -1) {
                samesite = options.samesite;
            }
            else {
                throw new TypeError('The value of SameSite can only be "Strict", "Lax" or "None"');
            }
        }
        // SameSite 为 None 时，必须加 Secure 属性
        if (samesite.toLowerCase() === 'none') {
            secure = true;
        }
        else if (options.secure !== void 0) {
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
    }
    catch (e) {
        console.log('cookie is disabled');
        return false;
    }
}
/**
 * Get cookie's value in brower.
 * @param {string} name - Cookie's name.
 */
export function get(name) {
    let cookies = '';
    let cookie = void 0;
    try {
        cookies = document.cookie;
    }
    catch {
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
export default {
    set,
    get
};
