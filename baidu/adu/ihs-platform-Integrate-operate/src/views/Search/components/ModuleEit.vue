<template>
    <div class="home">
        <!-- <div class="search-page"> -->
        <el-form
            ref="moduleForm"
            :model="moduleForm"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint"
            :label-position="labelPosition"
            label-width="100px"
            class="demo-moduleForm"
            :rules="rules"
        >
            <p class="title">设备信息</p>
            <el-row type="flex">
                <el-col :span="8">
                    <el-form-item label="资产编码：">
                        <el-input
                            v-model="moduleForm.asset_code" :disabled="true"
                            placeholder="资产编码"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备名称：" prop="stake_number">
                        <el-input
                            v-model="moduleForm.stake_number" :disabled="true"
                            placeholder="设备名称"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">

                    <el-form-item label="设备类型：" prop="device_type">
                        <el-select v-model="moduleForm.device_type" placeholder="设备类型：">
                            <el-option
                                v-for="item in dicStory.DEVICE_DEVICE"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                        label="所在位置："
                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        :disabled="true"
                        prop="detail_location"
                    >
                        <el-input
                            v-model="moduleForm.device_location"
                            :disabled="true"
                            placeholder="所在位置"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        label="设备IP"
                        prop="ip"
                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        class="elinput"
                    >
                        <ip-input
                            ip-type="ip"
                            :disabled="true"
                            :config-ip="moduleForm.ip"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            @getIp="getIp"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        label="子网掩码："
                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        prop="subnet_mask"
                        class="elinput"
                    >
                        <ip-input
                            ip-type="subnet"
                            :config-ip="moduleForm.subnet_mask"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            @getMask="getMask"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
                    <el-col :span="8">
                        <el-form-item label="所属车架：" prop="device_location">
                            <el-select
                                v-model="moduleForm.device_location"
                                placeholder="所属车架"
                                @change="selectChange"
                            >
                                <el-option
                                    v-for="item in dicStory.DEVICE_LOCATION"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            <el-row>
                <el-col :span="8">
                    <el-form-item label="设备品牌：">
                        <el-select v-model="moduleForm.brand" placeholder="设备品牌：">
                            <el-option
                                v-for="item in dicStory.DEVICE_BRAND"
                                :key="item.code"
                                :label="item.name"
                                :value="item.code"
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备型号：" prop="device_model">
                        <el-input v-model="moduleForm.device_model" placeholder="设备型号"/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="设备用途：" prop="device_usage">
                        <el-input
                            v-model="moduleForm.device_usage" :disabled="true"
                            placeholder="设备用途"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="投入使用时间：" prop="use_time">
                        <el-date-picker
                            v-model="moduleForm.use_time"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            @change="chageUseTime"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="预计报废时间：" prop="end_time">
                        <el-date-picker
                            v-model="moduleForm.end_time"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            @change="changeEndTime"
                        />
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="质保年限：">
                        <el-input
                            v-model="moduleForm.warranty_period"
                            :disabled="true"
                            placeholder="质保年限"
                        />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- </div> -->
        <div class="btn">
            <el-button size="small" @click="closeDialog()">关闭</el-button>
            <el-button
                type="primary"
                size="small"
                :loading="ifLoading"
                data-attr="兼容eslint兼容eslint兼容eslint"
                @click="submitForm('moduleForm')"
            >
                确认提交
            </el-button>
        </div>
    </div>
</template>

