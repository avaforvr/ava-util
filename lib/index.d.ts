declare const _default: {
    data: {
        isJson: typeof import("./data").isJson;
        getDataType: typeof import("./data").getDataType;
        clone: typeof import("./data").clone;
        merge: typeof import("./data").merge;
    };
    cookie: {
        set: typeof import("./cookie").set;
        get: typeof import("./cookie").get;
    };
};
export default _default;
