/* eslint-disable */
import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import { VISIBLE_DEFAULT, MENU_LIST } from './config';
import ClassA from '@/components/classComponents/ClassA';
import ClassB from '@/components/classComponents/ClassB';
import ClassC from '@/components/classComponents/ClassC';
import ClassD from '@/components/classComponents/ClassD';
import ClassE from '@/components/classComponents/ClassE';
import ClassF from '@/components/classComponents/ClassF';
import ClassG from '@/components/classComponents/ClassG';
import ClassK from '@/components/classComponents/ClassK';
import ClassL from '@/components/classComponents/ClassL';
import AddCard from '@/components/AddCard';
import ChooseSet from '@/components/ChooseSet';
import 'react-grid-layout/css/styles';
import 'react-resizable/css/styles';
import { downloadFile } from '@/common/utils';
import {SUBJECT_DIC} from '@/common/config'

import Styles from './UI.module.less';

const ChartAnalysis = props => {
    const {
        history,
        queryCardList,
        updateLayoutBatch,
        restoreDefaultLayout,
        exportExcel,
        exportTXT,
        exportCSV,
        subjectIndex } = props;
    const [cardsData, setCardsData] = useState([]);
    const [layoutType, setLayoutType] = useState();
    const [isDraggable, setIsDraggable] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [visible, setVisible] = useState(VISIBLE_DEFAULT);
    const [layoutList, setLayoutList] = useState([]);
    const [layleActive, setLayleActive] = useState(null);

    // 升序排序
    const sortByIndex = data => {
        return data.sort((a, b) => a.pagelocationIndex - b.pagelocationIndex);
    };

    const getGridX = (beforeGridX, width) => {
        const TOTAL = 4;
        const flag = (beforeGridX + width) <= TOTAL;

        return flag ? beforeGridX : 0;
    };

    const formateData = data => {
        const list = sortByIndex(data);
        let beforeGridX = 0;
        const result = list.map(item => {
            const { cardWidth, cardHeight, id, gridLayout } = item;
            const GridX = getGridX(beforeGridX, cardWidth);
            beforeGridX = GridX + Number(cardWidth);
            const { w, h, x, y } = gridLayout ? JSON.parse(gridLayout) : {};
            return {
                ...item,
                w:  w ? w : cardWidth,
                h:  h ? h : cardHeight,
                i: String(id),
                x: (!x || typeof x !== 'number') ? 0 : x,
                y: (!y || typeof y !== 'number') ? 0: y
            };
        });
        return result;
    };
    const getCardsData = async () => {
        const params = {
            subjectIndex: String(subjectIndex),
        };
        const { code, data, msg } = await queryCardList(params);
        if (code === 0) {
            const result = data && data.length ? formateData(data) : [];
            setCardsData(result);
        }
        else {
            message.warning(msg);
        }
    };

    const goSaveLayle = async cardItem => {
        let params = {
            subjectIndex,
            bdaCardInfoEntityList: [],
        };
        const bdaCardInfoEntityList = cardsData.map(card => {
            const {
                cardName,
                styleGroupId,
                tableInfoId,
                defaultStyleId,
                subjectIndex,
                cardWidth,
                cardHeight,
                cardTag,
                i } = card;

            const layoutItem = layoutList.find(item => item.i === i);
            return {
                cardName,
                styleGroupId,
                tableInfoId,
                defaultStyleId,
                subjectIndex,
                cardWidth,
                cardHeight,
                cardTag,
                gridLayout: JSON.stringify(layoutItem ? layoutItem : {}),
            };
        });
        switch (layoutType) {
            case 'DRAG':
            case 'DELETE':
                params = {
                    ...params,
                    bdaCardInfoEntityList,
                };
                break;
            case 'ADD':
                params = {
                    ...params,
                    bdaCardInfoEntityList: [...bdaCardInfoEntityList, {
                        ...cardItem,
                        subjectIndex,
                    }],
                };
                break;
            default:
                break;
        }

        try {
            const data = await updateLayoutBatch(params);
            const { code, msg } = data;
            if (code === 0) {
                message.success('操作成功');
                setLayoutType(null);
                await getCardsData();
            }
            else {
                message.error(`操作失败：${msg}`);
            }
        }
        catch (error) {
            console.log(error, 'error');
            message.error('操作失败，请稍后再试！');
        }
    };

    const goCancelLayle = () => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: (
                <p>取消布局后编辑内容不会保存，确定取消？</p>
            ),
            okText: '确认',
            cancelText: '取消',
            onOk() {
                setLayoutType(null);
            },
            onCancel() { },
        });
    };

    const goLayleSet = () => {
        setVisible({
            ...visible,
            chooseSet: true,
        });
    };

    const setValueByChild = (type, value) => {
        switch (type) {
            case 'layoutType':
                setLayoutType(value);
                break;
            case 'visible':
                setVisible({
                    ...visible,
                    ...value,
                });
                break;
            case 'cardItem':
                goSaveLayle(value);
                break;

            default:
                break;
        }
    };

    const goDeleteCard = id => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: (
                <p>确定删除？删除后无法恢复</p>
            ),
            okText: '确认',
            cancelText: '取消',
            onOk() {
                const index = cardsData.findIndex(card => card.id === id);
                const data = _.cloneDeep(cardsData);
                data.splice(index, 1);
                setCardsData(data);
            },
            onCancel() { },
        });
    };

    const onDragStart = () => { };
    const onDragStop = () => { };

    const onLayoutChange = currentLayout => {
        const result = currentLayout.map(item => {
            const { w, h, x, y, i } = item;
            return {
                w, h, x, y, i,
            };
        });

        setLayoutList(result);
    };

    const goRestoreLayout = async () => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: (
                <p>恢复默认布局后现在的布局不会被保存，确定恢复？</p>
            ),
            okText: '确认',
            cancelText: '取消',
            async onOk() {
                const params = {
                    subjectIndex,
                };

                try {
                    const response = await restoreDefaultLayout(params);
                    const { code, msg } = response;
                    if (code === 0) {
                        getCardsData();
                    }
                    else {
                        message.warning(msg);
                    }
                }
                catch (error) {
                    message.warning('操作失败，请稍后再试！');
                }
            },
            onCancel() { },
        });
    };

    const updateDataByChild = flag => {
        if (flag) {
            getCardsData();
        }
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

        const fileName = SUBJECT_DIC.find(item => item.subjectIndex === subjectIndex).name;

        Promise.all([exportExcel(params), exportTXT(params), exportCSV(params)]).then(res => {
            res.forEach((blob, index) => {
                switch (index) {
                    case 0:
                        downloadFile(URL.createObjectURL(blob), `${fileName}.xlsx`);
                        break;
                    case 1:
                        downloadFile(URL.createObjectURL(blob), `${fileName}.txt`);
                        break;
                    case 2:
                        downloadFile(URL.createObjectURL(blob), `${fileName}.csv`);
                        break;
                    default:
                        break;
                }
            });
        });
    };

    const goLayleOperate = (type) => {
        setLayleActive(type)
        switch (type) {
            case 'SAVE':
                goSaveLayle();
                break;
            case 'CANCEL':
                goCancelLayle();
                break;
            case 'SET':
                goLayleSet();
                break;
            case 'DEFAULT':
                goRestoreLayout();
                break;
            case 'EXPORT':
                goExport();
                break;
        }
    }

    useEffect(() => {
        switch (layoutType) {
            case 'DRAG':
                setIsDraggable(true);
                break;
            case 'ADD':
                setVisible({
                    ...visible,
                    chooseSet: false,
                    addCard: true,
                });
                break;
            case 'DELETE':
                setIsDelete(true);
                break;
            default:
                setIsDelete(false);
                setIsDraggable(false);
                break;
        }
    }, [layoutType]);

    useEffect(() => {
        getCardsData();
    }, []);

    return (
        <div className={Styles.ChartAnalysis}>
            <div className={Styles.buttonBox}>
                {
                    MENU_LIST.map(menu => {
                        switch (menu.type) {
                            case 'SAVE':
                            case 'CANCEL':
                                if (!(layoutType === 'DRAG' || layoutType === 'DELETE')) {
                                    return
                                }
                                break;
                            case 'SET':
                                if (!((!layoutType || layoutType === 'ADD'))) {
                                    return;
                                }
                                break;

                            default:
                                break;
                        }
                        return (
                            <div
                                className={
                                    `${Styles.item} ${menu.type === layleActive ? `${Styles.itemOn}` : ''}`
                                }
                                key={menu.type}
                                onClick={() => goLayleOperate(menu.type)}
                            >
                                <p className={Styles.icon}></p>
                                <span className={Styles.name}>{menu.name}</span>
                            </div>
                        )
                    })
                }
            </div>
            <GridLayout
                isDraggable={isDraggable}
                className="layout"
                layout={cardsData}
                cols={4}
                rowHeight={196}
                width={1920}
                margin={[20, 20]}
                onLayoutChange={onLayoutChange}
                onDragStart={onDragStart}
                onDragStop={onDragStop}
            >
                {
                    cardsData.map(item => {
                        const {
                            id,
                            cardName,
                            tableName,
                            bdaTableInfoEntityList,
                            styleGroupCode,
                            defaultStyleId,
                            cardTag,
                        } = item;
                        const config = {
                            id,
                            cardTag,
                            defaultStyleId,
                            theme: 2,
                            tableName,
                            bdaTableInfoEntityList,
                            updateDataByChild,
                        };
                        return (
                            <div key={id} className={'box-container'}>
                                <div className={'box-model'}>
                                    {
                                        styleGroupCode === 'A' && (
                                            <ClassA
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'B' && (
                                            <ClassB
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'C' && (
                                            <ClassC
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'D' && (
                                            <ClassD
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'E' && (
                                            <ClassE
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'F' && (
                                            <ClassF
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'G' && (
                                            <ClassG
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'K' && (
                                            <ClassK
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                    {
                                        styleGroupCode === 'L' && (
                                            <ClassL
                                                titleName={cardName}
                                                config={config}
                                            />
                                        )
                                    }
                                </div>
                                {
                                    isDelete && (
                                        <div className={'delete-meng-layer'}>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    goDeleteCard(id);
                                                }}
                                                style={{ width: 160 }}
                                            >删除卡片
                                            </Button>
                                        </div>
                                    )
                                }

                            </div>
                        );
                    })
                }
            </GridLayout>
            <AddCard visible={visible.addCard} setParentValue={setValueByChild} />
            <ChooseSet visible={visible.chooseSet} setParentValue={setValueByChild} />
        </div>
    );
};

export default React.memo(ChartAnalysis);
