import axios from 'axios';
import { Modal } from 'antd';
import { apiBaseURL, loginBaseURL } from 'src/env';
import Loading from 'src/components/Loading';
import { getUrlByENV } from '@/common/utils';
// import queryString from 'query-string';

/**
 * 从 cookie 中获取数据
 * @param {string} cname cname
 */
export const getCookie = cname => {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

const TIMEOUT_MS = 1000 * 10;

// const sessionID = uuidv4();

const http = axios.create({
    headers: {
        'content-type': 'application/json',
    },
    timeout: TIMEOUT_MS,
});

let APP_URL_PREFIX = getUrlByENV();

export const login = () => {
    const origin = process.env.NODE_ENV === 'development' ? window.location.origin : APP_URL_PREFIX;

    const redirect = `${origin}/dataanalysis`;
    window.open(`${APP_URL_PREFIX}/portal/#/login?redirect=${redirect}`, '_self');
};

let count = 0;
// 添加请求拦截器
http.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    let token = window.localStorage.getItem('token');
    if (token) {
        config.headers.common.Authorization = `Bearer ${token}`;
        config.headers.common.Platform = 17;
    }
    Loading.show();
    ++count;
    return config;
}, error => {
    // 对请求错误做些什么
    count = 0;
    Loading.hide();

    return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(response => {
    // 对响应数据做点什么
    // console.log('进入response拦截器', response);
    --count;
    if (count <= 0) {
        Loading.hide();
    }
    return response;
}, error => {
    // 对响应错误做点什么
    count = 0;
    Loading.hide();
    return Promise.reject(error);
});

/**
 * Build error via request response
 *
 * @param {Object} response response
 * @param {number} status status
 * @return {Error} error
 */
function buildError(response, status) {
    const errmsg = response.message || '接口异常';

    const error = new Error(errmsg);
    error.code = status || response.code;
    error._response = response;
    return error;
}

/**
 * Default success callback
 *
 * @param {Axios.Reaponse} axiosResponse asios response
 * @return {Object|Promise} success return
 */
function successCallback(axiosResponse) {
    const { data, status } = axiosResponse;
    if (status && status === 401) {
        window.localStorage.setItem('token', null);
        window.localStorage.setItem('expires', null);
        login();
    }

    if (status === 200) {
        return data || {};
    }

    // const error = buildError(response);
    return Promise.reject(data);
}

/**
 * Default fail callback
 *
 * @param {Error} err error
 * @return {Promise} rejected promise
 */
function failCallback(error) {
    const { status } = error.response ? error.response : {};
    if (status && status === 401) {
        window.localStorage.setItem('token', null);
        window.localStorage.setItem('expires', null);
        login();
    }
    return Promise.reject(error);
}

/**
 * Ajax function
 *
 * @param {string} method http method
 * @param {string} url url
 * @param {Object} data get params or post data
 * @param {Object} extraOptions extra options for axios
 * @return {Promise} posting
 */
export function ajax(...args) {
    const [
        method,
        url,
        data,
        extraOptions,
    ] = args;

    const options = extraOptions || {};
    options.headers = {
        ...options.headers,

        // 这个地方是一个逻辑，需要cookie中的双引号，以后可以后端统一控制，前端使用上面配置方式就可以
        csrftoken: getCookie('bce-user-info').replace(/"/g, ''),
        // 'X-Request-By': 'ERApplication',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Region': 'bj',
        'X-From': 'web',
        // 'x-bce-request-id': sessionID
    };

    const reqParams = {
        method,
        url,
        data,
        // xsrfHeaderName: 'csrftoken',        // 用于防止xss攻击和跨站脚本攻击
        // xsrfCookieName: 'bce-user-info',    // 用于防止xss攻击和跨站脚本攻击
        credentials: 'include', // 默认请求是否带上cookie
        ...options,
    };

    const key = method.toLowerCase() === 'get' ? 'params' : 'data';

    reqParams[key] = key === 'data' ? data : data;

    return http.request(reqParams).then(successCallback).catch(failCallback);
}

/**
 * Get request url
 *
 * @param {string} path path
 * @return {string} request url
 */
function getAPIURL(path) {
    return `${loginBaseURL}${apiBaseURL}${path}`;
}

/**
 * Ajax post
 *
 * @param {string} path path
 * @param {Object} data post data
 * @param {Object} extraOptions extra options for axios
 * @return {Promise} posting
 */
export function post(path, data = {}, extraOptions = {}) {
    return ajax('POST', getAPIURL(path), data, extraOptions);
}

/**
 * Ajax get
 *
 * @param {string} path path
 * @param {Object} data get params
 * @param {Object} extraOptions extra options for axios
 * @return {Promise} posting
 */
export function get(path, data = {}, extraOptions = {}) {
    return ajax('GET', getAPIURL(path), data, extraOptions);
}

/**
 * Ajax put
 *
 * @param {string} path path
 * @param {Object} data put params
 * @param {Object} extraOptions extra options for axios
 * @return {Promise} posting
 */
export function put(path, data = {}, extraOptions = {}) {
    return ajax('PUT', getAPIURL(path), data, extraOptions);
}

/**
 * Ajax delete
 *
 * @param {string} path path
 * @param {Object} data delete params
 * @param {Object} extraOptions extra options for axios
 * @return {Promise} posting
 */
export function del(path, data = {}, extraOptions = {}) {
    return ajax('DELETE', getAPIURL(path), data, extraOptions);
}
