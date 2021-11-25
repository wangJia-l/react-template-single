/* eslint-disable no-irregular-whitespace */
<template>
    <div class="header-common-container">
        <div class="logo"></div>
        <div class="main-container">
            <div class="menu-three">
                <div
                    v-for="menu in menuList"
                    :key="menu.path"
                    class="item"
                    :class="activityMenu === menu.path ? 'on' : ''"
                    @click="menuChange(menu)"
                >
                    {{ menu.name }}
                </div>
            </div>
            <div class="user">
                <img src="../../assets/images/icon-user.png">
                <p>William Lopez</p>
            </div>
        </div>
    </div>
</template>
<script>
import {getMyInfo} from '@/utils/servies';

export default {
    name: '',
    components: {},
    data() {
        return {
            nowTime: {
                day: '',
                time: '',
            },
            titleName: '设备管理系统',
            menuList: [
                {
                    name: '首页',
                    path: '/home',
                },
                {
                    name: '车路协同设备信息',
                    path: '/search',
                },
                // {
                //     name: '设备记录查询',
                //     path: '/statistical',
                // },
            ],
            activityMenu: '/home',
        };
    },
    watch: {
        '$route.path': {
            handler(val) {
                this.getActivityMenu(val);
            },
            deep: true,
        },
    },
    mounted() {
        this.getActivityMenu();
        // this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            const data = await getMyInfo();
            console.log(data, 'getUserInfo');
        },
        getActivityMenu(path) {
            const managementList = ['/serviceArea', '/tollGate', '/maintenance', '/overload'];
            const statisticalList = ['/fault', '/repair', '/reminder', '/scrap'];
            path = path ? path : this.$route.path;
            path = path === '/' ? '/home' : path;
            path = managementList.includes(path) ? '/management' : path;
            path = statisticalList.includes(path) ? '/statistical' : path;
            this.activityMenu = path;
        },
        getNowTime() {
            let myTime = new Date();
            let myYear = myTime.getFullYear();
            let myMonth = myTime.getMonth() + 1 < 10 ? '0' + (myTime.getMonth() + 1) : myTime.getMonth() + 1;
            let myData = myTime.getDate() < 10 ? '0' + myTime.getDate() : myTime.getDate();
            let myHours = myTime.getHours() < 10 ? '0' + myTime.getHours() : myTime.getHours();
            let myMinutes = myTime.getMinutes() < 10 ? '0' + myTime.getMinutes() : myTime.getMinutes();
            let mySeconds = myTime.getSeconds() < 10 ? '0' + myTime.getSeconds() : myTime.getSeconds();

            this.nowTime = {
                day: `${myYear}/${myMonth}/${myData}`,
                time: `${myHours}:${myMinutes}:${mySeconds}`,
            };
        },
        menuChange(menu) {
            const {path} = menu;
            if (path === this.activityMenu) {
                return;
            }
            this.activityMenu = path;
            this.$router.push(path);
        },
    },
};
</script>

<style lang="less">
.header-common-container {
    width: 100%;
    height: calc(100% - 20px);
    margin-top: 20px;
    box-sizing: border-box;
    position: relative;
    z-index: 999;
    display: flex;
    justify-content: space-between;
    background-color: rgba(9, 38, 89, 0.2);

    .logo {
        width: 100px;
        height: 80px;
        background-image: url('../../assets/images/logo.png');
        background-size: cover;
    }

    .main-container {
        width: calc(100% - 100px);
        height: 80px;
        display: flex;
        justify-content: flex-end;
        background-image: url('../../assets/images/system-name.png');
        background-size: auto 60px;
        background-repeat: no-repeat;
        background-position: 10px 10px;

        .user {
            width: 180px;
            height: 80px;
            padding: 0 0 0 30px;
            border-left: 1px solid #0a295e;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            background-color: rgba(9, 38, 89, 0.2);

            & > img {
                width: 24px;
                height: 24px;
            }

            & > p {
                color: #dbf2ff;
                font-size: 14px;
                font-family: DIN-Alternate, sans-serif;
                padding-left: 8px;
            }
        }

        .menu-three {
            width: max-content;
            height: 80px;
            display: flex;

            .item {
                width: 210px;
                text-align: center;
                line-height: 80px;
                color: rgba(223, 230, 255, 0.6);
                font-size: 16px;
                letter-spacing: 2.1px;

                &.on {
                    color: #dfe6ff;
                    background-image: linear-gradient(180deg, rgba(14, 36, 89, 0) 0%, rgba(33, 74, 146, 0.5) 100%);
                }

                &:hover {
                    cursor: pointer;
                    color: #dfe6ff;
                }
            }
        }
    }

    .title-name {
        width: 1880px;
        text-align: center;
        position: absolute;
        font-size: 32px;
        line-height: 32px;
        margin-top: 17px;
        font-weight: 600;
        background-image: -webkit-linear-gradient(bottom, #008dff, #bcd7fc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        z-index: 0;
    }
}
</style>
