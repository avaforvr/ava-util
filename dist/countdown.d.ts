export interface RenderParamType {
    day: string;
    hour: string;
    minute: string;
    second: string;
    dayText: string;
    hourText: string;
    minuteText: string;
    secondText: string;
}
interface TextConfigType {
    dayText: [string, string];
    hourText: [string, string];
    minuteText: [string, string];
    secondText: [string, string];
}
export interface ItemConfigType extends Partial<TextConfigType> {
    endTime: number;
    isShowDay?: boolean;
    render?: (o: RenderParamType) => string;
    endRender?: (container: HTMLDivElement) => any;
}
export declare const initCountdown: (nowTime: number, textConfig: TextConfigType) => void;
export declare const addCountdown: (container: HTMLDivElement, config: ItemConfigType) => void;
export {};
