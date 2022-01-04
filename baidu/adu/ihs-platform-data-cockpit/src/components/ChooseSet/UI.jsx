import React, { useEffect, useState, useForm } from 'react';
import { Select, Modal, Form } from 'antd';
const { Option } = Select;
import { OPTION_DIC } from './config';

function ChooseSet(props) {
    const { visible, setParentValue } = props;
    const [form] = Form.useForm();

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const handleOk = () => {
        form.validateFields().then(() => {
            const { type } = form.getFieldValue();
            setParentValue('layoutType', type);
            setParentValue('visible', { chooseSet: false });
        });
    };

    const handleCancel = () => {
        setParentValue('visible', { chooseSet: false });
    };
    return (
        <Modal title="布局设置" maskClosable={false} visible={visible} onOk={handleOk} onCancel={handleCancel}>
            <Form {...layout} form={form} name="layoutSetting">
                <Form.Item name={'type'} label="请选择布局类型" rules={[{ required: true }]}>
                    <Select
                        placeholder="请选择"

                    >
                        {OPTION_DIC.map(item => (
                            <Option key={item.id}>{item.label}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>

        </Modal>
    );
}

export default React.memo(ChooseSet);
