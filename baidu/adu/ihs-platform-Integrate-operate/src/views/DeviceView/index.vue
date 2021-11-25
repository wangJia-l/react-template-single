<template>
    <div class="device-view">
        <div class="breadcrumb-box">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/search'}">资产综合查询</el-breadcrumb-item>
                <el-breadcrumb-item>设备名称</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="center">
            <div class="left">
                <div class="titles">
                    <p @click="routerGo">
                        <img
                            src="../../assets/jian.png"
                            alt=""
                        >
                        设备详情
                    </p>
                    <p>
                        <el-button
                            type="text"
                            size="small"
                            icon="el-icon-edit"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            @click="handleEdit"
                        >
                            编辑
                        </el-button>
                    </p>
                </div>

                <div class="box">
                    <p class="title">设备基础信息</p>
                    <div class="detail-list">
                        <div class="item">
                            <p>资产编码：</p>
                            <p>{{ fromDataView.asset_code }}</p>
                        </div>
                        <div class="item">
                            <p>运行状态：</p>
                            <p :style="{color: +fromDataView.status === 1 ? '#19aa40' : 'red'}">
                                {{ dicStory.DEVICE_STATUS[fromDataView.status] }}
                            </p>
                        </div>
                        <div class="item">
                            <p>设备桩号：</p>
                            <p>{{ fromDataView.stake_number }}</p>
                        </div>
                        <div class="item">
                            <p>设备名称：</p>
                            <p>{{ fromDataView.device_name }}</p>
                        </div>
                        <div class="item">
                            <p>设备分类：</p>
                            <p>{{ dicStory.SYSTEM_TYPE[fromDataView.system_type] }}</p>
                        </div>
                        <div class="item">
                            <p>设备类型：</p>
                            <p>{{ dicStory.DEVICE_DEVICE[fromDataView.device_type] }}</p>
                        </div>
                        <div class="item">
                            <p>设备位置：</p>
                            <p>{{ dicStory.DEVICE_LOCATION[fromDataView.device_location] }}</p>
                        </div>
                        <div class="item">
                            <p>所属路段：</p>
                            <p>{{ fromDataView.road_section }}</p>
                        </div>
                        <div class="item">
                            <p>设备经纬度：</p>
                            <p>{{ fromDataView.latitude }}</p>
                        </div>
                        <div class="item">
                            <p>父节点：</p>
                            <p>{{ fromDataView.parent_device_name }}</p>
                        </div>
                        <div class="item">
                            <p>设备品牌：</p>
                            <p>{{ dicStory.DEVICE_BRAND[fromDataView.brand] }}</p>
                        </div>
                        <div class="item">
                            <p>设备型号：</p>
                            <p>{{ fromDataView.device_model }}</p>
                        </div>
                        <div class="item">
                            <p>设备用途：</p>
                            <p>{{ fromDataView.device_usage }}</p>
                        </div>
                        <div class="item">
                            <p>SN码：</p>
                            <p>{{ fromDataView.sn }}</p>
                        </div>
                        <div class="item">
                            <p>投入使用时间：</p>
                            <p>{{ fromDataView.use_time }}</p>
                        </div>
                        <div class="item">
                            <p>质保年限：</p>
                            <p>{{ fromDataView.warranty_period }}</p>
                        </div>
                        <div class="item">
                            <p>预计报废时间：</p>
                            <p>{{ fromDataView.end_time }}</p>
                        </div>
                    </div>
                    <p class="title margin-30">设备网络信息</p>
                    <div v-if="fromDataView.system_type === 4" class="detail-list">
                        <div class="item">
                            <p>集中控制器IP：</p>
                            <p>{{ fromDataView.ip }}</p>
                        </div>
                        <div class="item">
                            <p>集中控制器Mac：</p>
                            <p>{{ fromDataView.mac_address }}</p>
                        </div>
                        <div class="item">
                            <p>交换机地址：</p>
                            <p>{{ fromDataView.switch_address }}</p>
                        </div>
                        <div class="item">
                            <p>端口号：</p>
                            <p>{{ fromDataView.port }}</p>
                        </div>
                    </div>
                    <div v-else class="detail-list">
                        <div class="item">
                            <p>交换机地址：</p>
                            <p>{{ fromDataView.switch_address }}</p>
                        </div>
                        <div class="item">
                            <p>端口号：</p>
                            <p>{{ fromDataView.port }}</p>
                        </div>
                        <div class="item">
                            <p>端口名称：</p>
                            <p>{{ fromDataView.device_name }}</p>
                        </div>
                        <div class="item">
                            <p>所属VLAN：</p>
                            <p>{{ fromDataView.vlan }}</p>
                        </div>
                        <div class="item">
                            <p>IP地址：</p>
                            <p>{{ fromDataView.ip }}</p>
                        </div>
                        <div class="item">
                            <p>子网掩码：</p>
                            <p>{{ fromDataView.subnet_mask }}</p>
                        </div>
                        <div class="item">
                            <p>网关：</p>
                            <p>{{ fromDataView.gateway }}</p>
                        </div>
                        <div class="item">
                            <p>通信站名称：</p>
                            <p>{{ fromDataView.co_station }}</p>
                        </div>
                        <div class="item">
                            <p>二维码：</p>
                        </div>
                    </div>
                    <div id="qrcode" ref="qrcode"></div>
                </div>
            </div>
            <div class="right">
                <el-tabs
                    v-model="activeIndex"
                    data-attr="兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint"
                    class="tabEl"
                    value="1"
                    @tab-click="handleClick"
                >
                    <el-tab-pane label="生命周期" name="1">
                        <div class="block">
                            <el-timeline>
                                <el-timeline-item
                                    v-for="(activity, index) in activities"
                                    :key="index"
                                    :icon="activity.icon"
                                    :color="activity.color"
                                    :size="activity.size"
                                    :timestamp="activity.timestamp"
                                >
                                    <p>
                                        <span>{{ activity.status }}</span>
                                        <span>{{ activity.type }}</span>
                                        <span>{{ activity.date }}</span>
                                    </p>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="维修记录" name="2">
                        <!-- <device-record></device-record> -->
                        <!-- <repair-view></repair-view> -->
                        <el-table
                            :data="gitListTable"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            tooltip-effect="dark"
                            :style="{width: '100%', border: 'none'}"
                        >
                            <el-table-column width="55"/>
                            <el-table-column
                                label="序号"
                                width="80"
                                type="index"
                                align="center"
                                fixed="left"
                            />
                            <el-table-column
                                prop="deviceName"
                                label="设备名称"
                                :width="210"
                                class="totledevices"
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
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="ip"
                                label="设备IP"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="reportTime"
                                label="故障时间"
                                width="152"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />

                            <el-table-column
                                prop="longitude"
                                label="故障类型"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="maintenanceMan"
                                label="维修人员"
                                width="170"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="maintenanceStatus"
                                label="维修状态"
                                width="300"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="repairBeginTime"
                                label="	维修开始时间"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="repairFinishTime"
                                label="维修结束时间"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="repairDurationDays"
                                label="维修时长"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="repairAuditStaff"
                                label="维修审核人员"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="malfunctionIdentify"
                                label="故障认定"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="malfunctionLevel"
                                label="故障等级"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="repairDescription"
                                label="维修描述"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="故障告警记录" name="3">
                        <el-table
                            :data="faultTable"
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
                            />
                            <el-table-column
                                prop="deviceName"
                                label="设备名称"
                                :width="210"
                                class="totledevices"
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
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="ip"
                                label="设备IP"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="deviceLocation"
                                label="方向"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="alarmSource"
                                label="故障来源"
                                width="170"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="alarmReason"
                                label="故障原因"
                                width="170"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="reportTime"
                                label="故障发生时间"
                                width="300"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="status"
                                label="故障处置状态"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            >
                                <template slot-scope="scope">
                                    <div v-if="scope.row.status === '1'" class="Configured">
                                        运营中
                                    </div>
                                    <div v-else class="notconfigured">关闭</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="repairCount"
                                label="累计维修次数"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <!-- <el-table-column
                            prop="status"
                            label="预计报废时间"
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
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="改造记录" name="4">
                        <el-table
                            :data="scrapTable"
                            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            tooltip-effect="dark"
                            :style="{width: '100%', border: 'none'}"
                        >
                            <el-table-column width="55"/>
                            <el-table-column
                                label="序号"
                                width="80"
                                type="index"
                                align="center"
                                fixed="left"
                            />
                            <el-table-column
                                prop="deviceName"
                                label="设备名称"
                                :width="210"
                                class="totledevices"
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
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="ip"
                                label="设备IP"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="deviceLocation"
                                label="方向"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="parking"
                                label="维保日期"
                                width="170"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="status"
                                label="维修次数"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="scrapReason"
                                label="废旧处置原因"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="disposalWhereabouts"
                                label="废旧去向"
                                width="150"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="responsibilityPerson"
                                label="责任人"
                                width="170"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="scrapTime"
                                label="处理时间"
                                width="170"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                            <el-table-column
                                prop="disposalDescription"
                                label="报废描述"
                                width="170"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            />
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <el-dialog
            title="信息编辑"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            :visible.sync="dialogFormVisible"
            width="69%"
            height="96%"
            :close-on-click-modal="false"
        >
            <!-- :rowdata="rowdata" -->
            <module-edits
                :id="rowId" :handle-close-module="handleCloseModule"
                :get-list="getList"
                :query-type="queryType"
            />
        </el-dialog>
        <el-dialog
            title="信息编辑"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            :visible.sync="moduleVisible"
            width="69%"
            height="96%"
            :close-on-click-modal="false"
        >
            <module-edit
                :id="rowId"
                :rowdata="rowdata"
                :handle-close-module="handleCloseModule"
                :get-new-list="getList"
                :query-type="queryType"
            />
        </el-dialog>
    </div>
