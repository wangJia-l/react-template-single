<template>
    <div v-if="Object.keys(formDataReadOnly).length" class="detail-show-page-list">
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['device_name'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['device_name'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['sn'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['sn'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['ip'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['ip'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['device_type'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['device_type'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['system_type'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['system_type'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['brand'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['brand'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['longLatItude'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['longLatItude'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['device_location'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['device_location'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['bid_section'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['bid_section'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['status'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['status'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['use_time'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['use_time'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['end_time'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['end_time'].value }}</p>
        </div>
        <div class="line"></div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['bar'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['bar'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['control'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['control'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['asset_code'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['asset_code'].value }}</p>
        </div>
        <div class="line"></div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['device_no'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['device_no'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['device_model'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['device_model'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['stake_number'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['stake_number'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['detail_location'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['detail_location'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['road_section'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['road_section'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['spare_parts'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['spare_parts'].value }}</p>
        </div>
        <div class="item">
            <p>
                <span>{{ formDataReadOnly['remarks'].name }}</span>
                ：
            </p>
            <p>{{ formDataReadOnly['remarks'].value }}</p>
        </div>
        <div class="line"></div>
        <div class="item item-img">
            <div v-for="(src, i) in formDataReadOnly['device_picture_url'].value" :key="i">
                <img :src="src">
            </div>
        </div>
        <div class="botton-box">
            <el-button
                type="primary" size="small"
                @click="goEdit"
            >修 改</el-button>
        </div>
    </div>
</template>

<script>
import {
    DEVICE_TYPE,
    SYSTEM_TYPR,
    DEVICE_LOCATION,
    STATUS,
    BID_SECTION,
    BRAND,
    CONTROL,
    BAR,
    propNameMap,
} from '../json';
export default {
    props: {
        formInfo: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            formDataReadOnly: {},
            responseData: {},
        };
    },
    watch: {
        formInfo() {
            this.getDeviceInfo();
        },
    },
    mounted() {
        this.getDeviceInfo();
    },
    methods: {
        goEdit() {
            this.$emit('changeIfEdit');
        },
        async getDeviceInfo() {
            const data = this.formInfo;
            this.responseData = data ? data : {};
            this.formatData();
        },
        formatData() {
            let data = {};
            const responseData = this.responseData;
            if (responseData && Object.keys(responseData).length) {
                Object.keys(this.responseData).forEach(key => {
                    let name = propNameMap[key];
                    let value = responseData[key];
                    if (key === 'id' || key === 'latitude' || key === 'longitude') {
                        return;
                    }
                    if (key === 'sn') {
                        value = responseData[key] && responseData[key] !== '0' ? responseData[key] : null;
                    }
                    if (key === 'device_type' && responseData[key] !== -1) {
                        const deviceTypeItem = DEVICE_TYPE.find(item => item.value === responseData[key]);
                        value = deviceTypeItem && deviceTypeItem.label ? deviceTypeItem.label : '';
                    }
                    if (key === 'bar' && (!responseData[key] || responseData[key] === -1)) {
                        value = '';
                    }
                    if (key === 'bar' && responseData[key] !== -1) {
                        const barItem = BAR.find(item => item.value === responseData[key]);
                        value = barItem && barItem.label ? barItem.label : '';
                    }
                    if (key === 'control' && (!responseData[key] || responseData[key] === -1)) {
                        value = '';
                    }
                    if (key === 'control' && responseData[key] !== -1) {
                        const controlItem = CONTROL.find(item => item.value === responseData[key]);
                        value = controlItem && controlItem.label ? controlItem.label : '';
                    }
                    if (key === 'system_type' && responseData[key] !== -1) {
                        const systemTypeItem = SYSTEM_TYPR.find(item => item.value === responseData[key]);
                        value = systemTypeItem && systemTypeItem.label ? systemTypeItem.label : '';
                    }
                    if (key === 'device_location' && responseData[key] !== -1) {
                        const deviceLocation = DEVICE_LOCATION.find(item => item.value === responseData[key]);
                        value = deviceLocation && deviceLocation.label ? deviceLocation.label : '';
                    }
                    if (key === 'status' && responseData[key] !== -1) {
                        const statusItem = STATUS.find(item => item.value === responseData[key]);
                        value = statusItem && statusItem.label ? statusItem.label : '';
                    }
                    if (key === 'bid_section' && responseData[key] !== -1) {
                        const bidSectionItem = BID_SECTION.find(item => item.value === responseData[key]);
                        value = bidSectionItem && bidSectionItem.label ? bidSectionItem.label : '';
                    }
                    if (key === 'brand' && responseData[key] !== -1) {
                        const brandItem = BRAND.find(item => item.value === responseData[key]);
                        value = brandItem && brandItem.label ? brandItem.label : '';
                    }
                    if (key === 'spare_parts' && (!responseData[key] || responseData[key] === -1)) {
                        value = '';
                    }
                    if (key === 'spare_parts' && responseData[key] && responseData[key] !== -1) {
                        value = responseData[key] === 1 ? '是' : '否';
                    }
                    if (key === 'use_time' && responseData[key]) {
                        const date = new Date(responseData[key]);
                        value = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                    }
                    if (key === 'end_time' && responseData[key]) {
                        const date = new Date(responseData[key]);
                        value = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
                    }
                    data[key] = {
                        name,
                        value,
                    };
                });
                data.longLatItude = {
                    name: '设备经纬度',
                    value:
                        responseData.longitude && responseData.latitude
                            ? `${responseData.longitude},${responseData.latitude}`
                            : '',
                };
            }
            this.formDataReadOnly = data;
        },
    },
};
</script>

<style lang="less" scoped>
.detail-show-page-list {
    width: 100%;

    .item {
        width: 100%;
        min-height: 24px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        p {
            font-size: 14px;
            line-height: 18px;
            letter-spacing: 0.67px;
            color: #a3c7f5;
            font-weight: 600;

            &:nth-child(1) {
                min-width: 90px;
                width: max-content;
                color: #6681b3;

                span {
                    min-width: 68px;
                    width: max-content;
                    display: inline-block;
                    text-align: justify;
                    text-align-last: justify;
                }
            }
        }
    }

    .line {
        width: 100%;
        height: 0.5px;
        margin: 10px 0;
        box-sizing: border-box;
        background-color: #6681b3;
    }

    .item-img {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        div {
            width: 129.2px;
            height: 76px;
            background: rgba(97, 229, 249, 0.37);
            border-radius: 2px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .botton-box {
        text-align: center;
        padding: 20px 0 10px 0;

        .el-button {
            width: 100%;
            height: 32.5px;
        }
    }
}
</style>
