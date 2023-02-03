import {
    isJson,
    getDataType,
    clone,
    merge,
    parseJson,
    jsonToCamel,
    jsonToUnder,
    isEmpty,
    filterFields
} from '../src/data';

const TYPES = {
    number: 123,
    string: 'abcd',
    boolean: true,
    undefined: undefined,
    null: null,
    array: ['abcd'],
    json: { abc: 'abcd' }
};

const camelObj = {
    aA: 1,
    bB: [
        {
            cC: {
                dD: 1
            }
        }
    ]
};

const underObj = {
    a_a: 1,
    b_b: [
        {
            c_c: {
                d_d: 1
            }
        }
    ]
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
                    const origin = TYPES[type];
                    const cloned = clone(origin);
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
                    if (Object.prototype.hasOwnProperty.call(TYPES.json, key)) {
                        expected.g[key] = TYPES.json[key];
                    }
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

    describe('parseJson', () => {
        const wrongTypes = {
            boolean: true,
            undefined: undefined,
            null: null,
            array: ['abcd'],
            number: 123
        };

        it('Check Json object', () => {
            expect(parseJson({ abc: 'abcd' })).toStrictEqual({ abc: 'abcd' });
        });
        it('Check valid string', () => {
            expect(parseJson('{"abc":"abcd"}')).toStrictEqual({ abc: 'abcd' });
        });
        it('Check invalid string', () => {
            expect(() => {
                parseJson('{abc:"abcd"}');
            }).toThrowError('Illegal json format: {abc:"abcd"}');
        });

        Object.keys(wrongTypes).forEach((type) => {
            const val = wrongTypes[type];
            it(val + ' should throw TypeError', () => {
                expect(() => {
                    parseJson(val);
                }).toThrowError(new TypeError(`Parameter can only be string or json: ${val}`));
            });
        });
    });

    describe('test json.ts', () => {
        it('Check jsonToCamel', () => {
            expect(jsonToCamel(underObj)).toStrictEqual(camelObj);
        });

        it('Check jsonToUnder', () => {
            expect(jsonToUnder(camelObj)).toStrictEqual(underObj);
        });
    });

    describe('isEmpty', () => {
        const emptyList = [
            null,
            undefined,
            '',
            [],
            {}
        ];
        const notEmptyList = [
            'a',
            ['a'],
            { a: 1 }
        ];

        emptyList.forEach(item => {
            it(String(item) + ' should return true', () => {
                expect(isEmpty(item)).toBe(true);
            });
        });

        notEmptyList.forEach(item => {
            it(String(item) + ' should return false', () => {
                expect(isEmpty(item)).toBe(false);
            });
        });
    });

    describe('filterFields', () => {
        const data = {
            countryList: [
                {
                    countryCode: 'US',
                    countryId: 3859,
                    countryName: 'United States'
                },
                { countryCode: 'CA', countryId: 3844, countryName: 'Canada' }
            ],
            currencyList: [
                {
                    currency: 'USD',
                    currencyIcon: '',
                    currencyId: 1,
                    currencyLocalSymbol: '$',
                    currencySymbol: 'US$'
                },
                {
                    currency: 'CAD',
                    currencyIcon: '',
                    currencyId: 3,
                    currencyLocalSymbol: '$',
                    currencySymbol: 'CA$'
                }
            ],
            languageList: [{ code: 'en', languageId: 1, name: 'English' }],
            testJson: {
                a: 1,
                b: {
                    c1: 111,
                    c2: 222
                }
            },
            testArray: {
                a: 1,
                b: [
                    [
                        { c1: 11, c2: 1111 },
                        { d1: 22, c2: 2222 }
                    ]
                ]
            }
        };

        const rules = {
            keepFields: ['countryList', 'currencyList', 'testJson', 'testArray'],
            currencyList: {
                exludeFields: ['currencyIcon', 'currencyId']
            },
            testJson: {
                b: ['c1']
            },
            testArray: {
                b: ['c1', 'd1']
            }
        };

        it('filterFields ', () => {
            expect(filterFields(data, rules)).toEqual({
                countryList: [
                    {
                        countryCode: 'US',
                        countryId: 3859,
                        countryName: 'United States'
                    },
                    {
                        countryCode: 'CA',
                        countryId: 3844,
                        countryName: 'Canada'
                    }
                ],
                currencyList: [
                    {
                        currency: 'USD',
                        currencyLocalSymbol: '$',
                        currencySymbol: 'US$'
                    },
                    {
                        currency: 'CAD',
                        currencyLocalSymbol: '$',
                        currencySymbol: 'CA$'
                    }
                ],
                testJson: {
                    a: 1,
                    b: {
                        c1: 111
                    }
                },
                testArray: {
                    a: 1,
                    b: [
                        [
                            {
                                c1: 11
                            },
                            {
                                d1: 22
                            }
                        ]
                    ]
                }
            });
        });
    });
});
