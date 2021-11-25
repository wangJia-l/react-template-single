const formateColor = color => {
    if (typeof color === 'string') {
        return color;
    }
    const linearColors = color.colorStops.map(({color, offset}) => {
        return color + ' ' + (offset * 100 + '%');
    });
    const {x, y, x2, y2} = color;
    const radian = Math.atan2(y - y2, x - x2); // 返回来的是弧度
    const angle = 180 / Math.PI * radian; // 转换成角度
    return `linear-gradient(${angle - 90}deg, ${linearColors.join(',')})`;
};

export const creatCustomTooptip = (data, options = {}) => {
    let {title} = options;
    const isObject = !Array.isArray(data);
    data = isObject ? [data] : data;
    title = title || data?.[0]?.axisValueLabel || data[0]?.seriesName;
    let str =  `<div style="
            display:flex;flex-direction:column;background-color:rgba(20, 68, 118, 0.8);border-radius:2px
        ">
        <div
            style="background-color:#2D66A2;height:28px;
            line-height:28px;text-align:center;
            color:#A5C7FF;border-radius:2px 2px 0 0"
        >
            ${title}
        </div>
        <div style="display:flex;flex-direction:column;color:#82A7EC;padding: 10px;">
            ${
    data.map(el => {
        return `<div style="display:flex;justify-content: space-between;height: 12px;margin-bottom: 12px;">
                                <div style="margin-right: 20px">
                                <span 
                                    style="
                                    display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;
                                    background:${formateColor(el.color)};"
                                    ></span>
                                    <span>${el.seriesName}</span>
                                </div>
                                <div style="color: #B3DAFF; font-size: 18px; font-weight: 500">${el.data}</div>
                            </div>`;
    }).join('')
}
        <div>
    <div>`;
    return str;
};