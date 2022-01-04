import React, { useEffect, useState } from 'react';
import { Select, Modal, Form, Steps } from 'antd';
import { CARD_TYPE } from '@/common/config';
import { FORM_DEFAULT, SIZE_DIC } from './config';
const { Option } = Select;
const { Step } = Steps;

function AddCard(props) {
    const { visible, setParentValue, getTableDicByClass, getDataDicByClass } = props;
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(FORM_DEFAULT);
    const [tableNameDic, setTableNameDic] = useState([]);
    const [styleNameDic, setStyleNameDic] = useState(null);

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onValuesChange = async (changedValues, allValues) => {
        const key = Object.keys(changedValues)[0];

        switch (key) {
            case 'tableInfoId':
                const tableInfoIdVal = changedValues.tableInfoId;
                const itemTable = tableNameDic.find(i => Number(i.id) === Number(tableInfoIdVal));
                form.resetFields(['defaultStyleId']);
                if (itemTable) {
                    const { styleGroupId, bdaDataStyleEntityList } = itemTable;
                    setFormData({
                        ...formData,
                        styleGroupId,
                    });
                    setStyleNameDic(bdaDataStyleEntityList ? bdaDataStyleEntityList : []);
                }
                break;
            default:
                break;
        }
    };

    const handleOk = () => {
        form.validateFields().then(values => {
            const { tableInfoId, defaultStyleId, cardWidth, cardHeight } = values;
            const { styleGroupId } = formData;
            const cardName = tableNameDic.find(item => Number(item.id) === Number(tableInfoId)).tableDescribe;
            setParentValue('cardItem', {
                cardName,
                tableInfoId: Number(tableInfoId),
                gridLayout: null,
                styleGroupId: Number(styleGroupId),
                defaultStyleId: Number(defaultStyleId),
                cardWidth: Number(cardWidth),
                cardHeight: Number(cardHeight),
            });
            setParentValue('visible', { addCard: false });
        }).catch(() => {});

    };

    const handleCancel = () => {
        setParentValue('layoutType', null);
        setParentValue('visible', { addCard: false });
    };

    useEffect(async () => {
        const responseTable = await getTableDicByClass();
        if (responseTable && responseTable.code === 0) {
            setTableNameDic(responseTable.data ? responseTable.data : null);
        }
    }, []);
    return (
        <Modal title="新增" maskClosable={false} visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form
                {...layout}
                form={form}
                initialValues={FORM_DEFAULT}
                name="addCard"
                validateMessages={validateMessages}
                onValuesChange={onValuesChange}
            >
                <Form.Item name={'tableInfoId'} label="请选择数据内容" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择"
                    >
                        {tableNameDic.map(item => (
                            <Option key={item.id}>{item.tableDescribe}</Option>
                        ))}
                    </Select>
                </Form.Item>
                {
                    styleNameDic && (
                        <Form.Item name={'defaultStyleId'} label="请选择默认图表样式" rules={[{ required: true }]}>
                            <Select
                                placeholder="请选择"
                            >
                                {styleNameDic.map(item => (
                                    <Option key={item.styleCode}>{item.styleName}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )
                }
                <Form.Item name={'cardWidth'} label="请选择长度" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择"
                    >
                        {SIZE_DIC.map(item => (
                            <Option key={item.id}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name={'cardHeight'} label="请选择高度" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择"
                    >
                        {SIZE_DIC.map(item => (
                            <Option key={item.id}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>

        </Modal>
    );
}

export default React.memo(AddCard);
