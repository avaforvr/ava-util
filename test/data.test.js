import { isJson, getDataType, clone, merge } from '../src/data';

const TYPES = {
    number: 123,
    string: 'abcd',
    boolean: true,
    undefined: undefined,
    null: null,
    array: ['abcd'],
    json: { abc: 'abcd' }
};

describe('test data.js', () => {
    describe('isJson', () => {
        Object.keys(TYPES).forEach((type) => {
            const expected = type === 'json';
            it('isJson(' + type + ') should return ' + expected, () => {
                expect(isJson(TYPES[type])).toBe(expected);
            });
        });
    });

    describe('getDataType', () => {
        Object.keys(TYPES).forEach((type) => {
            it(TYPES[type] + ' should return ' + type, () => {
                expect(getDataType(TYPES[type])).toBe(type);
            });
        });
    });

    describe('clone', () => {
        it('clone array', () => {
            const origin = ['a', ['b', 'c']];
            const cloned = clone(origin);
            origin[1][0] = 123;
            expect(cloned[1][0]).toBe('b');
        });
        it('clone json', () => {
            const origin = {
                a: 'aaa',
                b: {
                    bb: 'bbb'
                }
            };
            const cloned = clone(origin);
            origin.b.bb = 123;
            expect(cloned.b.bb).toBe('bbb');
        });
        it('clone not array and not json', () => {
            Object.keys(TYPES).forEach((type) => {
                if (type !== 'array' && type !== 'json') {
                    let origin = TYPES[type];
                    const cloned = clone(origin);
                    origin = 'whatever';
                    expect(cloned).toBe(TYPES[type]);
                }
            });
        });
    });

    describe('merge', () => {
        let origin;
        let extend = {};
        let merged = {};
        let expected = {};

        // json 对象合并
        origin = {
            a: 123,
            b: 'b',
            c: true,
            d: undefined,
            e: null,
            f: [1, 2, 3],
            g: {
                g1: [1, 2, 3],
                g2: {
                    gg1: 'gg1'
                }
            }
        };
        Object.keys(TYPES).forEach((type) => {
            const typeValue = TYPES[type];
            extend = {};
            Object.keys(origin).forEach(key => {
                extend[key] = typeValue;
            });
            merged = merge({}, origin, extend);

            expected = extend;
            if (type === 'json') {
                expected.g = origin.g;
                for (const key in TYPES.json) {
                    expected.g[key] = TYPES.json[key];
                }
            }

            it('merge json by type: ' + type, () => {
                expect(merged).toEqual(expected);
            });
        });

        // array 合并
        origin = [1, 2, 3];
        extend = [{ a: 'a' }, 4];
        merged = merge(origin, extend);
        expected = [{ a: 'a' }, 4, 3];

        it('merge array', () => {
            expect(merged).toEqual(expected);
        });

        it('merge is deep clone', () => {
            origin = { a: 'a' };
            extend = {
                b: {
                    bb: 'bb'
                }
            };
            merged = merge({}, origin, extend);
            origin.a = 123;
            extend.b.bb = 456;
            expected = {
                a: 'a',
                b: {
                    bb: 'bb'
                }
            };
            expect(merged).toEqual(expected);
        });
    });
});
