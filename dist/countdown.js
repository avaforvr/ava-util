"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCountdown = exports.initCountdown = void 0;
var interval_executer_1 = require("./interval-executer");
var state = {
    nowTime: 0,
    items: [],
    startTime: 0,
    startLocTime: 0 // 记录本地开始的时间
};
var defaultItemConfig;
/**
 * 个位数前面加 0
 * @param num 数值
 */
var add0 = function (num) {
    return (num < 10 ? '0' : '') + num;
};
/**
 * 获取天、时、分、秒的文案
 * @param num 天、时、分、秒数值
 * @param arr 单复数文案数组
 */
var getText = function (num, arr) {
    return arr[num > 1 ? 1 : 0];
};
/**
 * 获取 render 方法需要的参数
 * @param time 时长
 * @param item 单个倒计时的配置
 */
var getRenderParam = function (time, item) {
    var day = Math.floor(time / (24 * 60 * 60));
    time = time - day * 24 * 60 * 60;
    var hour = Math.floor(time / (60 * 60));
    time = time - hour * 60 * 60;
    var minute = Math.floor(time / 60);
    var second = time - minute * 60;
    if (!item.isShowDay && day > 0) {
        hour = day * 24 + hour;
        day = 0;
    }
    var dayText = getText(day, item.dayText);
    var hourText = getText(hour, item.hourText);
    var minuteText = getText(minute, item.minuteText);
    var secondText = getText(second, item.secondText);
    return {
        day: day + '',
        hour: add0(hour),
        minute: add0(minute),
        second: add0(second),
        dayText: dayText,
        hourText: hourText,
        minuteText: minuteText,
        secondText: secondText
    };
};
/**
 * 更新单个倒计时
 * @param config 单个倒计时的配置
 */
var runItem = function (config) {
    var item = Object.assign({}, defaultItemConfig, config);
    var endTime = item.endTime, container = item.container;
    if (!document.body.contains(container)) {
        return false;
    }
    var time = endTime - state.nowTime;
    if (time < 0) {
        if (item.endRender) {
            var rendered = item.endRender(container);
            if (typeof rendered === 'string' && rendered.trim().length > 0) {
                container.innerHTML = rendered;
            }
        }
        return false;
    }
    else {
        container.innerHTML = item.render(getRenderParam(time, item));
        return true;
    }
};
/**
 * 更新所有倒计时
 */
var run = function () {
    // 初始化之前不执行
    if (state.nowTime <= 0) {
        return false;
    }
    var currentTime = Math.floor(Date.now() / 1000);
    state.nowTime = state.startTime + (currentTime - state.startLocTime);
    // 遍历items
    state.items = state.items.filter(function (item) { return runItem(item); });
    // items 清空后停止循环
    return state.items.length > 0;
};
var executer = interval_executer_1.default(run, 1000);
// 设置当前时间戳
exports.initCountdown = function (nowTime, textConfig) {
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
    defaultItemConfig = __assign({ endTime: 0, isShowDay: false, render: function (o) { return o.hour + ":" + o.minute + ":" + o.second; } }, textConfig);
};
exports.addCountdown = function (container, config) {
    if (config.endTime > 0) {
        var items = state.items;
        // 判断 container 是否已经在列表中
        for (var i = 0; i < items.length; i++) {
            if (items[i].container === container) {
                return;
            }
        }
        state.items.push(__assign({ container: container }, config));
        executer.start();
    }
};
