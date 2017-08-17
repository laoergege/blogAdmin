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

    if(device_width >= 993){
        return type.desktop
    }else if(device_width >= 576){
        return type.tablet;
    }else{
        return type.mobile;
    }
}

/**
 * 
 * @param {*} params 
 */
export function handleResize(event, context) {
    const type = getDeviceType();
    
    if(type == 2){
        context.toggleDrawer(true);
    }else{
        
    }
}