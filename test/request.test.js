import { updateUrl } from '../src/request';

describe('test request.ts', () => {
    it('Check updateUrl', () => {
        expect(updateUrl({ a: 'aaa' }, 'http://localhost:3000/fr?a=a#b')).toBe('http://localhost:3000/fr?a=aaa#b');
        expect(updateUrl({ a: 'aaa' }, '/fr?a=a#b')).toBe('/fr?a=aaa#b');
        expect(updateUrl({ a: 'aaa' }, '/fr#b?a=a')).toBe('/fr?a=aaa#b');
        expect(updateUrl({ a: 'aaa' }, '/fr')).toBe('/fr?a=aaa');
        expect(updateUrl({ a: 'aaa' }, '/fr#b')).toBe('/fr?a=aaa#b');
    });
});
