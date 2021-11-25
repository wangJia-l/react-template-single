<template>
    <!-- :collapse-transition="false"
        :default-active="filterRouterActive()"
        :default-openeds="isOpen" -->
    <el-menu
        class="operation-management-aside-menu"
        unique-opened
        router
        background-color="#0b1d3f"
        text-color="#E6EDFF"
        active-text-color="#ffffff"
        :default-active="action"
    >
        <div class="infrastructure">
            <i class="el-icon-s-order" style="font-size: 18px"></i>
            设备记录查询
        </div>
        <template v-for="menu in tablist">
            <div :key="getItemPath(menu.path)">
                <!-- <span class="menu-texts">{{ menu.titles }}</span> -->
                <!-- 没有子菜单 -->
                <template>
                    <el-menu-item :index="menu.path">
                        <!-- <i class="submenu-icon" :class="`submenu-icon-${menu.meta.icon}`"></i> -->
                        <!-- <img class="common-icon" :src="getIcon(menu.meta.icon)" alt="" /> -->
                        <span class="menu-text">
                            {{ menu.title }}
                        </span>
                        <!-- <span class="getLot">></span> -->
                        <!-- <i class="el-icon-arrow-right"></i> -->
                    </el-menu-item>
                </template>
            </div>
        </template>
    </el-menu>
</template>
<script>
export default {
    data() {
        return {
            tablist: [
                {title: '故障告警信息', path: '/fault'},
                {title: '维修记录', path: '/repair'},
                {title: '维保提醒', path: '/reminder'},
                {title: '报废记录', path: '/scrap'},
            ],
            action: '/fault',
        };
    },
    methods: {
        getItemPath() {},
    },
};
</script>

<style lang="less">
@buttonWidth: 0.5rem;
@subMenuBGC: #103168;
@backgroundColor: #0a1424;

.operation-management-aside-menu {
    text-align: left;
    width: 260px;

    &.el-menu {
        border-right: none;
        height: 170px;

        .el-icon-arrow-right {
            display: inline-block;
            // transform: rotate(270deg);
            font-size: 10px;
            text-align: center;
            line-height: 56px;
            position: absolute;
            right: 55px;
        }

        .el-menu-item {
            position: relative;
            height: 56px;
            line-height: 56px;
            font-size: 0.14rem;
            border-bottom: 0.01rem solid @backgroundColor;
            color: #fff !important;
            display: flex;

            &.is-active {
                background: #1e54b0 !important;
            }
        }
    }
}

.el-aside {
    background-color: #0b1d3f !important;
}

.getLot {
    font-size: 16px;
    margin-left: 10px;
    // color: #4B69A1;
}

.common-icon {
    width: 14px;
    padding-right: 18px;
}

.menu-text {
    justify-content: center;
    text-align: center;
    font-size: 14px;
    line-height: 56px;
    align-items: center;
    padding-left: 53px;
}

.infrastructure {
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding-left: 30px;
    color: #fff;
    background: #103168;
}

.el-icon-s-order {
    color: #4a94dd;
}
</style>
