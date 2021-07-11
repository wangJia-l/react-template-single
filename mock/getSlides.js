/**
 * @file getSlides Mock
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */
const result = [];
for (let i = 0; i < 10; i++) {
    result.push({
        "cornerMarker": "HOT",
        "digest": "按年月日查询农历、星座、生肖、胎神、喜神、五行、冲、煞、吉日、值日天神、凶神、吉神宜趋、财神、喜神、福神、岁次、宜、忌、星期等黄历信息，数据范围1900-2100年。",
        "pid": "47a0f228-29a8-48ed-be56-1da8d4a33a16",
        "thumbnail": "https://product-upload-picture.bj.bcebos.com/fc6246b0-2b1b-468d-b658-c112b08296ce/c39a8b44-9271-47f5-9215-966f559c050e/4/picture__3835faa1-f069-4ea6-8497-5dee0705b3b5.jpg",
        "title": "黄历查询",
        "url": "https://apis.baidu.com/store/detail/8286440a-2ba6-42c6-89b8-319fd53f7a42"
    });
}

export default {
    path: RegExp('/api/nxt_market/api_store/slider' + ".*"),
    method: 'get',
    data: {
        "status": 200,
        "success": true,
        "message": {},
        "result": {
            "slides": [
                {
                    "desc":"专业工商顾问一对一服务，59.9元起无忧开公司。",
                    "id":0,
                    "img":"https://prime-v2.bj.bcebos.com/primeLogo/5d9fc27fac5f.png",
                    "link":"https://market.baidu.com/product/cbs",
                    "sequence":1,
                    "title":"工商注册服务限时特惠！"
                },
                {
                    "desc":"共享API经济，共赢API生态",
                    "id":0,
                    "img":"https://prime-v2.bj.bcebos.com/primeLogo/fb02e59cd434.png",
                    "link":"https://market.baidu.com/promo/zmy/index.html",
                    "sequence":2,
                    "title":"API合作伙伴火热招募中"
                },
                {
                    "desc":"1000次调用免费 10000次调用5元",
                    "id":0,
                    "img":"https://prime-v2.bj.bcebos.com/primeLogo/9b61dff9a45a.png",
                    "link":"https://market.baidu.com/detail/c74a34e8-cac2-4bc2-a332-09f463071bd4",
                    "sequence":3,
                    "title":"身份证号码查询"
                },
                {
                    "desc":"全实时优质版，品质保证！支持全网，就是你想要的。",
                    "id":0,
                    "img":"https://prime-v2.bj.bcebos.com/primeLogo/c8a7ba437066.png",
                    "link":"https://market.baidu.com/detail/b6035ecc-8985-4a46-9f56-e4ac6f467684",
                    "sequence":4,
                    "title":"运营商实名认证优质版"
                },
                {
                    "desc":"直连官方，数据稳定可靠，实时更新!",
                    "id":0,
                    "img":"https://prime-v2.bj.bcebos.com/primeLogo/02cc540c141f.png",
                    "link":"https://market.baidu.com/promo/zmy/index.html",
                    "sequence":4,
                    "title":"人脸比对识别"
                }
            ]
        }
    }
}