import { setCookie, getCookie } from '../src/cookie';

describe('test cookie.js', () => {
    test('setCookie', () => {
        // 正确定情况
        expect(setCookie('a', 'aaa')).toBeTruthy();
        expect(setCookie('b', 111, -1)).toBeTruthy();
        expect(setCookie('c', 222, {
            expires: 1,
            samesite: 'Lax',
            secure: false
        })).toBeTruthy();
        expect(setCookie('d', 'ddd', {
            samesite: 'none'
        })).toBeTruthy();

        // 错误的情况
        expect(setCookie('', 'abc')).toBeFalsy();
        expect(() => {
            setCookie('z', 'zzz', {
                samesite: 'wrongValue'
            });
        }).toThrowError(new TypeError('The value of SameSite can only be "Strict", "Lax" or "None"'));

        expect(getCookie('a')).toBe('aaa');
        expect(getCookie('b')).toBe(void 0);
        expect(getCookie('c')).toBe('222');
    });
});
