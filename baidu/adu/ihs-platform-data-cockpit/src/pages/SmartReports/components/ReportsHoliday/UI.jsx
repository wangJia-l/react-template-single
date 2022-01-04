import React, { useState, useEffect } from 'react';
import { Button, Form, Select, DatePicker, Col, Row, Input, message } from 'antd';
import moment from 'moment';
import qs from 'qs';
import Styles from './UI.module.less';
import { directionDic, detailInfoDefult } from './config';
import { loginBaseURL } from '@/env';
const { TextArea } = Input;

const ReportsHoliday = props => {
    const { history, roadNameList, intelligentReportInfo, addRedisMsg, queryRedisMsg, exportWord } = props;
    const [form] = Form.useForm();
    const [roadDirNo, setRoadDirNo] = useState(1);
    const [detailInfo, setDetailInfo] = useState(detailInfoDefult);
    const [ifDetailShow, setIfDetailShow] = useState(false);
    const [textMsg, setTextMsg] = useState('');

    const [roadNameDic, setRoadNameDic] = useState([]);

    const getDic = async () => {
        const params = {
            roadDir: Number(roadDirNo),
        };
        const response = await roadNameList(params);
        const { code, data } = response;
        if (code !== 0) {
            return;
        }

        setRoadNameDic(data && data.length ? data : []);
    };

    const onFormLayoutChange = async changedObj => {
        const key = Object.keys(changedObj)[0];

        switch (key) {
            case 'roadDirNo':
                setRoadDirNo(Number(changedObj.roadDirNo));
                form.setFieldsValue({ roadName: null });
                break;

            default:
                break;
        }
    };

    const getText = async () => {
        const response = await queryRedisMsg();
        const { code, data } = response;

        if (code === 0) {
            setTextMsg(data);
        }
    };

    const textAreaChange = e => {
        setTextMsg(e.target.value);
    };

    const goCancel = () => {
        form.resetFields();
        setIfDetailShow(false);
        setDetailInfo(detailInfoDefult);
    };

    const goSubmit = () => {
        form.validateFields().then(async values => {
            const { startTime, endTime } = values;
            const params = {
                ...values,
                startTime: moment(startTime).format('YYYY-MM-DD'),
                endTime: moment(endTime).format('YYYY-MM-DD'),
            };
            const response = await intelligentReportInfo(params);
            const { code, data } = response;
            if (code === 0) {
                setDetailInfo(data ? data : {});
                setIfDetailShow(true);
                await getText();
            }
        });
    };

    const goSubmitText = async () => {
        const params = {
            msg: textMsg,
        };
        const response = await addRedisMsg(params);
        const { code, msg } = response;

        if (code === 0) {
            message.success('提交成功');
            const paramsData = form.getFieldValue();
            const { startTime, endTime } = paramsData;
            const paramsExport = qs.stringify({
                ...paramsData,
                startTime: moment(startTime).format('YYYY-MM-DD'),
                endTime: moment(endTime).format('YYYY-MM-DD'),
                remarks: textMsg,
            });
            window.open(`${loginBaseURL}/ihs/analysis/intelligentReport/export?${paramsExport}`);

        }
        else {
            message.warning(msg);
        }
    };

    const disabledSatrtDate = current => {
        const endDate = form.getFieldValue('endTime');
        return current && current  > endDate;
    };

    const disabledEndDate = current => {
        const startTime = form.getFieldValue('startTime');
        return current && current  < startTime;
    };

    useEffect(() => {
        getDic();
    }, [roadDirNo]);

    useEffect(() => {
        getDic();
    }, []);

    return (
        <div className={`${Styles.ReportsHoliday} reports-holiday`}>
            <div className={Styles.subtitle}>
                车流量信息管理
            </div>
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                form={form}
                initialValues={{ roadDirNo: '1' }}
                onValuesChange={onFormLayoutChange}
            >
                <Col span={10}>
                    <Form.Item
                        label="方向名称"
                        name="roadDirNo"
                        rules={[
                            {
                                required: true,
                                message: '请选择方向名称',
                            },
                        ]}
                    >
                        <Select>
                            {
                                directionDic.map(direction =>
                                    (
                                        <Select.Option
                                            value={direction.id}
                                            key={direction.id}
                                        >{direction.label}
                                        </Select.Option>
                                    )
                                )
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        label="路段名称"
                        name="roadName"
                        rules={[
                            {
                                required: true,
                                message: '请选择路段名称',
                            },
                        ]}
                    >
                        <Select>
                            {
                                roadNameDic.map(road => (<Select.Option value={road} key={road}>{road}</Select.Option>))
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={10} style={{ marginTop: '20px' }}>
                    <Form.Item
                        label="统计开始时间"
                        name="startTime"
                        rules={[
                            {
                                required: true,
                                message: '请选择统计开始时间',
                            },
                        ]}
                    >
                        <DatePicker disabledDate={disabledSatrtDate} />
                    </Form.Item>
                </Col>
                <Col span={10} style={{ marginTop: '20px' }}>
                    <Form.Item
                        label="统计结束时间"
                        name="endTime"
                        rules={[
                            {
                                required: true,
                                message: '请选择统计结束时间',
                            },
                        ]}
                    >
                        <DatePicker disabledDate={disabledEndDate} />
                    </Form.Item>
                </Col>
            </Form>
            <Row>
                <Col span={20} style={{ textAlign: 'right' }}>
                    <Button type="primary" style={{ width: '160px' }} onClick={goCancel}>取消</Button>
                    <Button type="primary" style={{ width: '160px', marginLeft: '20px' }} onClick={goSubmit}>确认</Button>
                </Col>
            </Row>
            {
                ifDetailShow && (
                    <Row>
                        <Col span={20}>
                            <div className={Styles.detailForm}>
                                <div className={Styles.item}>
                                    <p>起始桩号：</p>
                                    <p>{detailInfo.startStake} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>结束桩号：</p>
                                    <p>{detailInfo.endStake} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>平均车速：</p>
                                    <p>{detailInfo.avgSpeed} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>拥堵指数：</p>
                                    <p>{detailInfo.jamIndex} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>车流量合计：</p>
                                    <p>{detailInfo.flow} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>大车数量：</p>
                                    <p>{detailInfo.largeVhcCnt} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>小客车数量：</p>
                                    <p>{detailInfo.smallVhcCnt} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>折算车流量：</p>
                                    <p>{detailInfo.convertVolume} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>操作人员：</p>
                                    <p>{detailInfo.operatorName} </p>
                                </div>
                                <div className={Styles.item}>
                                    <p>联系电话：</p>
                                    <p>{detailInfo.telNo} </p>
                                </div>
                            </div>
                        </Col>
                        <Col span={20}>
                            <div className={Styles.detailForm}>
                                <div className={Styles.inputItem}>
                                    <div>
                                        备注：
                                    </div>
                                    <div>
                                        <TextArea value={textMsg} onChange={textAreaChange} rows={4} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={20} style={{ textAlign: 'right', marginTop: '40px' }}>
                            <Button
                                type="primary"
                                style={{ width: '160px', marginLeft: '20px' }}
                                onClick={goSubmitText}
                            >提交
                            </Button>
                        </Col>
                    </Row>
                )
            }


        </div>
    );
};

export default React.memo(ReportsHoliday);
