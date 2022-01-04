import React, { useState } from 'react';
import Styles from './UI.module.less';
import { Button } from 'antd';
import Piechart from './components/Piechart/UI';
import Diagram from './components/Diagram/UI';
import Chartthreed from './components/Chartthreed/UI';
import htop from '@/assets/icon/harze-top.png';
import hbot from '@/assets/icon/harze-bot.png';

const DrillChart = props => {
    const [tabIndex, setTabsIndex] = useState(0);
    const [upDill, setUpDill] = useState(1);
    const [parcode, setparcode] = useState('');
    const direction = ['北京方向', '雄安方向'];
    const getUpper = i => {
        setUpDill(upDill === 0 ? 1 : 0);
        // setDirection
    };
    const getTabs = index => {
        setTabsIndex(index);
    };
    const getcode = value => {
        console.log(value);
        setparcode(value);
    };
    return (
        <div>
            <div className={Styles.duoTitle}>多维度连续钻取</div>
            <div className={Styles.box}>
                <div className={Styles.left}>
                    <div className={Styles.leftTitle}>
                        <div className={Styles.title}>事件时空统计</div>
                        <div className={Styles.bord}>
                            {
                                upDill === 0 ? <img src={htop} alt="" onClick={() => getUpper(0)} />
                                    : <img src={hbot} alt="" onClick={() => getUpper(1)} />
                            }
                            {/* <img src={htop} alt="" onClick={() => getUpper(0)} />
                            <img src={hbot} alt="" onClick={() => getUpper(1)} /> */}
                        </div>
                        <div className={Styles.tabs}>

                            {
                                direction.map((item, index) => {
                                    return (
                                        <Button
                                            // eslint-disable-next-line react/no-array-index-key
                                            key={index}
                                            type='primary'
                                            className={index !== tabIndex ? Styles.active : ''}
                                            onClick={() => {
                                                getTabs(index);
                                            }}
                                        >{item}
                                        </Button>
                                    );
                                })
                            }

                        </div>
                    </div>

                    <Chartthreed
                        roadDirNo={direction[tabIndex]}
                        updill={upDill === 0 ? '上钻' : '下钻'}
                        paramsChange={getcode}
                    />
                </div>

                <div className={Styles.right}>
                    <Piechart roadDirNo={tabIndex} parcode={parcode} />
                    <Diagram roadDirNo={tabIndex} parcode={parcode} />
                </div>
            </div>
        </div>

    );
};
export default DrillChart;