</template>

<script>
import {NAV_LIST} from './config';
import {DEVICE_STATUS, SYSTEM_TYPE, DEVICE_BRAND, DEVICE_LOCATION, DEVICE_DEVICE, DEVICE_FAULT} from './json';
import {repairTableList, faultList, scrapList, scrapLef, deviceViewList} from './servies';
import ModuleEdits from '../Search/components/ModuleEmit.vue';
import ModuleEdit from '../Search/components/ModuleEit.vue';
import QRCode from 'qrcodejs2';

export default {
    components: {
        ModuleEdits,
        ModuleEdit,
    },
    data() {
        return {
            activities: [],
            reverse: true,
            gitListTable: [],
            moduleVisible: false,
            faultTable: [],
            scrapTable: [],
            NAV_LIST,
            activeIndex: '1',
            fromDataView: {},
            rowdata: {},
            dialogFormVisible: false,
            rowId: !this.$route.query.id ? '' : this.$route.query.id * 1,
            queryType: !this.$route.query.type ? 0 : this.$route.query.type * 1,
            dicStory: {
                DEVICE_STATUS,
                SYSTEM_TYPE,
                DEVICE_BRAND,
                DEVICE_LOCATION,
                DEVICE_DEVICE,
                DEVICE_FAULT,
            },
            id: !this.$route.query.id ? '' : this.$route.query.id * 1,
            device_name: '',
            system_type: '',
        };
    },
    watch: {
        activeIndex() {
            this.allList();
        },
    },
    created() {
        this.getList();
        this.allList();
    },

    methods: {
        handClickView() {
            console.log('xxxx'); // eslint-disable-line
        },
        handleCloseModule() {
            this.dialogFormVisible = false;
            this.moduleVisible = false;
        },
        // 展示二维码
        payOrder() {
            this.innerVisible = true;
            // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
            this.qrcode = this.fromDataView.qrcode_url;
            // 使用$nextTick确保数据渲染
            this.$nextTick(() => {
                this.crateQrcode();
            });
        },
        // 生成二维码
        crateQrcode() {
            this.qr = new QRCode('qrcode', {
                width: 90,
                height: 90, // 高度
                text: this.qrcode, // 二维码内容
                // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f'
                // foreground: '#ff0'
            });
        },
        handleEdit() {
            const menu = window.localStorage.getItem('selectCode');
            if (Number(menu[0]) === 2 || Number(menu[0]) === 3) {
                this.moduleVisible = true;
            }
            else if (Number(menu[0]) === 1 || Number(menu[0]) === 4) {
                this.dialogFormVisible = true;
            }
        },
        handleClick(tab, event) {
            this.activeIndex = tab.$options.propsData.name;
        },
        async getList() {
            const params = {
                id: !this.$route.query.id ? '' : this.$route.query.id,
            };
            const data = await deviceViewList(params);
            const end_time = this.$moment(data.end_time).format('YYYY');
            const use_time = this.$moment(data.use_time).format('YYYY');
            this.fromDataView = {
                ...data,
                warranty_period: end_time - use_time,
                sn: data.sn === '0' ? '无' : data.sn,
                latitude: data.latitude + ',' + data.longitude,
            };
            this.rowdata = {
                ...data,
                warranty_period: end_time - use_time,
                sn: data.sn === '0' ? '无' : data.sn,
                latitude: data.latitude + ',' + data.longitude,
            };
            this.device_name = data.device_name;
            this.system_type = data.system_type;
            this.payOrder();
        },
        routerGo() {
            this.$router.go(-1);
        },
        async allList() {
            if (this.activeIndex === '1') {
                const data = await scrapLef({deviceId: this.id});
                const newData = data.map(item => {
                    return {
                        ...item,
                        color: '#62A4FF',
                    };
                });
                this.activities = newData;
            }
            else if (this.activeIndex === '2') {
                const params = {
                    alarmEndTime: '',
                    alarmReason: '',
                    alarmStartTime: '',
                    device: this.device_name,
                    pageNo: 1,
                    pageSize: 10,
                    status: '',
                    systemType: this.system_type,
                };
                const data = await repairTableList(params);
                this.gitListTable = data.records.map(item => {
                    return {
                        ...item,
                        maintenanceStatus: item.maintenanceStatus === 0 ? '未处置' : item.maintenanceStatus,
                        deviceType: this.dicStory.DEVICE_DEVICE[item.deviceType],
                    };
                });
            }
            else if (this.activeIndex === '3') {
                const paramss = {
                    alarmEndTime: '',
                    alarmReason: '',
                    alarmStartTime: '',
                    device: this.device_name,
                    pageNo: 1,
                    pageSize: 10,
                    status: '',
                    systemType: this.system_type,
                };
                const data1 = await faultList(paramss);
                this.faultTable = data1.records.map(item => {
                    return {
                        ...item,
                        deviceLocation: this.dicStory.DEVICE_LOCATION[item.deviceLocation],
                        alarmSource: this.dicStory.DEVICE_FAULT[item.alarmSource],
                        deviceType: this.dicStory.DEVICE_DEVICE[item.deviceType],
                    };
                });
            }
            else if (this.activeIndex === '4') {
                const paramss = {
                    alarmEndTime: '',
                    alarmReason: '',
                    alarmStartTime: '',
                    device: this.device_name,
                    pageNo: 1,
                    pageSize: 10,
                    status: '',
                    systemType: this.system_type,
                };
                const data1 = await scrapList(paramss);
                this.scrapTable = data1.records.map(item => {
                    return {
                        ...item,
                        deviceLocation: this.dicStory.DEVICE_LOCATION[item.deviceLocation],
                        deviceType: this.dicStory.DEVICE_DEVICE[item.deviceType],
                    };
                });
            }
        },
    },
};
</script>

