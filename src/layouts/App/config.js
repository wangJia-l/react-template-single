/**
 * @file Slider config
 * @author zhaoyadong (zhaoyadong@baidu.com)
 */
export const MENUS = [
    {
        type: 'MenuItem',
        key: '1',
        title: '首页',
        url: '/',
        items: [],
    },
    {
        type: 'MenuItem',
        key: '2',
        title: '列表页',
        url: '/list',
        items: [],
    },
    // {
    //     type: 'SubMenu',
    //     key: '3',
    //     title: '设置页',
    //     items: [
    //         {
    //             type: 'MenuItem',
    //             key: '31',
    //             title: '设置页',
    //             url: '/setting',
    //         }
    //     ]
    // },
];

// 根据当前的path来确定默认的key
export const getDefaultKey = path => {
    let result = ['', ''];
    if (!path || path === '/') {
        return result;
    }
    MENUS.forEach(menu => {
        menu.items.forEach(subMenu => {
            if (path === subMenu.url) {
                result = [menu.key, subMenu.key];
            }
        });
    });
    return result;
};
