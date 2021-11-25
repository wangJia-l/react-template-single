<template>
    <div>
        <div class="search-content">
            <div class="search-page">
                <div class="title">信息编辑</div>
                <div class="box">
                    <el-form
                        ref="formValidation"
                        :model="formValidation"
                        label-width="100px"
                        class="demo-ruleForm"
                        size="mini"
                        :rules="rules"
                        :label-position="labelPosition"
                    >
                        <p class="title margin-30">设备基础信息</p>
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="资产编码：">
                                    <el-input
                                        v-model="formValidation.asset_code"
                                        :disabled="true"
                                        placeholder="资产编码"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="运行状态：">
                                    <el-select
                                        v-model="formValidation.status"
                                        :disabled="true"
                                        placeholder="运行状态："
                                    >
                                        <el-option
                                            v-for="item in dicStory.EDIT_TYPE"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备桩号：" prop="stake_number">
                                    <el-input
                                        v-model="formValidation.stake_number"
                                        :disabled="true"
                                        placeholder="设备桩号"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="设备名称：" prop="device_name">
                                    <el-input v-model="formValidation.device_name" placeholder="设备名称"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备分类：">
                                    <el-select
                                        v-model="formValidation.system_type"
                                        :disabled="true"
                                        placeholder="设备类型："
                                    >
                                        <el-option
                                            v-for="item in dicStory.SYSTEM_TYPE"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备类型：" prop="device_type">
                                    <el-select v-model="formValidation.device_type" placeholder="设备类型：">
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
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="设备位置：" prop="device_location">
                                    <el-select
                                        v-model="formValidation.device_location"
                                        placeholder="设备位置"
                                        @change="selectChange"
                                    >
                                        <el-option
                                            v-for="item in dicStory.DEVICE_LOCATION"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="所属路段：" prop="road_section">
                                    <el-input v-model="formValidation.road_section" placeholder="所属路段"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备经纬度：" prop="latitude">
                                    <el-input
                                        v-model="formValidation.latitude"
                                        placeholder="设备经纬度"
                                        :disabled="true"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="父节点：" prop="parent_device_name">
                                    <el-input
                                        v-model="formValidation.parent_device_name"
                                        placeholder="父节点"
                                        :disabled="true"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="设备品牌：">
                                    <el-select v-model="formValidation.brand" placeholder="设备品牌：">
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
                                    <el-input v-model="formValidation.device_model" placeholder="设备型号"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="设备用途：" prop="device_usage">
                                    <el-input
                                        v-model="formValidation.device_usage"
                                        :disabled="true"
                                        placeholder="设备用途"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="SN码：" prop="sn">
                                    <el-input v-model="formValidation.sn" placeholder="SN码"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="投入使用时间：" prop="use_time">
                                    <el-date-picker
                                        v-model="formValidation.use_time"
                                        align="right"
                                        type="date"
                                        placeholder="选择日期"
                                        @change="chageUseTime"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="预计报废时间：" prop="end_time">
                                    <el-date-picker
                                        v-model="formValidation.end_time"
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
                                        v-model="formValidation.warranty_period"
                                        :disabled="true"
                                        placeholder="质保年限"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <p class="title margin-30">设备网络信息</p>
                        <el-row v-if="formValidation.device_type === '12'" type="flex">
                            <el-col :span="8">
                                <el-form-item label="集中控制器IP：" prop="device_type">
                                    <el-input v-model="formValidation.device_type" placeholder="交换机地址"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="集中控制器Mac：" prop="mac_address">
                                    <el-input v-model="formValidation.mac_address" placeholder="交换机地址"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="交换机地址：" prop="switch_address"
                                    class="elIpuntform"
                                >
                                    <ip-input
                                        class="ip-el-input"
                                        ip-type="device"
                                        :config-ip="formValidation.switch_address"
                                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                                        @getDevice="getDevice"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if="formValidation.device_type === '12'" type="flex">
                            <el-col :span="8">
                                <el-form-item label="端口号：" prop="port">
                                    <el-input v-model="formValidation.port" placeholder="交换机地址"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-else type="flex">
                            <el-col :span="8">
                                <el-form-item
                                    label="交换机地址：" prop="switch_address"
                                    class="elIpuntform"
                                >
                                    <ip-input
                                        ip-type="device"
                                        :config-ip="formValidation.switch_address"
                                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                                        @getDevice="getDevice"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="端口号：" prop="port">
                                    <el-input v-model="formValidation.port" placeholder="端口号"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="端口名称：" prop="device_name">
                                    <el-input v-model="formValidation.device_name" placeholder=""/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item label="所属VLAN：" prop="vlan">
                                    <el-input v-model="formValidation.vlan" placeholder="所属VLAN"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="设备IP"
                                    prop="ip"
                                    data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                                    class="elIpuntform"
                                >
                                    <ip-input
                                        ip-type="ip"
                                        :config-ip="formValidation.ip"
                                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                                        @getIp="getIp"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="子网掩码：" prop="subnet_mask"
                                    class="elIpuntform"
                                >
                                    <ip-input
                                        ip-type="subnet"
                                        :config-ip="formValidation.subnet_mask"
                                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                                        @getMask="getMask"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex">
                            <el-col :span="8">
                                <el-form-item
                                    label="网关：" prop="gateway"
                                    class="elIpuntform"
                                >
                                    <!-- <el-input v-model="formValidation.gateway" placeholder="网关"></el-input> -->
                                    <ip-input
                                        ip-type="gateway"
                                        :config-ip="formValidation.gateway"
                                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                                        @getGateway="getGateway"
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="通信站名称：">
                                    <el-select v-model="formValidation.co_station" placeholder="通信站名称：">
                                        <el-option
                                            v-for="item in dicStory.DEVICE_STATION"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="dilingFooter">
                        <el-button type="primary" @click="dialogVisibleEdit">关闭</el-button>
                        <el-button type="primary" @click="editForm('formValidation')">提交编辑</el-button>
                    </div>
                </div>
            </div>
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
    inputNumber,
} from './json';
import {deviceEditList, deviceViewList} from './servies';
import {pullDics} from '../Search/servies';
import IpInput from '../Search/components/IpInput.vue';
export default {
    components: {
        IpInput,
    },
    data() {
        return {
            configIp: '',
            fromDataView: {},
            useTime: 1,
            endTime: 1,
            labelPosition: 'left',
            formValidation: {
                mask: 'mask',
                asset_code: '',
                status: '',
                stake_number: '',
                device_name: '',
                system_type: 1,
                device_location: 1,
                road_section: '',
                latitude: '',
                parent_device_name: '',
                brand: 1,
                device_model: '',
                device_usage: '',
                sn: '',
                use_time: '',
                warranty_period: '',
                end_time: '',
                switch_address: '',
                port: '',
                ip: '',
                subnet_mask: '',
                gateway: '',
                co_station: '',
            },
            dicStory: {
                EDIT_TYPE,
                DEVICE_TYPE,
                DEVICE_LOCATION,
                DEVICE_BRAND: {},
                DEVICE_STATION,
                SYSTEM_TYPE,
                DEVICE_DEVICE,
            },
            stakeNumberChange(value) {
                this.form.stake_number = value ? value.toLowerCase() : null;
            },
            rules: {
                latitude: [{required: true, message: '请输入所属路段', trigger: 'blur'}],
                road_section: [{required: true, message: '请输入所属路段', trigger: 'blur'}],
                device_location: [{required: true, message: '请输入设备位置', trigger: 'blur'}],
                device_type: [{required: true, message: '请输入设备类型', trigger: 'blur'}],
                gateway: [
                    {required: false, message: '请输入正确的IP地址', trigger: 'blur'},
                    {validator: specialIp, trigger: 'blur'},
                ],
                sn: [
                    {required: false, message: '不允许输入特殊符号及空格', trigger: 'blur'},
                    {validator: specialcharacters, trigger: 'blur'},
                ],
                subnet_mask: [
                    {required: false, message: '请输入正确的IP地址', trigger: 'blur'},
                    {validator: specialIp, trigger: 'blur'},
                ],
                ip: [
                    {required: true, message: '请输入正确的IP地址', trigger: 'blur'},
                    {validator: specialIp, trigger: 'blur'},
                ],
                switch_address: [
                    {required: false, message: '请输入正确的IP地址', trigger: 'blur'},
                    {validator: specialIp, trigger: 'blur'},
                ],
                vlan: [
                    {required: false, message: '不允许输入特殊符号及空格', trigger: 'blur'},
                    {validator: specialcharacters, trigger: 'blur'},
                ],
                port: [
                    {required: false, message: '不允许输入特殊符号及空格', trigger: 'blur'},
                    // {validator: specialcharacters, trigger: 'blur'},
                    {validator: inputNumber, trigger: 'blur'},
                ],
                device_usage: [{required: true, message: '不允许输入特殊符号及空格', trigger: 'blur'}],
                device_model: [
                    {required: false, message: '不允许输入特殊符号', trigger: 'blur'},
                    {validator: specialcharacters, trigger: 'blur'},
                ],
                device_name: [
                    {required: false, message: '请输入设备桩号', trigger: 'blur'},
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                stake_number: [
                    {required: true, message: '请输入设备桩号', trigger: 'blur'},
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateStakeNumber, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
            },
        };
    },
    created() {
        this.getViewList();
    },

    methods: {
        dialogVisibleEdit() {
            this.$router.go(-1);
        },
        getIp(ipInfo) {
            console.log(ipInfo);
            const {ip} = ipInfo;
            this.formValidation.ip = ip;
        },
        getMask(ipInfo) {
            console.log(ipInfo);
            const {subnet_mask} = ipInfo;
            this.formValidation.subnet_mask = subnet_mask;
        },
        getGateway(ipInfo) {
            const {gateway} = ipInfo;
            this.formValidation.gateway = gateway;
        },
        getDevice(ipInfo) {
            const {switch_address} = ipInfo;
            this.formValidation.switch_address = switch_address;
        },
        changeEndTime(val) {
            this.endTime = new Date(val).getFullYear();
            this.formValidation.warranty_period = this.endTime - this.useTime;
        },
        chageUseTime(val) {
            this.useTime = new Date(val).getFullYear();
            this.formValidation.warranty_period = this.endTime - this.useTime;
        },
        async getViewList() {
            const type = window.localStorage.getItem('selectCode');
            const pullDicsData = await pullDics({type});
            this.dicStory.DEVICE_BRAND = pullDicsData.brand;
            const params = {
                id: !this.$route.query.id ? '' : this.$route.query.id,
            };
            const data = await deviceViewList(params);

            const end_time = this.$moment(data.end_time).format('YYYY');
            const use_time = this.$moment(data.use_time).format('YYYY');
            this.endTime = this.$moment(data.end_time).format('YYYY');
            this.useTime = this.$moment(data.use_time).format('YYYY');
            this.formValidation = {
                ...data,
                warranty_period: end_time - use_time,
                sn: data.sn === '0' ? '无' : data.sn,
                latitude: data.latitude + ',' + data.longitude,
            // brand:data.brand === 0 ? '请选择设备品牌':data.brand
            };
            this.endTime = end_time;
            this.useTime = use_time;
        },
        selectChange(val) {
            console.log(val, 'xxxx');
        },
        async editForm(formName) {
            const params = {
                ...this.formValidation,
                type: window.localStorage.getItem('selectCode'),
                sn: this.formValidation.sn === '无' ? '0' : this.formValidation.sn,
                use_time: this.$moment(this.formValidation.use_time).format('YYYY-MM-DD'),
                end_time: this.$moment(this.formValidation.end_time).format('YYYY-MM-DD'),
            };
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const data = await deviceEditList(params);
                    console.log(data);
                    if (data.code !== 0) {
                        // this.$message({
                        //     type: 'warning',
                        //     message: data.msg
                        // });
                        return false;
                    }
                    this.$message({
                        type: 'success',
                        message: '编辑成功!',
                    });
                }
            });
        },
    },
};
</script>

