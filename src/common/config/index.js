/**
 * 一分钟的毫秒值 60000 = 60 * 1000
 */
export const MILLISECONDS_MIN = 60000;
/**
  * 一小时的毫秒值 3600000 = 60 * 60 * 1000
  */
export const MILLISECONDS_HOUR = MILLISECONDS_MIN * 60;
/**
  * 一天的毫秒值 86400000 = 24 * 60 * 60 * 1000
  */
export const MILLISECONDS_DAY = MILLISECONDS_HOUR * 24;
/**
  * 一分钟的秒值 60
  */
export const SECONDS_MIN = 60;
/**
  * 一小时的秒值 3600 = 60 * 60
  */
export const SECONDS_HOUR = SECONDS_MIN * 60;
/**
  * 一天的秒值 86400 = 24 * 60 * 60
  */
export const SECONDS_DAY = SECONDS_HOUR * 24;

/**
 * 本地缓存的KEY的配置，过期时间采用秒为单位
 */
export const CACHE_KEYS = {
    // 全局的分类信息
    globalCategory: {
        key: 'GLOBAL_CATEGORY',
        expired: SECONDS_MIN,
        defaultValue: [],
    },
    // 全局的广告信息
    globalAdsense: {
        key: 'GLOBAL_ADSENSE',
        expired: SECONDS_MIN,
        defaultValue: {
            apiStickyCampaigns: [],
            bannerTopKeywords: [],
        },
    },
    // 首页使用的轮播信息
    homeSlider: {
        key: 'HOME_SLIDER',
        expired: SECONDS_DAY,
        defaultValue: [],
    },
};