<style lang="less">
@import url('./style');

.name-wrapper {
    .el-tag,
    .el-popover__reference {
        background: none !important;
        font-size: 14px !important;
        border: none !important;
        cursor: pointer;
    }
}

.el-table::before {
    border: none;
    background: none;
}

.el-table__fixed {
    height: 100%;
}

.el-table__fixed::before {
    background: none;
}

.block {
    margin: 36px 52px;
    // width: 100%;
    height: 770px;
    overflow-y: scroll;

    p {
        width: 346px;
        height: 40px;
        display: flex;
        align-items: center;
        background-image: linear-gradient(270deg, rgba(11, 49, 107, 0) 0%, #06203d);
        // margin: 55px 15px;
        color: #fff;
        border: 1px solid #06203d;

        span {
            flex: 1;
            margin-left: 15px !important;
        }

        span:nth-child(1) {
            color: #80b0ff;
        }
    }

    .el-timeline {
        margin: 1px;
    }
}

.el-tabs__item:focus.is-active.is-focus:not(:active) {
    box-shadow: 0 0 2px 2px #05101d inset !important;
}

.el-tabs__nav-scroll {
    margin-left: 20px;
}

.el-tabs__item {
    color: #4f82b7 !important;
}

.el-tabs__nav-wrap::after {
    background: #05101d !important;
}

.is-top {
    color: #a2d6ff !important;
}
</style>
