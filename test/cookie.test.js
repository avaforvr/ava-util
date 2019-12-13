import { set, get } from '../src/cookie';

describe('test cookie.js', () => {
    test('set', () => {
        // 正确定情况
        expect(set('a', 'aaa')).toBeTruthy();
        expect(set('b', 111, -1)).toBeTruthy();
        expect(set('c', 222, {
            expires: 1,
            samesite: 'Lax',
            secure: false
        })).toBeTruthy();
        expect(set('d', 'ddd', {
            samesite: 'none'
        })).toBeTruthy();

        // 错误的情况
        expect(set('', 'abc')).toBeFalsy();
        expect(() => {
            set('z', 'zzz', {
                samesite: 'wrongValue'
            });
        }).toThrowError(new TypeError('The value of SameSite can only be "Strict", "Lax" or "None"'));

        expect(get('a')).toBe('aaa');
        expect(get('b')).toBe(void 0);
        expect(get('c')).toBe('222');
    });
});
