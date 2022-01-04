import React, { useEffect, useState } from 'react';
import Styles from './UI.module.less';
import icon from '@/assets/icon/icon-type1.png';
import ClassA from '@/components/classComponents/ClassA';
import ClassB from '@/components/classComponents/ClassB';
import ClassC from '@/components/classComponents/ClassC';
import ClassD from '@/components/classComponents/ClassD';
import ClassE from '@/components/classComponents/ClassE';
import ClassF from '@/components/classComponents/ClassF';
import ClassG from '@/components/classComponents/ClassG';
import ClassK from '@/components/classComponents/ClassK';
import ClassL from '@/components/classComponents/ClassL';

function LeftComponent(props) {
    const { history, cardsList, updateDataByChild } = props;
    const [cardsData, setCardsData] = useState([]);

    // 升序排序
    const sortByIndex = () => {
        return cardsData.sort((a, b) => a.pagelocationIndex - b.pagelocationIndex);
    };

    const formateData = () => {
        setCardsData(sortByIndex());
    };

    useEffect(() => {
        formateData();
    }, [cardsData]);

    useEffect(() => {
        setCardsData(cardsList);
    }, [cardsList]);

    return (
        <div className={Styles.LeftComponent}>

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
                        theme: 1,
                        tableName,
                        bdaTableInfoEntityList,
                        updateDataByChild,
                    };
                    return (
                        <div key={id} className={'box-model box-model1'}>
                            {
                                styleGroupCode === 'A' && (
                                    <ClassA
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                            {
                                styleGroupCode === 'B' && (
                                    <ClassB
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                            {
                                styleGroupCode === 'C' && (
                                    <ClassC
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                            {
                                styleGroupCode === 'E' && (
                                    <ClassE
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                            {
                                styleGroupCode === 'F' && (
                                    <ClassF
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                            {
                                styleGroupCode === 'G' && (
                                    <ClassG
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                            {
                                styleGroupCode === 'K' && (
                                    <ClassK
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                            {
                                styleGroupCode === 'L' && (
                                    <ClassL
                                        titleName={cardName}
                                        config={config}
                                        icon={icon}
                                    />
                                )
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default React.memo(LeftComponent);
