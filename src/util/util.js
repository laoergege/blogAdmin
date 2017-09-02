import config from "../config";

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

/**
 * 检测图片
 * @param {*} file 
 */
export function testImg(file) {

    if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
        alert("请上传图片类型必须是.gif,jpeg,jpg,png中的一种");
        return false;
    } else if (file.size > config.uploadSize * 1024 * 1024) {
        alert(`请上传小于 ${config.uploadSize} M 的图片`);
        return false;
    }
    return true;
}

/**
 * 获取 当前list组件是哪个 文集
 * @param {*} state 
 */
export const current_book = state => {
    let book ;
    for(let {_id, bookname} of state.markbooks){
        if(state.list_title == bookname){
            book = _id;
        }
    };
    return book;
}