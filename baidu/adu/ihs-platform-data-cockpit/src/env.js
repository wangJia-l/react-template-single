/**
 * @file env
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */
import Cookie from 'js-cookie';
import _ from 'lodash';

const NODE_ENV_MAP = {
    development: 'dev',
    production: 'prod',
};

/**
 * env
 * `dev` `prod`
 *
 * @type {string}
 */
export const env = NODE_ENV_MAP[process.env.NODE_ENV];

export const isDev = env === 'dev';

export const isMock = process.env.NODE_ENV === 'development' && process.env.MOCK;

export const isPreOnline = process.env.PLATFORM === 'online' && _.toUpper(Cookie.get('PREONLINE')) === 'YES';

const PLATFORM_MAP = {
    rd: 'rd',
    qa: 'qa',
    preonline: 'preonline',
    online: 'online',
};

/**
 * platform
 * `rddev` `qa` `online`
 *
 * @type {string}
 */
export const platform = PLATFORM_MAP[process.env.PLATFORM];

const API_BASE_MAP = {
    rd: '/ihs',
    qa: '/ihs',
    preonline: '/ihs',
    online: '/ihs',
};

export const apiBaseURL = API_BASE_MAP[platform];

const LOGIN_BASE_MAP = {
    rd: 'http://180.76.60.136:9003',
    qa: 'http://180.76.60.136:9003',
    preonline: 'http://180.76.60.136:9003',
    online: 'http://13.99.25.56:9003',
};

export const loginBaseURL = LOGIN_BASE_MAP[platform];
