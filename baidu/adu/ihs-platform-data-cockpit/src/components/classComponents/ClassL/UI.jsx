import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { loginBaseURL } from 'src/env';


import Styles from './UI.module.less';

function ClassL(props) {
    const { icon = '', config } = props;
    const [tableNameVal, setTableNameVal] = useState(null);
    const [cardConfig, setCardConfig] = useState({});
    const [cardData, setCardData] = useState(null);
    const [urlObj, setUrlObj] = useState({});

    const getChartData = () => {
        const { queryUrl } = urlObj;
        if (!queryUrl) {
            return;
        }
        axios.get(`${loginBaseURL}${queryUrl}?${qs.stringify({}, { indices: false })}`)
            .then(function (response) {
                const { data, status } = response;
                const { code } = data;
                if (status === 200 && code === 0) {
                    const chartDataRes = data.data ? data.data : [];
                    const { xaxis, yaxis } = chartDataRes;
                    setCardData({
                        xaxis, yaxis,
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        getChartData();
    }, [urlObj]);

    useEffect(() => {
        const { tableName, bdaTableInfoEntityList } = config;
        setTableNameVal(tableName);
        const tableItem = bdaTableInfoEntityList.find(i => i.tableName === tableName);
        const { obtainFieldUrl, queryUrl, tableDescribe, yaxisDescribe } = tableItem ? tableItem : {};
        setUrlObj({
            obtainFieldUrl,
            queryUrl,
        });
        setCardConfig({
            tableDescribe,
            yaxisDescribe,
        });
    }, [config]);

    return (
        <div className={Styles.ClassL}>
            {
                cardData && (
                    <div className={Styles.text}>
                        <p>{cardData.xaxis}</p>
                        <p>
                            <span>{cardData.yaxis}</span>
                            <span>{cardConfig.yaxisDescribe ? cardConfig.yaxisDescribe : ''}</span>
                        </p>
                    </div>
                )
            }
        </div>
    );
}

export default React.memo(ClassL);
