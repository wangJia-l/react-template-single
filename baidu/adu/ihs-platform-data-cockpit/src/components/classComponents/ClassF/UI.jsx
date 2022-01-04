import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { loginBaseURL } from 'src/env';
import NoData from '@/components/NoData';
import { Select, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
const { Option } = Select;


import Styles from './UI.module.less';

function ClassF(props) {
    const { icon = '', config } = props;
    const { cardTag, id } = config;
    const cardRef = useRef(null);
    const [tableNameVal, setTableNameVal] = useState(null);
    const [cardConfig, setCardConfig] = useState({});
    const [cardData, setCardData] = useState(null);
    const [type, setType] = useState(null);
    const [typeDic, setTypeDic] = useState([]);
    const [urlObj, setUrlObj] = useState({});
    const [ifMengLayer, setIfMengLayer] = useState(false);

    const getTypeData = () => {
        const { obtainFieldUrl } = urlObj;
        if (!obtainFieldUrl) {
            return;
        }
        axios.get(`${loginBaseURL}${obtainFieldUrl}?${qs.stringify({}, { indices: false })}`)
            .then(function (response) {
                const { data, status } = response;
                const { code } = data;
                if (status === 200 && code === 0) {
                    const typeData = data.data ? data.data : [];
                    if (!typeData || !typeData.length) {
                        return;
                    }
                    setTypeDic(typeData ? typeData : []);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const getChartData = () => {
        const { queryUrl } = urlObj;
        if (!queryUrl) {
            return;
        }
        const params = {
            type,
        };
        axios.get(`${loginBaseURL}${queryUrl}?${qs.stringify(params, { indices: false })}`)
            .then(function (response) {
                const { data, status } = response;
                const { code } = data;
                if (status === 200 && code === 0) {
                    const chartDataRes = data.data ? data.data : [];
                    if (!chartDataRes || !chartDataRes.length) {
                        return;
                    }
                    const { y_axis, x_axis } = chartDataRes[0];
                    setCardData({
                        y_axis, x_axis,
                    });
                    setIfMengLayer(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const typeChange = value => {
        setType(value);
    };

    const clickCard = () => {
        setIfMengLayer(true);
    };

    const goClose = () => {
        setTimeout(() => {
            setIfMengLayer(false);
        }, 300);
    };

    useEffect(() => {
        getChartData();
    }, [type]);

    useEffect(() => {
        getChartData();
        getTypeData();
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

    useEffect(() => {
        window.addEventListener('click', event => {
            if (event && event.preventDefault) {
                event.preventDefault();
            }
            else {
                window.event.returnValue = false;
            }
            const evt = event.srcElement ? event.srcElement : event.target;
            // console.log(cardRef ? cardRef.current : null, '----ref');
        });
    }, []);

    return (
        <div className={Styles.ClassF} ref={cardRef} onClick={clickCard}>
            {
                cardData && (
                    <div className={Styles.text}>
                        <p>{cardData.x_axis}</p>
                        <p>
                            <span>{cardData.y_axis}</span>
                            <span>{cardConfig.yaxisDescribe ? cardConfig.yaxisDescribe : ''}</span>
                        </p>
                    </div>
                )
            }
            {
                cardData && (
                    <div className={`${Styles.mengLayer} ${ifMengLayer ? Styles.on : Styles.off}`}>
                        <div className={Styles.close}>
                            <Button
                                icon={<CloseOutlined style={{ fontSize: '16px', color: '#092650' }} />}
                                onClick={goClose}
                            />
                        </div>
                        <div className={Styles.selectBox}>
                            <Select
                                style={{ width: 160 }}
                                placeholder="请选择"
                                onChange={typeChange}
                                value={type}
                            >
                                {typeDic.map(item => (
                                    <Option key={item}>{item}</Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                )
            }
            {
                !cardData && <NoData />
            }
        </div>
    );
}

export default React.memo(ClassF);
