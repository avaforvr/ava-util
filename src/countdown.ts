import intervalExecuter from './interval-executer';

export interface RenderParamType {
    day: string;
    hour: string;
    minute: string;
    second: string;
    dayText: string
    hourText: string
    minuteText: string
    secondText: string
}

interface TextConfigType {
    dayText: [string, string];
    hourText: [string, string];
    minuteText: [string, string];
    secondText: [string, string];
}

export interface ItemConfigType extends TextConfigType {
    endTime: number;
    isShowDay?: boolean;
    render?: (o: RenderParamType) => string;
    endRender?: (container: HTMLDivElement) => any;
}

interface ItemType extends ItemConfigType {
    container: HTMLDivElement
}

interface StateType {
    nowTime: number;
    items: ItemType[];
    startTime: number;
    startLocTime: number;
}

const state: StateType = {
    nowTime: 0,
    items: [],
    startTime: 0, // 从服务获取的开始时间
    startLocTime: 0 // 记录本地开始的时间
};

let defaultItemConfig: ItemConfigType;

/**
 * 个位数前面加 0
 * @param num 数值
 */
const add0 = (num: number): string => {
    return (num < 10 ? '0' : '') + num;
};

/**
 * 获取天、时、分、秒的文案
 * @param num 天、时、分、秒数值
 * @param arr 单复数文案数组
 */
const getText = (num: number, arr: string[]): string => {
    return arr[num > 1 ? 1 : 0];
};

/**
 * 获取 render 方法需要的参数
 * @param time 时长
 * @param item 单个倒计时的配置
 */
const getRenderParam = (time:number, item: ItemType): RenderParamType => {
    let day = Math.floor(time / (24 * 60 * 60));
    time = time - day * 24 * 60 * 60;
    let hour = Math.floor(time / (60 * 60));
    time = time - hour * 60 * 60;
    const minute = Math.floor(time / 60);
    const second = time - minute * 60;
    if (!item.isShowDay && day > 0) {
        hour = day * 24 + hour;
        day = 0;
    }

    const dayText = getText(day, item.dayText);
    const hourText = getText(hour, item.hourText);
    const minuteText = getText(minute, item.minuteText);
    const secondText = getText(second, item.secondText);

    return {
        day: day + '',
        hour: add0(hour),
        minute: add0(minute),
        second: add0(second),
        dayText,
        hourText,
        minuteText,
        secondText
    };
};

/**
 * 更新单个倒计时
 * @param config 单个倒计时的配置
 */
const runItem = (config: ItemType): boolean => {
    const item = Object.assign({}, defaultItemConfig, config);
    const { endTime, container } = item;
    if (!document.body.contains(container)) {
        return false;
    }
    const time = endTime - state.nowTime;
    if (time < 0) {
        if (item.endRender) {
            const rendered = item.endRender(container);
            if (typeof rendered === 'string' && rendered.trim().length > 0) {
                container.innerHTML = rendered;
            }
        }
        return false;
    } else {
        container.innerHTML = item.render(getRenderParam(time, item));
        return true;
    }
};

/**
 * 更新所有倒计时
 */
const run = (): boolean => {
    // 初始化之前不执行
    if (state.nowTime <= 0) {
        return false;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    state.nowTime = state.startTime + (currentTime - state.startLocTime);

    // 遍历items
    state.items = state.items.filter((item) => runItem(item));
    // items 清空后停止循环
    return state.items.length > 0;
};

const executer = intervalExecuter(run, 1000);

// 设置当前时间戳
export const initCountdown = (nowTime: number, textConfig: TextConfigType): void => {
    // 初始化仅执行一次
    if (state.nowTime > 0 || nowTime <= 0) {
        return;
    }
    state.nowTime = nowTime;
    state.startTime = nowTime;
    state.startLocTime = Math.floor(Date.now() / 1000);
    if (state.items.length > 0) {
        executer.start();
    }

    defaultItemConfig = {
        endTime: 0,
        isShowDay: false,
        render: (o: RenderParamType) => `${o.hour}:${o.minute}:${o.second}`,
        ...textConfig
    };
};

export const addCountdown = (container: HTMLDivElement, config: ItemConfigType): void => {
    if (config.endTime > 0) {
        const items = state.items;
        // 判断 container 是否已经在列表中
        for (let i = 0; i < items.length; i++) {
            if (items[i].container === container) {
                return;
            }
        }
        state.items.push({ container, ...config });
        executer.start();
    }
};
