<template>
    <div class="home">
        <div class="page-item">
            <div class="content-title">维保提醒</div>
            <div class="content-main">
                <div class="selectItem">
                    <el-form
                        ref="form"
                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        :model="form"
                        label-width="80px"
                        size="mini"
                    >
                        <el-row>
                            <el-col :span="6">
                                <el-form-item label="维保日期">
                                    <el-date-picker
                                        v-model="form.strTime"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始时间"
                                        end-placeholder="结束时间"
                                        :style="{
                                            width: '301px',
                                            background: '#081e43',
                                            height: '37px',
                                            border: '1px solid #0D3271',
                                        }"
                                        @change="selectTime"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="系统选择" prop="keyword">
                                    <el-select v-model="form.systemType" placeholder="请选择">
                                        <el-option
                                            v-for="item in dicStory.seletListType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="设备查询">
                                    <el-input
                                        v-model="form.device"
                                        placeholder="设备名称｜设备IP｜桩号"
                                        @change="keyWordFormat"
                                    />
                                </el-form-item>
                            </el-col>
                            <!-- <el-col :span="6">
                                <div class="right">
                                    <el-button type="primary" @click="sarch">查询</el-button>
                                    <el-button type="primary" @click="reslt">重置</el-button>
                                </div>
                            </el-col> -->
                        </el-row>
                        <el-row>
                            <el-col>
                                <div class="right">
                                    <el-button
                                        data-attr="兼容eslint兼容eslint兼容eslint"
                                        type="primary"
                                        icon="el-icon-search"
                                        @click="sarch"
                                    >
                                        查询
                                    </el-button>
                                    <el-button
                                        data-attr="兼容eslint兼容eslint兼容eslint"
                                        type="primary"
                                        icon="el-icon-refresh-right"
                                        @click="reslt"
                                    >
                                        重置
                                    </el-button>
                                </div>
                            </el-col>
                            <el-col>
                                <div class="boxBottom">
                                    <div class="expro"><span>表结构</span></div>
                                    <el-button
                                        type="text" :style="{color: '#fff'}"
                                        @click="open"
                                    >导出列表</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>

                <div class="main-total">
                    <el-table
                        :data="stationForm"
                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        tooltip-effect="dark"
                        style="width: 100%"
                    >
                        <el-table-column width="55"/>
                        <el-table-column
                            label="序号"
                            width="80"
                            type="index"
                            align="center"
                            fixed="left"
                            :resizable="false"
                        />
                        <!-- <el-table-column
                            prop="deviceName"
                            label="设备名称"
                            width="150"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        ></el-table-column> -->
                        <el-table-column
                            prop="deviceName"
                            label="设备名称"
                            :width="210"
                            fixed="left"
                            class="totledevices"
                            :resizable="false"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        >
                            <template slot-scope="scope">
                                <el-popover
                                    trigger="hover"
                                    placement="top"
                                    :style="{color: '#fff', background: '#000'}"
                                >
                                    <p :style="{color: '#fff'}">{{ scope.row.deviceName }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium" @click="handClickView(scope.row)">
                                            {{ scope.row.deviceName }}
                                        </el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="deviceType"
                            label="设备类型"
                            width="150"
                            :resizable="false"
                            fixed="left"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                        <el-table-column
                            prop="ip"
                            label="设备IP"
                            width="150"
                            fixed="left"
                            :resizable="false"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                        <el-table-column
                            prop="deviceLocation"
                            label="方向"
                            width="150"
                            :resizable="false"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                        <el-table-column
                            prop="maintenanceTime"
                            label="维保日期"
                            :resizable="false"
                            width="170"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                        <el-table-column
                            prop="expiredDays"
                            label="维保超期"
                            :resizable="false"
                            width="300"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                        <el-table-column
                            prop="repairCount"
                            label="维修次数"
                            width="170"
                            :resizable="false"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                        <!-- <el-table-column
                            prop="useTime"
                            label="维修次数"
                            width="150"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        >
                            <template slot-scope="scope">
                                <div v-if="scope.row.status === '1'" class="Configured">
                                    运营中
                                </div>
                                <div v-else class="notconfigured">关闭</div>
                            </template>
                        </el-table-column> -->
                        <el-table-column
                            prop="useTime"
                            label="投入使用时间"
                            :resizable="false"
                            width="150"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                        <el-table-column
                            prop="endTime"
                            :resizable="false"
                            label="预计报废时间"
                            width="150"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        />
                    </el-table>
                </div>
                <div class="bottom">
                    <el-pagination
                        background
                        :current-page.sync="pagination.page_no"
                        :page-size="pagination.page_size"
                        layout="total,prev, pager, next, jumper"
                        :total="pagination.total"
                        @current-change="handleCurrentChange"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {seletListType} from '../repair/json';
import {reminderList} from './servies';
import {fileDownLoad} from '@/utils/exportExcel';
import {DEVICE_DEVICE, DEVICE_LOCATION} from '../../DeviceView/json';
export default {
    data() {
        // 桩号校验规则
        const validateStakeNumber = (rule, value, callback) => {
            const [kxxx, yyy] = value.split('+');
            let xxx = null;
            if (kxxx && kxxx.includes('k')) {
                xxx = kxxx.split('k')[1];
            }
            if (kxxx && kxxx.includes('K')) {
                xxx = kxxx.split('K')[1];
            }
            if (
                !kxxx
                || !yyy
                || !xxx
                || Number(xxx) > 1000
                || Number(xxx) < 0
                || Number(yyy) > 1000
                || Number(yyy) < 0
            ) {
                callback(new Error('请输入正确的设备桩号'));
            }
            else {
                callback();
            }
        };
        return {
            strTime: '',
            endTime: '',
            keyword: '',
            // multipleSelection: [],
            // selfbutton: 'self-button',
            form: {
                strTime: '',
                systemType: '',
                device: '',
            },
            seletList: [
                {
                    title: '使用年限到期',
                    value: '1',
                },
                {
                    title: '事故损坏严重',
                    value: '2',
                },
                {
                    title: '改造损坏严重',
                    value: '3',
                },
                {
                    title: '故障频次高',
                    value: '4',
                },
                {
                    title: '故障频次高',
                    value: '5',
                },
                {
                    title: '更新换代',
                    value: '6',
                },
                {
                    title: '故障高耗能设备频次高',
                    value: '7',
                },
            ],
            pagination: {
                total: 0,
                page_size: 10,
                page_no: 1,
            },
            // 编辑对话框开关
            // dialogVisibleEdit: false,
            // 编辑对话框form表单
            // form: false,
            // 表格
            stationForm: [],
            dicStory: {
                seletListType,
                DEVICE_DEVICE,
                DEVICE_LOCATION,
            },
            // 表单
            editList: {},
            // 表单验证规则
            rules: {
                st_se_name: [{required: true, message: '请选择服务区/收费站', trigger: 'change'}],
                stake_number: [
                    {required: true, message: '请输入桩号', trigger: 'blur'},
                    {validator: validateStakeNumber, trigger: 'blur'},
                ],
                human_station: [{required: true, message: '请选择有无人站', trigger: 'change'}],
                introduce: [{required: true, message: '请输入服务区介绍', trigger: 'change'}],
            },
        };
    },
    watch: {
        form: {
            handler() {
                this.getlist();
            },
            deep: true,
        },
    },
    created() {
        this.getlist();
    },
    methods: {
        handClickView(row) {
            const {deviceId} = row;
            this.$router.push({path: '/deviceView', query: {
                id: deviceId,
                type: 1,
            }});
        },
        // selectChange() {
        //     this.getlist();
        // },
        open() {
            this.$confirm(`请确认导出数据${this.pagination.total}条`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                fileDownLoad({
                    url: '/ihs/monitor/device/statistics/exportMaintenanceRemindList',
                    param: {
                        maintenanceStartTime: this.strTime,
                        maintenanceEndTime: this.endTime,
                        systemType: this.form.systemType,
                        device: this.form.device,
                        pageNo: this.pagination.page_no,
                        pageSize: 1000,
                    },
                    name: '维保提醒列表',
                });
                this.$message({
                    type: 'success',
                    message: '导出成功!',
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消导出',
                });
            });
        },
        selectTime() {
            const {strTime} = this.form;
            this.strTime = this.$moment(strTime[0]).format('YYYY-MM-DD');
            this.endTime = this.$moment(strTime[1]).format('YYYY-MM-DD');
        },
        keyWordFormat(val) {
            function trim(s) {
                return s.replace(/(^\s*)|(\s*$)/g, '');
            }
            this.form.keyword = val ? trim(val) : '';
        },
        async getlist() {
            const params = {
                maintenanceStartTime: this.strTime,
                maintenanceEndTime: this.endTime,
                device: this.form.device,
                pageNo: this.pagination.page_no,
                pageSize: this.pagination?.page_size ?? 10,
                systemType: this.form.systemType === '' ? 1 : this.form.systemType,
            };
            console.log(params); // eslint-disable-line
            const data = await reminderList(params);
            this.stationForm = data.records.map(item => {
                return {
                    ...item,
                    deviceType: this.dicStory.DEVICE_DEVICE[item.deviceType],
                    deviceLocation: this.dicStory.DEVICE_LOCATION[item.deviceLocation],
                };
            });
            this.pagination = {
                total: data.total,
                page_size: data.size,
                page_no: data.current,
            };
        },
        sarch() {
            this.getlist();
        },
        reslt() {
            this.form = {};
            this.strTime = '';
        },
        handleCurrentChange(val) {
            this.pagination.page_no = val;
            this.getlist();
        },
    },
};
</script>
<style lang="less" scoped>
.home {
    height: 100%;
    position: relative;

    /deep/.el-range-input {
        background: #081e43;
        color: #f9fafc;
    }

    /deep/.el-tag {
        background: none !important;
        font-size: 14px !important;
        border: none !important;
        cursor: pointer;
    }

    .expro {
        width: 100%;
        height: 42px;
        background: #1f4766;
        border: 1px solid #3580a6;
        border-radius: 2px;
        display: flex;
        color: #daedff;
        align-items: center;

        span {
            font-size: 14px;
            color: #daedff;
            font-weight: 600;
            padding-left: 10px;
        }
        // align-items: center;
    }

    .page-item {
        height: 100%;

        .content-title {
            position: sticky;
            top: 0;
            color: rgb(236, 228, 228);
            z-index: 2;
            height: 42px;
            font-size: 16px;
            padding-left: 0.16rem;
            background-color: #061e49;
            line-height: 42px;
        }

        .content-main {
            border: 1px solid #222c3e;
            min-height: calc(100% - 40px);
            padding: 0.27rem 0.16rem;
            background: #0a1c35;

            .main-total {
                overflow: hidden;
                margin-top: 30px;

                /deep/.el-col-24 {
                    width: calc(20% - 0.1rem);
                    margin-right: 0.1rem;
                }

                & > .el-row .el-col:nth-child(5) .list-item {
                    margin-right: 0;
                }
            }

            .list-title {
                height: 0.68rem;
                display: flex;
                align-items: center;

                .table-title {
                    border-left: 0.04rem solid #47c2ff;
                    padding-left: 0.1rem;
                    font-size: 0.12rem;
                }
            }
        }
    }

    .selectItem {
        width: 100%;
        // position: relative;
        // margin-top: 50px;
    }
}

