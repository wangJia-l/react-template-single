/**
 * @file Utils Index
 */
import * as localStorage from './localStorage';

export const LocalStorage = localStorage;

export const downloadFile = (downUrl, fileName) => {
    const aLinkUrl = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    aLinkUrl.href = downUrl;
    aLinkUrl.download = fileName;
    const clickAlink = obj => { // 模拟点击
        const ev = document.createEvent('MouseEvents');
        ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        obj.dispatchEvent(ev);
    };
    clickAlink(aLinkUrl);
};

export const getUrlByENV   = () => {
    let APP_URL_PREFIX = 'http://180.76.60.136:9003';

    switch (process.env.PLATFORM) {
        case 'online':
            APP_URL_PREFIX = 'http://13.99.25.56:9003';
            break;
        case 'preonline':
            APP_URL_PREFIX = 'http://180.76.60.136:9003';
            break;
    }

    return APP_URL_PREFIX;
};
