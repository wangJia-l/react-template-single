import React, { useState, useEffect } from 'react';
import { Tree, message, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SUBJECT_DIC } from 'src/common/config';
import ClassA from '@/components/classComponents/ClassA';
import ClassB from '@/components/classComponents/ClassB';
import ClassC from '@/components/classComponents/ClassC';
import ClassD from '@/components/classComponents/ClassD';
import ClassE from '@/components/classComponents/ClassE';
import ClassG from '@/components/classComponents/ClassG';
import ClassK from '@/components/classComponents/ClassK';

import Styles from './UI.module.less';

const SmartReports = props => {
    const { queryCardsList, updateCardWords } = props;
    const [treeData, setTreeData] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([props.subjectIndex]);
    const [selectedCardList, setSelectedCardList] = useState([]);
    const [cardExplainMap, setCardExplainMap] = useState(new Map());

    const onCheck = (checkedKeys, info) => {
        setCheckedKeys(checkedKeys);
        let { checkedNodes = [] } = info;
        checkedNodes = checkedNodes.filter(i => !i.children || !i.children.length);
        setSelectedCardList(checkedNodes);
    };

    const cardExplainChange = (e, id) => {
        let map = cardExplainMap;
        map.set(id, e.target.value);

        setCardExplainMap(map);
    };

    const goAddWords = async id => {
        const cardExplain = cardExplainMap.get(id);
        const params = {
            id,
            cardExplain,
        };
        try {
            const response = await updateCardWords(params);
            const { code, msg } = response;
            if (code === 0) {
                message.success('操作成功');
            }
            else {
                message.warning(msg);
            }
        }
        catch (error) {
            message.warning('操作失败，请稍后再试');
        }

    };

    const formateData = list => {
        if (!list || !list.length) {
            return [];
        }
        list = list.map(item => {
            const { subjectIndex, cardData } = item;
            const name = SUBJECT_DIC.find(i => i.subjectIndex === subjectIndex).name;

            const children = cardData.map(card => {
                return {
                    ...card,
                    key: card.id,
                    title: card.cardName,
                    children: [],
                };
            });

            return {
                key: subjectIndex,
                title: name,
                children,
            };
        });
        return list;
    };

    const getCardsData = async () => {
        const { code, data, msg } = await queryCardsList();
        if (code === 0) {
            if (data && data.length) {
                const result = formateData(data);

                setTreeData(result ? result : []);
                setCheckedKeys([props.subjectIndex]);
                const activeSubject = result ? result.find(i => i.key === props.subjectIndex) : {};
                if (activeSubject && activeSubject.children) {
                    setSelectedCardList(activeSubject.children);
                }
            }

        }
        else {
            message.warning(msg);
        }
    };

    useEffect(() => {
        getCardsData();
    }, []);

    return (
        <div className={Styles.SmartReports}>
            <div className={Styles.content}>
                <div className={Styles.left}>
                    <Tree
                        checkedKeys={checkedKeys}
                        checkable
                        onCheck={onCheck}
                        treeData={treeData}
                    />
                </div>
                <div className={Styles.right}>
                    <div className={Styles.title}>报表编辑</div>
                    <div className={Styles.cardList} id="pdfDom">
                        {
                            selectedCardList.map(card => {
                                const {
                                    id,
                                    cardName,
                                    tableName,
                                    bdaTableInfoEntityList,
                                    styleGroupCode,
                                    defaultStyleId,
                                    cardHeight,
                                    cardWidth,
                                    cardExplain,
                                } = card;
                                const config = {
                                    defaultStyleId,
                                    theme: 2,
                                    tableName,
                                    bdaTableInfoEntityList,
                                };
                                const className = `col-${cardWidth} line-${cardHeight}`;
                                return (
                                    <div key={id} className={Styles.itemCard}>
                                        <div className={`box-model ${className}`}>
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
                                                styleGroupCode === 'E' && (
                                                    <ClassE
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
                                        </div>
                                        <div className={Styles.inputBox}>
                                            <Input
                                                placeholder="请输入文案"
                                                defaultValue={cardExplain}
                                                onChange={e => {
                                                    cardExplainChange(e, id);
                                                }}
                                            />
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                onClick={() => {
                                                    goAddWords(id);
                                                }}
                                                style={{ marginLeft: '20px', width: '240px' }}
                                            >添加
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SmartReports);
