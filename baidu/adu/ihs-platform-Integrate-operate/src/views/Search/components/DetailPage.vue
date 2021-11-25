<template>
    <div class="device-detail-edit-page">
        <detail-show
            v-show="!ifEdit" :form-info="formInfo"
            @changeIfEdit="changeIfEdit"
        />
        <div v-show="ifEdit" class="item-form">
            <el-form
                ref="form"
                :model="form"
                :rules="rules"
                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint"
            >
                <el-form-item label="是否带SN号" prop="ifSn">
                    <el-radio-group v-model="form.ifSn">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    v-if="form.ifSn"
                    label="SN号"
                    prop="sn"
                    class="relative-box"
                    data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                >
                    <el-input v-model="form.sn" placeholder="请输入SN号"/>
                </el-form-item>
                <el-form-item label="是否带设备IP" prop="ifIP">
                    <el-radio-group v-model="form.ifIP">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    v-if="form.ifIP"
                    label="设备IP"
                    prop="ip"
                    data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                >
                    <ip-input
                        :ip-type="true"
                        :config-ip="configIp"
                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                        @getIp="getIp"
                    />
                </el-form-item>
                <el-form-item label="设备名称" prop="device_name">
                    <el-input v-model="form.device_name" placeholder="请输入设备名称"/>
                </el-form-item>
                <el-form-item label="设备类型" prop="device_type">
                    <el-select v-model="form.device_type" placeholder="请选择设备类型">
                        <el-option
                            v-for="item in deviceTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="ifBar"
                    label="杆件类型"
                    prop="bar"
                    data-attr="兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint"
                >
                    <el-select v-model="form.bar" placeholder="请选择杆件类型">
                        <el-option
                            v-for="item in barList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="ifControl"
                    label="管控车道"
                    prop="control"
                    data-attr="兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint"
                >
                    <el-select v-model="form.control" placeholder="请选择管控车道">
                        <el-option
                            v-for="item in controlList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="系统类型" prop="system_type">
                    <el-select v-model="form.system_type" placeholder="请选择系统类型">
                        <el-option
                            v-for="item in systemTypeList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="设备经/纬度"
                    prop="longLatItude"
                    class="relative-box"
                    data-attr="兼容eslint兼容eslint兼容eslint"
                >
                    <el-input v-model="form.longLatItude" placeholder="请输入经纬度，英文逗号隔开"/>
                    <!-- <el-button
                        class="long-lat-button"
                        type="text"
                        data-attr="兼容eslint兼容eslint兼容eslint"
                        @click="getLongLat"
                    >
                        <img src="../../../assets/GPS.png" />
                        <span>点击获取当前GPS位置</span>
                    </el-button> -->
                </el-form-item>
                <el-form-item label="设备位置" prop="device_location">
                    <el-select v-model="form.device_location" placeholder="请选择设备位置">
                        <el-option
                            v-for="item in deviceLocationList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="使用状态" prop="status">
                    <el-select v-model="form.status" placeholder="请选择使用状态">
                        <el-option
                            v-for="item in statusList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="建设标段" prop="bid_section">
                    <el-select v-model="form.bid_section" placeholder="请选择建设标段">
                        <el-option
                            v-for="item in bidSectionList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="品牌" prop="brand">
                    <el-select v-model="form.brand" placeholder="请选择品牌">
                        <el-option
                            v-for="item in brandList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="投入使用时间" prop="use_time">
                    <el-date-picker
                        v-model="form.use_time"
                        type="date"
                        placeholder="选择投入使用时间"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    />
                </el-form-item>
                <el-form-item label="预计报废时间" prop="end_time">
                    <el-date-picker
                        v-model="form.end_time"
                        type="date"
                        placeholder="选择预计报废时间"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                    />
                </el-form-item>
                <el-form-item label="设备桩号" prop="stake_number">
                    <el-input
                        v-model="form.stake_number"
                        placeholder="请输入设备桩号，如k10+100"
                        @change="stakeNumberChange"
                    />
                </el-form-item>
                <el-form-item label="资产编码" prop="asset_code">
                    <el-input v-model="form.asset_code" placeholder="请输入资产编码"/>
                </el-form-item>
                <el-form-item label="机电设备编码" prop="device_no">
                    <el-input v-model="form.device_no" placeholder="请输入机电设备编码"/>
                </el-form-item>
                <el-form-item label="设备型号" prop="device_model">
                    <el-input v-model="form.device_model" placeholder="请输入设备型号"/>
                </el-form-item>
                <el-form-item label="设备详细位置" prop="detail_location">
                    <el-input v-model="form.detail_location" placeholder="请输入设备详细位置"/>
                </el-form-item>
                <el-form-item label="所属路段" prop="road_section">
                    <el-input v-model="form.road_section" placeholder="请输入所属路段"/>
                </el-form-item>
                <el-form-item
                    ref="unitPrice"
                    label="单价"
                    prop="unit_price"
                    data-attr="兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint"
                >
                    <el-input v-model="form.unit_price" placeholder="请输入单价"/>
                </el-form-item>
                <el-form-item
                    label="是否为备件"
                    prop="spare_parts"
                    class="spare-parts"
                    data-attr="兼容eslint兼容eslint兼容eslint"
                >
                    <el-radio-group v-model="form.spare_parts">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                    <el-button type="text" @click="clearSpareParts">清除</el-button>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input
                        v-model="form.remarks"
                        type="textarea"
                        placeholder="请输入..."
                        data-attr="兼容eslint兼容eslint兼容eslint"
                    />
                </el-form-item>
                <el-form-item label="添加图片" prop="device_pictures_url">
                    <el-upload
                        :action="`${process.env.NODE_ENV === 'production' ? 'http://13.99.25.56:9003' : 'http://180.76.60.136:9003'}/ihs/monitor/device/upload/`"
                        list-type="picture-card"
                        :data="updateData"
                        :file-list="fileList"
                        :on-remove="uploadRemove"
                        :on-success="uploadSuccess"
                        :on-error="uploadError"
                        :limit="3"
                        :on-exceed="uploadExceed"
                        :before-upload="beforeUpload"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div class="botton-box">
                <el-button size="small" @click="closeDialog()">取消修改</el-button>
                <el-button
                    type="primary"
                    size="small"
                    :loading="ifLoading"
                    data-attr="兼容eslint兼容eslint兼容eslint"
                    @click="submitForm()"
                >
                    确认修改
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable camelcase */
import IpInput from './IpInput';
import {cloneDeep} from 'lodash';
import gcoord from 'gcoord';
import DetailShow from './DetailShow.vue';
import {deviceUpdate, deletePicture} from '@/utils';
import {
    DEVICE_TYPE,
    SYSTEM_TYPR,
    DEVICE_LOCATION,
    STATUS,
    BID_SECTION,
    BRAND,
    CONTROL,
    BAR,
    validateSn,
    validateLongLat,
    validatorMax32,
    validatorMax64,
    validatorMax250,
    validateSpace,
} from '../json';

