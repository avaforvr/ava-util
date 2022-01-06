import { generatePath } from '../src/request';

describe('test request.ts', () => {
    it('Check updateUrl', () => {
        expect(generatePath('/fr?a=a#b', { a: 'aaa' })).toBe('/fr?a=aaa#b');
        expect(generatePath('/fr#b?a=a', { a: 'aaa' })).toBe('/fr?a=aaa#b');
        expect(generatePath('/fr', { a: 'aaa' })).toBe('/fr?a=aaa');
        expect(generatePath('/fr#b', { a: 'aaa' })).toBe('/fr?a=aaa#b');
        expect(generatePath('/list/:id', { id: 'dress' })).toBe('/list/dress');
        expect(generatePath(
            '/list/:id?a=123&b[]=1&b[]=2',
            { id: 'dress' },
            {
                c: 11,
                d: [3, 4]
            })).toBe('/list/dress?a=123&b[]=1&b[]=2&c=11&d[]=3&d[]=4');

        expect(generatePath(
            '/list/?a=123&b[]=1&b[]=2',
            { id: 'dress' },
            {
                c: 11,
                d: [3, 4]
            })).toBe('/list/?a=123&b[]=1&b[]=2&id=dress');

        expect(generatePath(
            '?a=123&b[]=1&b[]=2',
            { id: 'dress' }
        )).toBe('?a=123&b[]=1&b[]=2&id=dress');

        expect(generatePath(
            { id: 'dress' },
            {
                c: 11,
                d: [3, 4]
            })).toBe('/?id=dress');
        expect(generatePath(
            {
                c: 11,
                d: [3, 4]
            })).toBe('/?c=11&d[]=3&d[]=4');
    });
});