.boxBottom {
    width: 1475px;
    height: 42px;
    display: flex;

    .el-button {
        width: 169px;
        // color: #09829f;
        height: 42px;
        background-color: #1246a6;
        border: none;
        margin-left: 16px;
    }
}

.right {
    width: 320px;
    display: flex;
    align-items: right;
    height: 42px;
    margin: 10px 76%;

    .el-button {
        width: 172px;
        border: 0;

        &:nth-child(1) {
            height: 42px;
            background-color: #1246a6;
            font-size: 14px;
        }

        &:nth-child(2) {
            background-color: transparent;
            border: 1px solid #a0c1ff;
        }
    }
}

.left {
    width: 100%;
    display: flex;
    // align-items: right;
    height: 42px;
    // background: #f9fafc;
    // margin: 24px 71%;

    div {
        width: 1070px;
        height: 42px;
        background: #3580a6;
        line-height: 42px;
        // font-family: FZLTZHK--GBK1-0;
        font-size: 14px;
        color: #e2ecf5;
        padding-left: 20px;
        font-weight: 600;
    }

    .el-button {
        width: 155px;
        height: 42px;
        background-color: #1246a6;
        font-size: 14px;
        margin-left: 10px;
    }
}

.select-name {
    display: inline-block;
}

.dialog-footer {
    text-align: center;
    display: flex;

    .el-button--primary {
        width: 125px;
    }
}

.bottom {
    margin-top: 27px;
    text-align: center;
}

/deep/.el-table {
    // width: 100%;
    box-sizing: border-box;

    &::before {
        height: 0;
    }
}

.el-table--border::after,
.el-table--group::after {
    width: 0;
    height: 0;
}

/deep/.el-table__fixed::before {
    height: 0;
}

/deep/.el-table__fixed-right::before {
    height: 0;
}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
