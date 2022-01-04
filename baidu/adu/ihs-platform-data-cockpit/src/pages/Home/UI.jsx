import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import LeftComponent from './components/Left/UI';
import RightComponent from './components/Right';
import CenterComponent from './components/Center';

import Styles from './UI.module.less';

function Home(props) {
    const { history, queryCardList, exportExcel, exportTXT, exportCSV } = props;
    const [cardsData, setCardsData] = useState([]);
    const [leftCardsData, setLeftCardsData] = useState([]);
    const [rightCardsData, setRightCardsData] = useState([]);

    const getCardsData = async () => {
        const params = {
            subjectIndex: '0',
        };
        const { code, data, msg } = await queryCardList(params);
        if (code === 0) {
            setCardsData(data && data.length ? data : []);
        }
        else {
            message.warning(msg);
        }
    };

    const updateDataByChild = flag => {
        if (flag) {
            getCardsData();
        }
    };


    useEffect(() => {
        let leftList = [];
        let rightList = [];
        if (!cardsData || !cardsData.length) {
            return;
        }
        cardsData.forEach((item, i) => {
            if (i % 2) {
                rightList.push(item);
            }
            else {
                leftList.push(item);
            }
        });

        setLeftCardsData(leftList);
        setRightCardsData(rightList);
    }, [cardsData]);

    useEffect(() => {
        getCardsData();
    }, []);

    return (
        <div className={Styles.home}>
            {
                leftCardsData.length > 0 && <LeftComponent
                    history={history}
                    cardsList={leftCardsData}
                    updateDataByChild={updateDataByChild}
                />
            }
            {
                rightCardsData.length > 0 && <RightComponent
                    history={history}
                    cardsList={rightCardsData}
                    updateDataByChild={updateDataByChild}
                />
            }
            <CenterComponent
                history={history}
                cardsData={cardsData}
                configIp={{
                    exportExcel, exportTXT, exportCSV,
                }}
            />
        </div>
    );
}

export default React.memo(Home);