<script>
import {
    EDIT_TYPE,
    DEVICE_TYPE,
    DEVICE_LOCATION,
    DEVICE_STATION,
    SYSTEM_TYPE,
    DEVICE_DEVICE,
    validatorMax32,
    validateStakeNumber,
    validateSpace,
    specialcharacters,
    specialIp,
} from '../../DeviceEdit/json';
import {pullDics, pulleList} from '../servies';
import {deviceViewList, deviceEditList} from '../../DeviceEdit/servies';
import IpInput from './IpInput.vue';
/* eslint-disable camelcase */
export default {
    components: {
        IpInput,
    },
    props: {
        id: {
            type: Number,
            default: () => null,
        },
        rowdata: {
            type: Object,
        },
        handleCloseModule: {
            type: Function,
            default: null,
        },
        getTableData: {
            type: Function,
            default: null,
        },
        getNewList: {
            type: Function,
            default: null,
        },
        queryType: {
            type: Number,
            default: null,
        },
        default: null,
    },
    data() {
        return {
            moduleForm: {},
            formData: {},
            dicStory: {
                EDIT_TYPE,
                DEVICE_TYPE,
                DEVICE_LOCATION,
                DEVICE_BRAND: {},
                DEVICE_STATION,
                SYSTEM_TYPE,
                DEVICE_DEVICE,
            },
            labelPosition: 'right',
            ifLoading: false,
            visibale: this.visible,
            form: {},
            rules: {
                device_location: [{required: true, message: '请选择正确的时间', trigger: 'blur'}],
                use_time: [{required: true, message: '请选择正确的时间', trigger: 'blur'}],
                status: [{required: true, message: '请输入正确的设备名称', trigger: 'blur'}],
                asset_code: [{required: true, message: '资产编码', trigger: 'blur'}],
                ip: [
                    {required: true, message: '请输入正确的IP地址', trigger: 'blur'},
                    {validator: specialIp, trigger: 'blur'},
                ],
                device_usage: [{required: false, message: '不允许输入特殊符号及空格', trigger: 'blur'}],
                device_model: [
                    {required: false, message: '不允许输入特殊符号', trigger: 'blur'},
                    {validator: specialcharacters, trigger: 'blur'},
                ],
                device_name: [
                    {required: true, message: '请输入设备桩号', trigger: 'blur'},
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                stake_number: [
                    {required: false, message: '请输入设备桩号', trigger: 'blur'},
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateStakeNumber, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
            },
        };
    },
    watch: {
        id() {
            this.getList();
            this.getFormList();
        },
    },
    created() {
        this.getList();
        this.getFormList();
    },
    methods: {
        getIp(ipInfo) {
            const {ip} = ipInfo;
            this.moduleForm.ip = ip;
        },
        getMask(ipInfo) {
            const {subnet_mask} = ipInfo;
            this.moduleForm.subnet_mask = subnet_mask;
        },
        submitForm(formName) {
            const params = {
                ...this.moduleForm,
                type: JSON.parse(window.localStorage.getItem('menuActive')),
                use_time: !this.moduleForm.use_time
                    ? ''
                    : this.$moment(this.moduleForm.use_time).format('YYYY-MM-DD'),
                end_time: !this.moduleForm.end_time
                    ? ''
                    : this.$moment(this.moduleForm.end_time).format('YYYY-MM-DD'),
                brand: this.moduleForm.brand === '请选择设备品牌' ? 0 : this.moduleForm.brand,
            };
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const data = await deviceEditList(params);
                    if (data.code !== 0) {
                        this.$message({
                            type: 'warning',
                            message: data.msg,
                        });
                        return false;
                    }
                    this.$message({
                        type: 'success',
                        message: '编辑成功!',
                    });
                    // window.history.go(0);
                    this.handleCloseModule();
                    if (this.getTableData) {
                        this.getTableData();
                    }
                    else if (this.getNewList) {
                        this.getNewList();
                    }

                }
            });
        },
        async getList() {
            // const params = {
            //     id: this.id
            // };
            const type = JSON.parse(window.localStorage.getItem('selectCode'));
            if (this.queryType === 1) {
                const data = await pulleList({id: this.id});
                this.dicStory.DEVICE_BRAND = data.brand;
            }
            else {
                const pullDicsData = await pullDics({type});
                this.dicStory.DEVICE_BRAND = pullDicsData.brand;
            }
        },
        async getFormList() {
            const params = {
                id: this.id,
            };
            const data = await deviceViewList(params);
            const end_time = this.$moment(this.rowdata.end_time).format('YYYY');
            const use_time = this.$moment(this.rowdata.use_time).format('YYYY');
            this.endTime = this.$moment(this.rowdata.end_time).format('YYYY');
            this.useTime = this.$moment(this.rowdata.use_time).format('YYYY');
            this.moduleForm = {
                ...data,
                warranty_period: end_time - use_time,
                brand: data.brand === 0 ? '请选择设备品牌' : data.brand,
            };
            this.endTime = end_time;
            this.useTime = use_time;
        },
        selectChange(val) {
            console.log(val, 'xxxx');
        },
        changeEndTime(val) {
            this.endTime = new Date(val).getFullYear();
            this.moduleForm.warranty_period = this.endTime - this.useTime;
        },
        chageUseTime(val) {
            this.useTime = new Date(val).getFullYear();
            this.moduleForm.warranty_period = this.endTime - this.useTime;
        },
        closeDialog() {

            this.ifLoading = false;
            if (this.handleCloseModule) {
                this.handleCloseModule();
                this.getList();
                this.getFormList();
            }
        },
    },
};
</script>

