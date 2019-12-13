import { isJson } from '../src/data';

describe('test data.js', () => {
    test('isJson', () => {
        expect(isJson(1)).toBe(false);
    });
});