export default {
    components: {
        IpInput,
        DetailShow,
    },
    props: {
        formInfo: {
            type: Object,
            default: () => {},
        },
        id: {
            type: Number,
            default: () => null,
        },
    },
    data() {
        const validateIp = (rule, value, callback) => {
            const re1 = '^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.'
                + '(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$';

            let re = new RegExp(re1);
            value = this.form.ip;
            if (value === 'null.null.null.null' || !value) {
                callback(new Error('请输入设备ip'));
            }
            else if (!re.test(value)) {
                callback(new Error('请输入正确的ip'));
            }
            else {
                callback();
            }
        };
        const validateUseTime = (rule, value, callback) => {
            const endTime = this.form.end_time;
            const flag = this.checkTime(value, endTime);
            if (!flag) {
                callback(new Error('投入使用时间不得晚于预计报废时间'));
            }
            else {
                callback();
            }
        };
        const validateEndTime = (rule, value, callback) => {
            const useTime = this.form.use_time;
            const flag = this.checkTime(useTime, value);
            if (!flag) {
                callback(new Error('预计报废时间不得早于投入使用时间'));
            }
            else {
                callback();
            }
        };
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
            ifEdit: false,
            screenHeightNoChange: true,
            fileList: [],
            defaultEndTime: new Date(),
            deviceTypeOn: 1,
            updateData: {
                id: null,
            },
            configIp: '',
            ifLoading: false,
            ifFirstOpen: true, // 首次进入页面
            buttonText: '确认新增',
            deleteUrls: [],
            rules: {
                ifSn: [{required: true, message: '请选择是否带sn号', trigger: 'change'}],
                sn: [
                    {required: true, message: '请输入sn号', trigger: 'change'},
                    {validator: validateSn, trigger: 'blur'},
                    {validator: validatorMax32, trigger: 'blur'},
                ],
                ifIP: [{required: true, message: '请选择是否带设备IP', trigger: 'change'}],
                device_name: [
                    {required: true, message: '请输入设备名称', trigger: 'blur'},
                    {validator: validatorMax32, trigger: 'blur'},
                ],
                device_type: [{required: true, message: '请选择设备类型', trigger: 'change'}],
                system_type: [{required: true, message: '请选择系统类型', trigger: 'change'}],
                brand: [{required: true, message: '请选择品牌', trigger: 'change'}],
                bar: [{required: true, message: '请选择杆件类型', trigger: 'change'}],
                control: [{required: true, message: '请选择管控车道', trigger: 'change'}],
                longLatItude: [
                    {required: true, message: '请输入设备经纬度', trigger: 'change'},
                    {validator: validateLongLat, trigger: 'change'},
                ],
                device_location: [{required: true, message: '请选择设备位置', trigger: 'change'}],
                status: [{required: true, message: '请选择使用状态', trigger: 'change'}],
                bid_section: [{required: true, message: '请选择建设标段', trigger: 'change'}],
                ip: [{validator: validateIp, required: true, trigger: 'change'}],
                asset_code: [
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                device_no: [
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                device_model: [
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                detail_location: [
                    {validator: validatorMax64, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                road_section: [
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                unit_price: [
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                remarks: [
                    {validator: validatorMax250, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                stake_number: [
                    {required: true, message: '请输入设备桩号', trigger: 'blur'},
                    {validator: validatorMax32, trigger: 'blur'},
                    {validator: validateStakeNumber, trigger: 'blur'},
                    {validator: validateSpace, trigger: 'blur'},
                ],
                use_time: [
                    {required: true, message: '请选择投入使用时间', trigger: 'change'},
                    {validator: validateUseTime, trigger: 'change'},
                ],
                end_time: [
                    {required: true, message: '请选择预计报废时间', trigger: 'change'},
                    {validator: validateEndTime, trigger: 'change'},
                ],
            },
            form: {
                ifSn: true,
                ifIP: true,
                use_time: '2021-8-30',
                end_time: '2026-8-30',
            },
            // 设备管理字典
            deviceTypeList: DEVICE_TYPE,
            systemTypeList: SYSTEM_TYPR,
            deviceLocationList: DEVICE_LOCATION,
            statusList: STATUS,
            bidSectionList: BID_SECTION,
            brandList: BRAND,
            barList: BAR,
            controlList: CONTROL,
        };
    },
    computed: {
        ifControl() {
            const device_type = this.form.device_type;
            if (!device_type) {
                return false;
            }
            const whiteList = [5, 6, 21];
            if (whiteList.includes(device_type)) {
                return true;
            }
            return false;
        },
        ifBar() {
            const device_type = this.form.device_type;
            if (!device_type) {
                return false;
            }
            const whiteList = [1, 2, 4, 5, 6, 7, 8, 13, 14, 17, 18, 19];
            if (whiteList.includes(device_type)) {
                return true;
            }
            return false;
        },
    },
    watch: {
        formInfo() {
            this.ifEdit = false;
            this.getDeviceInfo();
        },
        'form.control'(value) {
            if (value && value === 99 && !this.ifFirstOpen) {
                this.$message({
                    type: 'warning',
                    message: '请在最下方备注中添加说明',
                });
            }
        },
        'form.bar'(value) {
            if (value && value === 99 && !this.ifFirstOpen) {
                this.$message({
                    type: 'warning',
                    message: '请在最下方备注中添加说明',
                });
            }
        },
        'form.brand'(value) {
            if (value && value === 99 && !this.ifFirstOpen) {
                this.$message({
                    type: 'warning',
                    message: '请在最下方备注中添加说明',
                });
            }
        },
        'form.device_type'(value) {
            if (value && value === 99 && !this.ifFirstOpen) {
                this.$message({
                    type: 'warning',
                    message: '请在最下方备注中添加说明',
                });
            }
        },
        'form.device_location'(value) {
            if (value && value === 99 && !this.ifFirstOpen) {
                this.$message({
                    type: 'warning',
                    message: '请在最下方备注中添加说明',
                });
            }
        },
        'form.status'(value) {
            if (value && value === 99 && !this.ifFirstOpen) {
                this.$message({
                    type: 'warning',
                    message: '请在最下方备注中添加说明',
                });
            }
            if (value && value === 2 && !this.ifFirstOpen) {
                this.$message({
                    type: 'warning',
                    message: '请进入运维保障系统，上报故障信息',
                });
            }
        },
    },
    async mounted() {
        this.ifFirstOpen = true;
        await this.getDeviceInfo();
    },
    methods: {
        changeIfEdit() {
            this.ifEdit = true;
        },
        closeDialog() {
            this.$emit('dialogClose');
        },
        stakeNumberChange(value) {
            this.form.stake_number = value ? value.toLowerCase() : null;
        },
        checkTime(stime, etime) {
            stime = stime.split(' ')[0];
            etime = etime.split(' ')[0];
            // 兼容Date.parse Safari
            stime = `${stime.split('-')[0]}-${
                Number(stime.split('-')[1]) >= 10 ? stime.split('-')[1] : `0${Number(stime.split('-')[1])}`
            }-${Number(stime.split('-')[2]) >= 10 ? stime.split('-')[2] : `0${Number(stime.split('-')[2])}`}`;
            etime = `${etime.split('-')[0]}-${
                Number(etime.split('-')[1]) >= 10 ? etime.split('-')[1] : `0${Number(etime.split('-')[1])}`
            }-${Number(etime.split('-')[2]) >= 10 ? etime.split('-')[2] : `0${Number(etime.split('-')[2])}`}`;

            const sdate = Date.parse(stime);
            const edate = Date.parse(etime);
            return !!(edate > sdate);
        },
        clearSpareParts() {
            this.form.spare_parts = null;
        },
        getIp(ipInfo) {
            const {ip} = ipInfo;
            this.form.ip = ip;
        },
        getLongLat() {
            const that = this;
            try {
                window.BMap = BMap;
                let geolocation = new window.BMap.Geolocation();

                geolocation.enableSDKLocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() === 0) {
                        const {latitude, longitude} = r;
                        if (latitude && longitude) {
                            const [lon, lat] = gcoord.transform(
                                [longitude, latitude], // 经纬度坐标
                                gcoord.BD09, // 当前坐标系
                                gcoord.WGS84 // 目标坐标系
                            );
                            that.form = {
                                ...that.form,
                                longLatItude: `${lon.toFixed(6)},${lat.toFixed(6)}`,
                            };
                        }
                    }
                });
            }
            catch (error) {
                this.$message({
                    type: 'warning',
                    message: '经纬度获取失败，请重新获取',
                });
            }
        },
        submitForm() {
            this.ifLoading = true;
            this.$refs.form.validate(async valid => {
                if (valid) {
                    let form = cloneDeep(this.form);
                    if (!form.ifSn) {
                        form.sn = 0;
                    }
                    if (!form.ifIP) {
                        delete form.ip;
                    }
                    const {longLatItude} = form;
                    const long84 = Number(longLatItude.split(',')[0]);
                    const lat84 = Number(longLatItude.split(',')[1]);
                    const [lon, lat] = gcoord.transform(
                        [long84, lat84], // 经纬度坐标
                        gcoord.WGS84, // 当前坐标系
                        gcoord.BD09 // 目标坐标系
                    );
                    form.longitude = lon.toFixed(6);
                    form.latitude = lat.toFixed(6);

                    const id = this.id;
                    form.id = Number(id);
                    form.device_picture_url = this.device_pictures_url;
                    if (!this.ifBar) {
                        delete form.bar;
                    }

                    if (!this.ifControl) {
                        delete form.control;
                    }

                    delete form.ifSn;
                    delete form.ifIP;
                    delete form.longLatItude;
                    const {flag, msg} = await deviceUpdate(form);
                    if (this.deleteUrls && this.deleteUrls.length) {
                        await this.deletePictures();
                    }
                    this.ifLoading = false;
                    this.$alert(msg, '提示', {
                        confirmButtonText: '确定',
                        type: flag ? 'success' : 'warning',
                    });
                    setTimeout(() => {
                        this.$emit('dialogClose', true);
                    }, 800);
                }
                else {
                    this.$message({
                        type: 'warning',
                        message: '请完善表单信息！',
                    });
                    this.ifLoading = false;
                    return false;
                }
            });
        },
        async deletePictures() {
            const params = {
                devicePicturesUrl: this.deleteUrls.join(),
                id: this.id,
            };
            const data = await deletePicture(params);
            if (data && data.flag) {
                this.deleteUrls = [];
            }
        },
        // 获取设备信息
        getDeviceInfo() {
            this.updateData = {
                id: this.id,
            };
            let data = this.formInfo;
            const [lon, lat]
                = data.longitud && data.latitude
                    ? gcoord.transform(
                        [data.longitude, data.latitude], // 经纬度坐标
                        gcoord.BD09, // 当前坐标系
                        gcoord.WGS84 // 目标坐标系
                    )
                    : [null, null];
            // 过滤后端返回的默认值
            Object.keys(data).forEach(key => {
                if (data[key] === -1) {
                    data[key] = null;
                }
            });
            this.form = {
                ...data,
                sn: !data.sn || data.sn === 0 || data.sn === '0' ? '' : data.sn,
                ip: !data.ip || data.ip === 0 || data.ip === '0' ? '' : data.ip,
                ifSn: !(!data.sn || data.sn === 0 || data.sn === '0'),
                ifIP: !(!data.ip || data.ip === 0 || data.ip === '0'),
                longLatItude: lon && lat ? `${lon.toFixed(6)},${lat.toFixed(6)}` : '',
            };
            if (data.device_picture_url && data.device_picture_url.length) {
                this.device_pictures_url = data.device_picture_url.join();
                this.fileList = data.device_picture_url.map((item, index) => {
                    return {
                        name: index + 1,
                        url: item,
                    };
                });
            }
            this.configIp = data.ip ? data.ip : '';
            delete this.form.longitude;
            delete this.form.latitude;
            setTimeout(() => {
                this.ifFirstOpen = false;
            }, 300);
        },
        uploadError(err, file, fileList) {
            // eslint-disable-next-line no-console
            console.log(err, file, fileList, 'uploadError');
        },
        beforeUpload(file) {
            const whiteType = ['image/png', 'image/jpeg'];
            const isLt10M = file.size / 1024 / 1024 < 10;

            if (!file.type || !whiteType.includes(file.type)) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }

            if (!isLt10M) {
                this.$message.error('上传图片大小不能超过 10MB!');
            }
            return isLt10M;
        },
        uploadExceed() {
            this.$message.error('上传图片个数不能超过 3个!');
        },
        async uploadRemove(file, fileList) {
            const ifResponse = !!file.response;
            let url = null;
            // 接口
            if (ifResponse) {
                const responseFile = file && file.response ? file.response : {};
                url
                    = responseFile.data && responseFile.data.device_picture_url
                        ? responseFile.data.device_picture_url
                        : null;
            }
            else {
                url = file.url ? file.url : null;
            }
            if (url) {
                this.deleteUrls.push(url);
            }
            let list = [];
            list = fileList.map(item => {
                const {response = {}} = item;
                if (response && response.data) {
                    return response.data.device_picture_url ? response.data.device_picture_url : '';
                }
                else if (item.url) {
                    return item.url;
                }
            });
            this.device_pictures_url = list && list.length ? list.join() : '';
        },
        uploadSuccess(response, file, fileList) {
            let list = [];

            if (response.code !== 0) {
                this.$message({
                    type: 'warning',
                    message: response.msg,
                });
                const index = fileList.findIndex(item => item === file);
                fileList.splice(index, 1);
            }
            list = fileList.map(item => {
                const {response = {}} = item;
                if (response.code === 0) {
                    return response.data.device_picture_url ? response.data.device_picture_url : '';
                }
                else if (item.url) {
                    return item.url;
                }
                return null;
            });
            this.device_pictures_url = list && list.length ? list.join() : '';
            this.fileList = fileList;
        },
    },
};
</script>

<style lang="less">
@import url('../style');

.el-input--small .el-input__inner {
    background-color: #081e43 !important;
    height: 42px;
    font-size: 14px;
    border: 1px solid #0d3271;
    box-sizing: border-box;
}

.el-input__inner {
    color: #cedef8;
}

.el-textarea__inner {
    background-color: #081e43 !important;
    border: 1px solid #0d3271 !important;
    color: #cedef8 !important;
}

.el-input__inner:hover {
    border-color: #0d3271 !important;
}
</style>
