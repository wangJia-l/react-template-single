import React, { useEffect, useState } from 'react';
import { Input, message, Tooltip } from 'antd';

import Styles from './UI.module.less';

function TitleA(props) {
    const { titleName, updateCardName, id, cardTag, updateParentData, icon } = props;
    const [ifInputShow, setIfInputShow] = useState(false);
    const [titleNameInput, setTitleNameInput] = useState(null);
    const [cardTagList, setCardTagList] = useState([]);

    const ifLegal = text => {
        if (!text) {
            message.warning('卡片名称不能为空');
            return false;
        }

        // 限制20字符
        const MAX = 20;
        if (text.length > MAX) {
            message.warning('卡片名称限制长度20字符');
            return false;
        }

        // 特殊字符
        const patternReg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
        if (patternReg.test(text)) {
            message.warning('卡片名称不能包含特殊字符');
            return false;
        }
        // 空格
        const blankReg = new RegExp(/\s/);
        if (blankReg.test(text)) {
            message.warning('卡片名称不能包含空格');
            return false;
        }

        const legalReg = /^[a-zA-Z0-9-_\u4e00-\u9fa5]+$/;
        if (legalReg.test(text)) {
            return true;
        }

        message.warning('卡片名称不合法');
        return false;

    };

    const titleNameInputChange = e => {
        const text = e.target.value;
        setTitleNameInput(text);
    };

    const onBlur = async e => {
        const text = e.target.value;
        if (!ifLegal(text)) {
            return;
        }
        const params = {
            id,
            cardName: text,
        };
        const response = await updateCardName(params);
        const { code, msg } = response;
        if (code === 0) {
            message.success('操作成功');
            setIfInputShow(false);
            updateParentData(true);
        }
        else {
            message.warning(msg);
        }
    };

    useEffect(() => {
        setTitleNameInput(titleName);
    }, [titleName]);

    useEffect(() => {
        setCardTagList(cardTag ? cardTag.split(',') : []);
    }, [cardTag]);

    return (
        <div className={Styles.TitleA}>
            <div className={Styles.titleNameBox}>
                {
                    !ifInputShow && (
                        <div className={Styles.titleName} onDoubleClick={() => setIfInputShow(true)}>
                            <img src={icon} />
                            <Tooltip placement="top" title={titleName}>
                                <p>{titleName}</p>
                            </Tooltip>
                        </div>
                    )
                }
                {
                    ifInputShow && (
                        <div className={Styles.input}>
                            <Input
                                placeholder="请输入"
                                value={titleNameInput}
                                onChange={titleNameInputChange}
                                style={{ height: '42px' }}
                                onBlur={onBlur}
                            />
                        </div>
                    )
                }
            </div>
            <div className={Styles.cardTagBox}>
                {
                    cardTagList.map((tag, i) => {
                        if (i > 0) {
                            return;
                        }
                        return (<p className={Styles.item} key={tag}>{tag}</p>);
                    })
                }
            </div>
        </div>
    );
}

export default React.memo(TitleA);
