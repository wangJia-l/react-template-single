<template>
    <el-container class="operation-management-container">
        <el-header><header-common/></el-header>
        <el-container>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import HeaderCommon from './HeaderCommon.vue';
export default {
    components: {
        HeaderCommon,
    },
};
</script>
<style scoped lang="less">
.operation-management-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    background-color: #0b1525;


    .el-header {
        height: 100px !important;
        // padding: 20px 20px 0 20px;
        background-color: rgba(9, 38, 89, 0.2);
    }

    .el-main {
        padding: 0;
    }

    .el-container {
        position: relative;
        // top: -9px;
    }
}
</style>
