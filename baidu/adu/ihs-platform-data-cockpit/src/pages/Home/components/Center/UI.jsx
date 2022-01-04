import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import Styles from './UI.module.less';
import icon from '@/assets/icon/icon-type1.png';
import { dataMock, MENU_LIST } from './config';
import { Button } from 'antd';
import Img1 from '@/assets/homeImg/1.png';
import Img2 from '@/assets/homeImg/2.png';
import Img3 from '@/assets/homeImg/3.png';
import Img4 from '@/assets/homeImg/4.png';
import Img5 from '@/assets/homeImg/5.png';
import Img6 from '@/assets/homeImg/6.png';
import Img7 from '@/assets/homeImg/7.png';
import Img8 from '@/assets/homeImg/8.png';
import Img9 from '@/assets/homeImg/9.png';
import Img10 from '@/assets/homeImg/10.png';
import Img11 from '@/assets/homeImg/11.png';
import Img12 from '@/assets/homeImg/12.png';
import Img13 from '@/assets/homeImg/13.png';
import { downloadFile } from '@/common/utils';

function CenterComponent(props) {
    const { history, configIp, cardsData } = props;
    const { exportExcel, exportTXT, exportCSV } = configIp;
    const imgList = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, Img13];
    const componentRef = useRef(null);
    let index = 0;
    let timer = null;

    const animationStart = () => {
        if (!componentRef || !componentRef.current) {
            return;
        }
        timer = setInterval(() => {
            if (index === imgList.length) {
                index = 0;
            }
            if (componentRef && componentRef.current) {
                componentRef.current.style.backgroundImage = `url(${imgList[index]})`;
            }
            index++;
        }, 100);

    };

    const goItem = path => {
        history.push(path);
    };

    const goExport = async () => {
        const queryConditionList = cardsData.map(card => {
            const { tableName, bdaTableInfoEntityList } = card;
            const tableItem = bdaTableInfoEntityList.find(i => i.tableName === tableName);
            const { batchLength } = tableItem;
            let formatPicker = null;
            let defaultTime = new Date();
            switch (batchLength) {
                case 8:
                    formatPicker = 'YYYYMMDD';
                    defaultTime = new Date().setDate(new Date().getDate() - 1);
                    break;
                case 6:
                    formatPicker = 'YYYYMM';
                    break;
                case 4:
                    formatPicker = 'YYYY';
                    break;
                default:
                    break;
            }
            return {
                sheetName: card.cardName,
                tableName: card.tableName,
                batchCondition: batchLength ? moment(defaultTime).format(formatPicker) : '',
                typeCondition: '',
            };
        });
        const params = {
            queryConditionList,
        };
        Promise.all([exportExcel(params), exportTXT(params), exportCSV(params)]).then(res => {
            res.forEach((blob, index) => {
                switch (index) {
                    case 0:
                        downloadFile(URL.createObjectURL(blob), '数据总览.xlsx');
                        break;
                    case 1:
                        downloadFile(URL.createObjectURL(blob), '数据总览.txt');
                        break;
                    case 2:
                        downloadFile(URL.createObjectURL(blob), '数据总览.csv');
                        break;
                    default:
                        break;
                }
            });
        });
    };

    useEffect(() => {
        animationStart();

        return function () {
            timer = null;
        };
    }, []);

    return (
        <div className={Styles.CenterComponentBg}>
            <div className={Styles.CenterComponent} ref={componentRef}>
                <div className={'buttonBox'}>
                    <Button type="primary" onClick={goExport}>导出数据</Button>
                </div>
                <div className={Styles.centerBox}>
                    <div className={Styles.list}>
                        {
                            dataMock.map(item => (
                                <div key={item.titleName} className={Styles.item}>
                                    <div className={Styles.top}>
                                        <p>
                                            <img src={icon} />
                                            <span>{item.titleName}</span>
                                        </p>
                                        <p>单位：辆</p>
                                    </div>
                                    <div className={Styles.center}>
                                        <div>
                                            {item.data}
                                        </div>
                                        <div>
                                            <p>
                                                <span>同比上周</span>
                                                <span
                                                    className={`${Styles[`${item.num1 > 0
                                                        ? 'redColor' : 'greenColor'}`]}`}
                                                >
                                                    {item.num1}%
                                                </span>
                                            </p>
                                            <p>
                                                <span>环比上周</span>
                                                <span
                                                    className={`${Styles[`${item.num2 > 0
                                                        ? 'redColor' : 'greenColor'}`]}`}
                                                >
                                                    {item.num2}%
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
                <div className={Styles.bottonBox}>
                    {
                        MENU_LIST.map((menu, i) => {
                            return (
                                <div
                                    key={menu.key}
                                    className={`${Styles.item} ${Styles[`item${i}`]}`}
                                    onClick={() => goItem(menu.path)}
                                >
                                    <div className={`${Styles.icon} ${Styles[`icon${i}`]}`}> </div>
                                    <div className={Styles.title}>
                                        {menu.name}
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        </div>

    );
}

export default React.memo(CenterComponent);
