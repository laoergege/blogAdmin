/**
 * 判断设备类型
 */
export function getDeviceType() {
    let type = {
        mobile: 0,
        tablet: 1,
        desktop: 2
    };

    let device_width = window.innerWidth;

    if (device_width >= 993) {
        return type.desktop
    } else if (device_width >= 576) {
        return type.tablet;
    } else {
        return type.mobile;
    }
}

/**
 * 
 * @param {*} params 
 */
export function handleResize(event, context) {
    const type = getDeviceType();

    if (type == 2) {
        context.toggleDrawer(true);
    } else {

    }
}

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import "rxjs/add/operator/debounceTime";

/**
 * 利用rxjs， 进行节流 
 * @param {Element} target Element对象
 * @param {String} event 事件名称
 * @param {Number} time 节流时间
 * @param {Function} fun 回调函数
 */
export function debounceTime(target, event, time, fun) {
    return Observable.fromEvent(target, event)
        .debounceTime(time)
        .subscribe(fun)
}