<style lang="less">
.search {
    .box {
        width: 100%;
        height: 480px;
        padding-bottom: 20px;
        box-sizing: border-box;
        border: none;
        overflow-y: auto;
        margin-left: 71px;
        // .el-row {
        //     margin: 20px 0px !important
        // }

        .el-select {
            width: 290px;
            height: 44px;
            margin-right: 15px;

            .el-input__inner {
                height: 38px;
                line-height: 36px;
                font-size: 14px;
                background-color: #081e43;
                border: 1px solid #0d3271 !important;
                box-sizing: border-box;
            }
        }

        .el-input {
            width: 290px;
            height: 44px;

            .el-input__inner {
                height: 38px;
                line-height: 38px;
            }
        }

        .select-name {
            display: inline-block;
            width: 64px;
            line-height: 38px;
            font-size: 14px;
            color: #ebf1ff;
            margin-right: 10px;
        }
    }

    .table {
        min-height: 500px;
        padding: 0 20px;
        box-sizing: border-box;

        .el-button--text {
            color: #02d8f2;
        }
    }

    .bottom {
        margin-top: 27px;
        text-align: center;
    }

    .el-button--mini,
    .el-button--small {
        font-size: 14px;
    }

    .el-table--small th {
        text-align: center;
    }

    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
        background-color: transparent;
    }

    .el-input__inner {
        color: #fff;
    }

    .el-table__fixed-right::before,
    .el-table__fixed::before {
        background-color: transparent;
    }
}

.title {
    width: 100%;
    height: 24px;
    padding-left: 14px;
    line-height: 24px;
    color: #dcedff;
    font-size: 16px;
    font-weight: 600;
    box-sizing: border-box;
    position: relative;
    // margin-bottom: 15px;

    &.margin-30 {
        margin-top: 30px;
    }

    // &::before {
    //     position: absolute;
    //     top: 5px;
    //     left: 0;
    //     content: '';
    //     width: 4px;
    //     height: 12px;
    //     background-color: #47c2ff;
    // }
}

.btn {
    width: 320px;
    display: flex;
    align-items: right;
    height: 42px;
    // background: #f9fafc;
    margin: 12px 75%;

    .el-button {
        width: 100%;
        border: 0;

        &:nth-child(1) {
            height: 42px;
            background-color: #1246a6;
            font-size: 14px;
            color: #fff;
        }

        &:nth-child(2) {
            // margin: 0;
            // margin-top: 25px;
            height: 42px;
            background-color: #1246a6;
            font-size: 14px;
        }
    }
}

.elinput {
    width: 427px !important;
}
</style>