<style lang="less">
@import url('./style');

.demo-ruleForm {
    margin-top: 15px;

    & > .title {
        width: 100%;
        height: 24px;
        padding-left: 14px;
        line-height: 24px;
        color: #dcedff;
        font-size: 16px;
        font-weight: 600;
        box-sizing: border-box;
        position: relative;
        margin-bottom: 15px;

        &.margin-30 {
            margin-top: 30px;
        }

        &::before {
            position: absolute;
            top: 5px;
            left: 0;
            content: '';
            width: 4px;
            height: 12px;
            background-color: #47c2ff;
        }
    }
}

.dilingFooter {
    width: 320px;
    display: flex;
    align-items: right;
    height: 42px;
    // background: #f9fafc;
    margin: 24px 80%;

    .el-button {
        width: 100%;
        border: 0;

        &:nth-child(1) {
            height: 42px;
            background-color: #1246a6;
            font-size: 14px;
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

.el-dialog {
    background-color: #0a1c35 !important;
}

.el-upload--picture-card {
    width: 100% !important;
    height: 60px !important;
    line-height: 70px !important;
    background-color: #081e43 !important;
    border-color: #0d3271 !important;
}

.el-dialog .el-dialog__header {
    border-bottom: 0 !important;
    height: 33px;
}

.el-dialog__header {
    padding: 0 20px !important;
    line-height: 30px;
    text-align: left;
    background-color: #1150a6;
    background-image: none;
}

.el-dialog__title {
    font-size: 12px !important;
    color: #cedef8 !important;
    font-weight: 600;
}

.el-dialog__headerbtn {
    top: 8px !important;
}

.el-dialog__headerbtn .el-dialog__close {
    color: #fff !important;
}

.el-form-item__label {
    color: #cedef8 !important;
    font-size: 10px;
    line-height: 24px;
}

.el-radio {
    color: #436197 !important;
}

.el-radio__input.is-checked + .el-radio__label {
    color: #cedef8 !important;
}

.el-radio__input.is-checked .el-radio__inner {
    border-color: #145cbd;
    background: #145cbd;
}

.el-radio__label {
    font-size: 10px;
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    margin-bottom: 10px;
}

.el-upload-list--picture-card .el-upload-list__item {
    width: 50px !important;
    height: 50px !important;
}

.left .el-input--small .el-input__inner {
    height: 42px !important;
    line-height: 42px !important;
}

.elIpuntform {
    width: 381px !important;
}
</style>
