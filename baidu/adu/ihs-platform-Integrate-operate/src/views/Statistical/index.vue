<template>
    <div class="h">
        <div class="breadcrumb-box">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{path: '/'}">资产综合查询</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/search'}">设备信息查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-container>
            <el-aside class="aside-content" style="width: 260px">
                <aside-meun/>
            </el-aside>
            <el-main>
                <transition name="fade-transform" mode="out-in">
                    <router-view/>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import AsideMeun from './tab/index.vue';
export default {
    components: {
        AsideMeun,
    },
};
</script>

<style lang="less" scoped>
.h {
    height: 100%;
}

.el-container {
    height: calc(100% - 50px);
    background-color: #071020 !important;
}

.aside-content {
    min-height: calc(100% - 40px) !important;
}

.content {
    width: 100%;
    display: flex;
    background-color: #081e43 !important;
    border-radius: 5px;

    .left_menu {
        width: 100px;
        height: 100%;
    }

    .right_main {
        height: 100%;
    }
}

.el-aside {
    height: 170px;
    width: 100px;
    margin-top: 18px;
    border-radius: 5px;
}
</style>
