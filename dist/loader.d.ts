interface LoadScriptOptions {
    id?: string;
    async?: boolean;
    checkLoad?: () => boolean;
    checkInterval?: number;
    checkTimeout?: number;
}
/**
 * 加载js文件
 * @param src
 * @param options 配置
 */
export declare function loadScript(src: string, options?: LoadScriptOptions): Promise<any>;
declare const _default: {
    loadScript: typeof loadScript;
};
export default _default;
