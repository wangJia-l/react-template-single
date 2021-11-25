<template>
    <div class="main-container">
        <div class="breadcrumb-box">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/'}">资产综合查询</el-breadcrumb-item>
                <el-breadcrumb-item>设备信息查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="search-content">
            <div class="search-nav">
                <div class="title">
                    <i class="el-icon-s-order" style="font-size: 18px"></i>
                    <span>设备列表</span>
                </div>
                <el-menu
                    data-attr="兼容eslint兼容eslint兼容eslint"
                    :default-active="menuActive"
                    :unique-opened="true"
                    menu-trigger="click"
                    @select="handleSelect"
                >
                    <el-submenu
                        v-for="submenu in NAV_LIST"
                        :key="submenu.type + ''"
                        data-attr="兼容eslint兼容eslint兼容eslint"
                        :index="submenu.type + ''"
                    >
                        <template slot="title">
                            <span>{{ submenu.name }}</span>
                        </template>
                        <div v-for="menu in submenu.children" :key="menu.type + ''">
                            <el-submenu v-if="menu.children && menu.children.length" :index="menu.type + ''">
                                <template slot="title">{{ menu.name }}</template>
                                <el-menu-item
                                    v-for="menuItem in menu.children"
                                    :key="menuItem.type"
                                    :index="menuItem.type + ''"
                                >
                                    {{ menuItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="menu.type + ''">
                                {{ menu.name }}
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="search-page-content">
                <div class="title">设备信息查询</div>
                <div class="box">
                    <div class="top">
                        <div class="input-box">
                            <p>
                                <span class="select-name">查询输入</span>
                                <el-input
                                    v-model="form.keyword"
                                    :placeholder="getKeywordPlaceholder()"
                                    @change="keyWordFormat"
                                />
                            </p>
                            <p v-if="searchFlag === 3 && systemType !== '3' && systemType !== '4'">
                                <span class="select-name">设备类型</span>
                                <el-select
                                    v-model="form.device_type"
                                    placeholder="选择设备类型"
                                    @change="seleChangeCode"
                                >
                                    <el-option
                                        v-for="item in dicStory.DEVICE_TYPE"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                    />
                                </el-select>
                            </p>
                            <p v-if="searchFlag === 3 && (systemType === '1' || systemType === '4')">
                                <span class="select-name">品牌类型</span>
                                <el-select
                                    v-model="form.brand"
                                    placeholder="选择品牌类型"
                                    data-attr="兼容eslint兼容eslint兼容eslint"
                                    @change="seleChange"
                                >
                                    <el-option
                                        v-for="item in dicStory.BRAND"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                    />
                                </el-select>
                            </p>
                            <p v-if="searchFlag === 3 && (systemType === '1' || systemType === '4')">
                                <span class="select-name">使用状态</span>
                                <el-select
                                    v-model="form.status" placeholder="使用状态"
                                    style="margin-right: 0"
                                >
                                    <el-option
                                        v-for="item in dicStory.STATUS"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                            </p>
                            <p v-if="searchFlag === 2">
                                <span class="select-name">设备类型</span>
                                <el-select
                                    v-model="form.device_type"
                                    data-attr="兼容eslint兼容eslint兼容eslint"
                                    placeholder="选择设备类型"
                                    @change="seleChangeCode"
                                >
                                    <el-option
                                        v-for="item in dicStory.DEVICE_TYPE"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                    />
                                </el-select>
                            </p>
                            <p v-if="searchFlag === 1">
                                <span class="select-name">收费门架</span>
                                <el-select
                                    v-model="form.device_type"
                                    data-attr="兼容eslint兼容eslint兼容eslint"
                                    placeholder="选择收费门架"
                                    @change="seleChangeCode"
                                >
                                    <el-option
                                        v-for="item in dicStory.DEVICE_TYPE"
                                        :key="item.code"
                                        :label="item.name"
                                        :value="item.code"
                                    />
                                </el-select>
                            </p>
                        </div>
                        <div class="button-box">
                            <el-button
                                data-attr="兼容eslint兼容eslint兼容eslint"
                                type="primary"
                                icon="el-icon-search"
                                @click="search"
                            >
                                查询
                            </el-button>
                            <el-button
                                data-attr="兼容eslint兼容eslint兼容eslint"
                                type="primary"
                                icon="el-icon-refresh-right"
                                @click="reset"
                            >
                                重置
                            </el-button>
                            <el-button
                                data-attr="兼容eslint兼容eslint兼容eslint"
                                type="primary"
                                icon="el-icon-s-unfold"
                                @click="goExport"
                            >
                                导出
                            </el-button>
                            <el-button
                                v-popover:popover
                                data-attr="兼容eslint兼容eslint兼容eslint"
                                type="primary"
                                icon="el-icon-setting"
                            >
                                设置列表
                            </el-button>
                        </div>
                        <el-popover
                            ref="popover" placement="bottom"
                            width="400" trigger="click"
                        >
                            <div class="popover-box">
                                <div class="popover-box-title">设置列表</div>
                                <el-checkbox-group v-model="tableTitleList" @change="tableTitleChange">
                                    <el-checkbox
                                        v-for="item in TABLE_CHECKBOX"
                                        :key="item.code"
                                        data-attr="兼容eslint兼容eslint兼容eslint"
                                        :label="item.code"
                                    >
                                        {{ item.name }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-popover>
                    </div>
                    <div class="table">
                        <el-table :data="tableData" border>
                            <el-table-column
                                label="序号"
                                width="80"
                                type="index"
                                :index="indexMethod"
                                align="center"
                                fixed="left"
                            />
                            <el-table-column
                                v-for="column in tableTitleList"
                                :key="column"
                                :prop="column"
                                :label="getColumnName(column)"
                                :width="column === 'device_name' ? '200px' : null"
                                align="center"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            >
                                <template slot-scope="scope">
                                    <el-tooltip
                                        v-if="column === 'device_name'"
                                        class="item"
                                        effect="dark"
                                        :content="getRowTemplate(scope.row, column)"
                                        placement="top"
                                    >
                                        <el-button type="text" @click="handleView(scope.row)">
                                            {{ getRowTemplate(scope.row, column) }}
                                        </el-button>
                                    </el-tooltip>
                                    <span v-else>{{ getRowTemplate(scope.row, column) }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                fixed="right"
                                label="操作"
                                width="180"
                                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                            >
                                <template slot-scope="scope">
                                    <el-button
                                        type="text"
                                        size="small"
                                        data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                                        @click="handleEdit(scope.row)"
                                    >
                                        编辑
                                    </el-button>
                                    <el-button
                                        slot="reference"
                                        type="text"
                                        size="small"
                                        @click="handleDelete(scope.row)"
                                    >
                                        删除
                                    </el-button>
                                    <el-button
                                        slot="reference"
                                        type="text"
                                        size="small"
                                        @click="handleWasteDisposal(scope.row)"
                                    >
                                        废旧处置
                                    </el-button>
                                </template>
                            </el-table-column>
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
        <el-dialog
            title="废旧处置"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            :visible.sync="dialogVisible"
            width="350px"
        >
            <waste-disposal :id="wasteDisposalId" :handle-close-waste="handleCloseWaste"/>
        </el-dialog>
        <!-- moduleVisible -->
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
                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                :rowdata="rowdata"
                :handle-close-module="handleCloseModule"
                :get-table-data="getTableData"
            />
        </el-dialog>
        <el-dialog
            title="信息编辑"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            :visible.sync="dialogFormVisible"
            width="69%"
            height="96%"
            :close-on-click-modal="false"
        >
            <module-edits
                :id="rowId"
                data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
                :rowdata="rowdata"
                :handle-close-module="handleCloseModule"
                :get-table-data="getTableData"
            />
        </el-dialog>
    </div>
</template>

<script>
/* eslint-disable camelcase */
import qs from 'qs';
import {SYSTEM_TYPE, STATUS, BID_SECTION, DEVICE_LOCATION, defaultTableTitleList} from './json';
import {deviceList, deleteDevice, sideBar, pullDics, setListDic, getModletypeById} from './servies';
import WasteDisposal from './components/WasteDisposal.vue';
import ModuleEdit from './components/ModuleEit.vue';
import ModuleEdits from './components/ModuleEmit.vue';
export default {
    components: {
        WasteDisposal,
        ModuleEdit,
        ModuleEdits,
    },
    data() {
        return {
            ifFirstSearchById: true,
            rowId: null,
            dialogVisible: false,
            moduleVisible: false,
            selectCode: 1,
            id: null,
            wasteDisposalId: null,
            tableTitleList: defaultTableTitleList,
            TABLE_CHECKBOX: [],
            menuActive: '110001',
            systemType: '1',
            searchFlag: 1,
            tableData: [],
            pagination: {
                total: 0,
                page_size: 10,
                page_no: 1,
            },
            visible: false,
            form: {},
            NAV_LIST: [],
            dicStory: {
                DEVICE_TYPE: [],
                SYSTEM_TYPE,
                BRAND: [],
                STATUS,
                DEVICE_LOCATION,
                BID_SECTION,
            },
            dialogFormVisible: false,
            rowdata: {},
        };
    },
    beforeRouteEnter(to, from, next) {
        const {path} = from;
        next(vm => {
            if (path === '/deviceView') {
                const searchInfo = window.localStorage.getItem('deviceSearchInfo');
                const {menuActive, form = {}} = searchInfo ? JSON.parse(searchInfo) : {};
                vm.menuActive = menuActive;
                vm.form = form;
            }
        });
    },
    watch: {
        form: {
            handler() {
                this.search();
            },
            deep: true,
        },
        menuActive() {
            if (this.ifFirstSearchById) {
                this.ifFirstSearchById = false;
                return;
            }
            this.form = {};
            this.getPullDics();
            this.getTableData();
        },
        systemType() {
            this.getDics();
        },
    },
    async  mounted() {
        this.getDics();
        this.paginationInit();
        const {id} = this.$route.query;
        this.getTableData(id ? id : null);

        if (!id) {
            return;
        }
        const response = await getModletypeById({id});
        const {type} = response ? response : {};
        this.menuActive = type && type[0] ? type[0] : this.menuActive;
    },
    methods: {
        getKeywordPlaceholder() {
            switch (this.systemType) {
                case '1':
                    return '设备名称｜桩号｜设备IP';
                case '2':
                    return '设备名称｜桩号';
                case '3':
                    return '设备名称｜设备IP';
                case '4':
                    return '设备名称｜桩号｜设备IP';
                default:
                    return '设备名称｜桩号｜设备IP';
            }
        },
        goExport() {
            const params = {
                ...this.form,
                device_type: this.form.device_type ? String(this.form.device_type) : this.menuActive,
            };
            const paramsExport = qs.stringify(params);
            window.open(`${process.env.NODE_ENV === 'production' ? 'http://13.99.25.56:9003' : 'http://180.76.60.136:9003'}/ihs/monitor/device/export?${paramsExport}`);
        },
        handleCloseWaste() {
            this.dialogVisible = false;
        },
        handleCloseModule() {
            this.moduleVisible = false;
            this.dialogFormVisible = false;
        },
        // handleModuleClose() {
        //     this.moduleVisible = false;
        // },
        handleWasteDisposal(row) {
            const {id} = row;
            this.wasteDisposalId = id;
            this.dialogVisible = true;
        },
        seleChangeCode(val) {
            this.selectCode = val;
        },
        seleChange(val) {
            this.form.brand = val;
        },
        getRowTemplate(row, column) {
            let template = '';
            switch (column) {
                case 'status':
                    template = row.status.value;
                    break;

                default:
                    template = row[column];
                    break;
            }
            return template;
        },
        getColumnName(column) {
            const columnItem = this.TABLE_CHECKBOX.find(i => i.code === column);
            return columnItem && columnItem.name ? columnItem.name : '';
        },
        async getPullDics() {
            const params = {
                type: this.menuActive,
            };
            window.localStorage.setItem('menuActive', JSON.stringify(this.menuActive));
            const data = await pullDics(params);
            if (!data) {
                return;
            }
            const {brand = [], device = [], flag} = data;
            this.searchFlag = flag ? flag : 1;
            this.dicStory.BRAND = brand;
            this.dicStory.DEVICE_TYPE = device;
        },
        async getDics() {
            this.getPullDics();
            const params = {
                type: this.systemType,
            };
            await Promise.all([sideBar(), setListDic(params)]).then(res => {
                const [response1, response2] = res;

                this.NAV_LIST = response1 && response1.length ? response1 : [];
                this.TABLE_CHECKBOX = response2 && response2.length ? response2 : [];
            });
        },
        tableTitleChange(value) {
            this.tableTitleList = value ? value : [];
        },
        handleSelect(key, object) {
            const systemType = object && object[0] ? object[0] : null;
            this.systemType = systemType;
            this.menuActive = key;
        },
        paginationInit() {
            this.pagination = {
                total: 0,
                page_size: 10,
                page_no: 1,
            };
        },
        keyWordFormat(val) {
            function trim(s) {
                return s.replace(/(^\s*)|(\s*$)/g, '');
            }
            this.form.keyword = val ? trim(val) : '';
        },
        search() {
            this.paginationInit();
            this.getTableData();
        },
        reset() {
            this.form = {};
            this.paginationInit();
            this.getTableData();
        },
        indexMethod(index) {
            const {page_size = 10, page_no = 1} = this.pagination;
            const pageNum = page_size * (page_no - 1) + index + 1;
            return pageNum;
        },
        handleView(row) {
            const {id} = row;
            if (!id) {
                return;
            }
            const deviceSearchInfo = {
                menuActive: this.menuActive,
                form: this.form,
            };
            window.localStorage.setItem('deviceSearchInfo', JSON.stringify(deviceSearchInfo));
            // window.open(`${window.location.origin}/device#/deviceView?id=${id}`);
            this.$router.push({path: `/deviceView?id=${id}`});
            window.localStorage.setItem('selectCode', this.menuActive + '');
        },
        handleEdit(row) {
            const {id} = row;
            this.rowId = id;
            if (!id) {
                return;
            }
            this.rowdata = {
                ...row,
            };
            this.rowId = id;
            if (Number(this.menuActive[0]) === 2 || Number(this.menuActive[0]) === 3) {
                this.moduleVisible = true;
            }
            else if (Number(this.menuActive[0]) === 1 || Number(this.menuActive[0]) === 4) {
                this.dialogFormVisible = true;
            }
            // this.$emit('getTable'，this.getTableData())
        },
        async handleDelete(row) {
            this.$confirm('确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(async () => {
                    const {id} = row;
                    const params = {id};
                    const data = await deleteDevice(params);
                    if (data && data.flag) {
                        this.$message.success('操作成功');
                        this.paginationInit();
                        this.getTableData();
                    }
                    else {
                        this.$message.error(data && data.msg ? data.msg : '操作失败');
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
        },
        handleCurrentChange() {
            this.getTableData();
        },
        fomatTime(time) {
            const date = new Date(time);
            const year = date.getFullYear();
            const month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 >= 10 : `0${date.getMonth() + 1}`;
            const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
            return `${year}.${month}.${day}`;
        },
        async getTableData(id) {
            const params = id
                ? {
                    id,
                }
                : {
                    ...this.pagination,
                    ...this.form,
                    device_type: this.form.device_type ? String(this.form.device_type) : this.menuActive,
                };
            delete params.total;
            const data = await deviceList(params);
            const {list, total} = data;
            // if (id) {
            //     this.menuActive = list && list[0] ? list[0].device_code : this.menuActive;
            // }
            console.log(params);
            let result = list && list.length ? list : [];
            result = result.map(item => {
                const device_type
                    = item.device_type && this.dicStory.DEVICE_TYPE.find(i => i.code === item.device_type)
                        ? this.dicStory.DEVICE_TYPE.find(i => i.code === item.device_type).name
                        : '';
                const system_type
                    = item.system_type && this.dicStory.SYSTEM_TYPE.find(i => i.value === item.system_type)
                        ? this.dicStory.SYSTEM_TYPE.find(i => i.value === item.system_type).label
                        : '';
                const brand
                    = item.brand && this.dicStory.BRAND.find(i => i.code === item.brand)
                        ? this.dicStory.BRAND.find(i => i.code === item.brand).name
                        : '';
                const status = {
                    value:
                        item.status && this.dicStory.STATUS.find(i => i.value === item.status)
                            ? this.dicStory.STATUS.find(i => i.value === item.status).label
                            : '',
                    key: item.status,
                };
                const device_location
                    = item.device_location && this.dicStory.DEVICE_LOCATION.find(i => i.value === item.device_location)
                        ? this.dicStory.DEVICE_LOCATION.find(i => i.value === item.device_location).label
                        : '';

                const bid_section
                    = item.bid_section && this.dicStory.BID_SECTION.find(i => i.value === item.bid_section)
                        ? this.dicStory.BID_SECTION.find(i => i.value === item.bid_section).label
                        : '';
                const sn = item.sn && item.sn !== '0' ? item.sn : null;
                const useTime = this.fomatTime(item.use_time);
                const endTime = this.fomatTime(item.end_time);

                return {
                    ...item,
                    device_type,
                    system_type,
                    device_location,
                    bid_section,
                    brand,
                    status,
                    useTime,
                    endTime,
                    sn,
                };
            });
            this.tableData = result;
            this.pagination.total = total;
        },
    },
};
</script>

<style lang="less">
@import url('./style');

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
    // border: 0;
}

.left .el-input--small .el-input__inner {
    height: 42px !important;
    line-height: 42px !important;
}
</style>
