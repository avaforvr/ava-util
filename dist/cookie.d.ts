/**
 * 设置和获取cookie
 * @author yywang1
 */
interface CookieOption {
    expires?: number;
    samesite?: string;
    secure?: boolean;
}
/**
 * Set a cookie in browser.
 * @param {string} name - Cookie's name.
 * @param {number | string} value - Cookie's value.
 * @param {number | CookieOption} options - Cookie's expires or other options.
 */
export declare function setCookie(name: string, value: number | string, options?: number | CookieOption): boolean;
/**
 * Get cookie's value in brower.
 * @param {string} name - Cookie's name.
 */
export declare function getCookie(name: string): string | undefined;
declare const _default: {
    set: typeof setCookie;
    get: typeof getCookie;
};
export default _default;
