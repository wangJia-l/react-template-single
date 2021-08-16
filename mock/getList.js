const result = [];
for (let i = 0; i < 10; i++) {
    result.push({
        pid: '3ff4532d-8d86-4966-9f68-51d412de0f3e',
        price: 0,
        thumbnail: 'https://product-upload-picture.bj.bcebos.com/17ae0b3e-e0e5-4aec-8d88-14e19f4a9db5/3ff4532d-8d86-4966-9f68-51d412de0f3e/5/picture__02d0f1b1-d2aa-49c1-9408-24489e6d5586.jpg',
        timeUnit: '10次',
        title: '医疗票据质量检测API_医疗图像清晰模糊判别_图片筛选_深源恒际',
        desc: '【替代70%人力成本，调试简单便捷】AI技术：医疗票据图像清晰模糊判别-图片清晰模糊筛选。支持医疗单证影像清晰度判定，推荐阈值大于0.6为清晰。广泛应用于保险收单、材料审核等应用场景。',
        originalPrice: 0,
        tag: '',
    });
}

export default {
    path: RegExp('/api/nxt_market/web/list/products' + '.*'),
    method: 'get',
    data: {
        'status': 200,
        'success': true,
        'message': {},
        'result': {
            pageNo: 1,
            pageSize: 10,
            totalCount: 70,
            result: result,
        },
    },
};