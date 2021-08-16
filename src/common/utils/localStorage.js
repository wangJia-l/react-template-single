/**
 * 删除缓存Key
 * @param {String} key 缓存的Key
 */
export const removeItem = key => {
    try {
        window.localStorage.removeItem(key);
    }
    catch (error) {
        // console.log(error);
    }
};

/**
 * 获取缓存对象
 * @param {String} key 缓存的Key
 * @return {Object} 值
 */
export const getItem = (key, initialValue) => {
    initialValue = initialValue || '';
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            const current = new Date().getTime();
            const result = JSON.parse(item);
            // 判断是否过期，已过期
            if (result.expired > 0 && result.expired < current) {
                removeItem(key);
                return initialValue;
            }
        }
        // console.log('从LocalStorage中获取::', key, item);
        return item ? JSON.parse(item).value : initialValue;
    }
    catch (error) {
        // console.log(error);
        return initialValue;
    }
};

/**
 * 设置缓存对象
 * @param {String} key 缓存的Key
 * @param {Number} timeout 缓存的过期失效，单位：秒
 */
export const setItem = (key, value, timeout = 0) => {
    try {
        const current = new Date().getTime() + timeout * 1000;
        const item = {
            expired: timeout > 0 ? current : -1,
            value,
        };
        window.localStorage.setItem(key, JSON.stringify(item));
    }
    catch (error) {
        // console.log(error);
    }
};
