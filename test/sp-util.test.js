import spUtil, { schemas } from '../src/sp-util';

function initSnowplow() {
    window.snowplow = (param1, eventOption, commonOption) => {
        if (typeof param1 === 'function') {
            param1();
        } else {
            return {
                commonOption,
                eventOption
            };
        }
    };
}

function clearSnowplow() {
    window.snowplow = null;
}

const emptyCommonData = {
    appCommon: {
        app_version: '',
        device_id: '',
        advertising_id: '',
        uri: '',
        referrer: '',
        is_tablet: '',
        email: '',
        media_source: '',
        test_info: ''
    },
    common: {
        country: '',
        user_unique_id: '0',
        gender: '',
        language: '',
        currency: '',
        page_code: 'sp-util'
    }
};

const commonOption = [
    {
        schema: schemas.common,
        data: spUtil.commonData.common
    },
    {
        schema: schemas.appCommon,
        data: spUtil.commonData.appCommon
    }
];

spUtil.setCommonData({
    common: {
        page_code: 'sp-util'
    }
});
initSnowplow();
spUtil.start();

describe('test sp-util.js', () => {
    describe('setCookie', () => {
        it('Check setCookie without initialization', () => {
            expect(() => {
                spUtil.setCookie('vova');
            }).toThrowError('Please check the initialized project keywords in GTM.');
        });
    });

    describe('setUser and setCommonData', () => {
        it('Check setUser', () => {
            spUtil.setUser({
                email: 'test@i9i8.com',
                userId: '12345',
                gender: '1'
            });
            expect(spUtil.commonData.appCommon.email).toBe('test@i9i8.com');
            expect(spUtil.commonData.common.user_unique_id).toBe('12345');
            spUtil.setUser({});
            expect(spUtil.commonData).toStrictEqual(emptyCommonData);
        });
    });

    describe('test delay', () => {
        it('trackPageView without window.snowplow should return "delay"', () => {
            clearSnowplow();
            expect(spUtil.trackPageView()).toBe('delay');
            initSnowplow();
        });
    });

    describe('trackPageView', () => {
        it('Check trackPageView with show', () => {
            expect(spUtil.trackPageView()).toStrictEqual({
                commonOption,
                eventOption: {
                    schema: schemas.pageView,
                    data: {
                        view_type: 'show'
                    }
                }
            });
        });
        it('Check trackPageView with hide', () => {
            expect(spUtil.trackPageView({
                view_type: 'hide',
                start_time: '1234', // 用字符串测试格式强制转换，正确值应该是number类型
                end_time: 2234
            })).toStrictEqual({
                commonOption,
                eventOption: {
                    schema: schemas.pageView,
                    data: {
                        view_type: 'hide',
                        start_time: 1234,
                        end_time: 2234
                    }
                }
            });
        });
    });

    describe('trackClick', () => {
        it('Check invalid parameters', () => {
            expect(() => {
                spUtil.trackClick({});
            }).toThrowError('Required attribute \'type\' not found');

            expect(() => {
                spUtil.trackClick({
                    type: 'normal',
                    extra: []
                });
            }).toThrowError('Parameter can only be string or json: ');

            expect(() => {
                spUtil.trackClick({
                    type: 'normal',
                    extra: '{someKey: someValue}'
                });
            }).toThrowError('Illegal json format: {someKey: someValue}');
        });
        it('Check normal click', () => {
            expect(spUtil.trackClick({
                type: 'normal'
            })).toStrictEqual({
                commonOption,
                eventOption: {
                    schema: schemas.click,
                    data: {
                        type: 'normal',
                        element_name: '',
                        element_id: '',
                        element_type: '',
                        element_position: 0,
                        extra: {}
                    }
                }
            });
        });
        it('Check goods click', () => {
            expect(spUtil.trackClick({
                type: 'goods',
                element_name: '',
                element_id: '1234',
                element_type: '',
                element_position: 2,
                extra: {}
            })).toStrictEqual({
                commonOption,
                eventOption: {
                    schema: schemas.click,
                    data: {
                        type: 'goods',
                        element_name: '',
                        element_id: '1234',
                        element_type: '',
                        element_position: 2,
                        extra: {
                            brand_id: '',
                            recall_pool: ''
                        }
                    }
                }
            });
        });
    });

    describe('trackImpression', () => {
        it('Check invalid parameters', () => {
            expect(() => {
                spUtil.trackImpression({});
            }).toThrowError('Required attribute \'type\' not found');

            expect(() => {
                spUtil.trackImpression({
                    type: 'normal',
                    extra: []
                });
            }).toThrowError('Parameter can only be string or json: ');

            expect(() => {
                spUtil.trackImpression({
                    type: 'normal',
                    extra: '{someKey: someValue}'
                });
            }).toThrowError('Illegal json format: {someKey: someValue}');

            expect(() => {
                spUtil.trackImpression({
                    type: 'normal',
                    list_type: 'top list',
                    list: [
                        {
                            element_name: 'dress',
                            element_id: 111, // 错误类型
                            element_position: '1', // 错误类型
                            extra: ''
                        }
                    ]
                });
            }).toThrowError('Illegal json format: ');

            expect(() => {
                spUtil.trackImpression({
                    type: 'normal',
                    list: []
                });
            }).toThrowError('Property \'list\' is empty in snowplow trackImpression');
        });
        it('Check normal impression', () => {
            expect(spUtil.trackImpression({
                type: 'normal',
                list_type: 'top list',
                list: [
                    {
                        element_name: 'dress',
                        element_id: 111, // 错误类型
                        element_position: '1' // 错误类型
                    }, {
                        element_name: 'skirt',
                        element_id: '222',
                        element_position: 2,
                        extra: {
                            color: 'White'
                        }
                    }
                ]
            })).toStrictEqual({
                commonOption,
                eventOption: {
                    schema: schemas.impression,
                    data: {
                        type: 'normal',
                        list_type: 'top list',
                        list: [
                            {
                                element_name: 'dress',
                                element_id: '111',
                                element_type: '',
                                element_position: 1,
                                extra: {}
                            }, {
                                element_name: 'skirt',
                                element_id: '222',
                                element_type: '',
                                element_position: 2,
                                extra: {
                                    color: 'White'
                                }
                            }
                        ]
                    }
                }
            });
        });
        it('Check goods impression', () => {
            expect(spUtil.trackImpression({
                type: 'goods',
                list: [
                    {
                        element_name: 'dress',
                        element_id: 111, // 错误类型
                        element_position: '1', // 错误类型
                        extra: {}
                    }, {
                        element_name: 'skirt',
                        element_id: '222',
                        element_type: '',
                        element_position: 2,
                        extra: {
                            brand_id: 'xx',
                            recall_pool: 'xx',
                            color: 'White'
                        }
                    }
                ]
            })).toStrictEqual({
                commonOption,
                eventOption: {
                    schema: schemas.impression,
                    data: {
                        type: 'goods',
                        list_type: '',
                        list: [
                            {
                                element_name: 'dress',
                                element_id: '111',
                                element_type: '',
                                element_position: 1,
                                extra: {
                                    brand_id: '',
                                    recall_pool: ''
                                }
                            }, {
                                element_name: 'skirt',
                                element_id: '222',
                                element_type: '',
                                element_position: 2,
                                extra: {
                                    brand_id: 'xx',
                                    recall_pool: 'xx',
                                    color: 'White'
                                }
                            }
                        ]
                    }
                }
            });
        });
    });

    describe('trackData', () => {
        it('Check invalid parameters', () => {
            expect(() => {
                spUtil.trackData({
                    extra: []
                });
            }).toThrowError('Parameter can only be string or json: ');

            expect(() => {
                spUtil.trackData({
                    extra: '{someKey: someValue}'
                });
            }).toThrowError('Illegal json format: ');
        });

        it('Check success track', () => {
            expect(spUtil.trackData({
                element_name: 'xx',
                extra: {
                    aa: 'aa',
                    bb: 11
                }
            })).toStrictEqual({
                commonOption,
                eventOption: {
                    schema: schemas.data,
                    data: {
                        element_name: 'xx',
                        extra: {
                            aa: 'aa',
                            bb: '11'
                        }
                    }
                }
            });
        });
    });
});
