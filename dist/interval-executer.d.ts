interface ExecuterType {
    start: () => void;
    stop: () => void;
}
/**
 * 生成控制器（excuter）的函数工厂，返回可以控制开关的周期运行对象
 * @param callback 回调
 * @param interval 周期
 */
declare function intervalExecuter(callback: () => void | boolean, interval: number): ExecuterType;
export default intervalExecuter;
