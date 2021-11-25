<template>
    <div
        :key="refreshTime"
        class="ipDiv"
        data-attr="兼容eslint兼容eslint兼容eslint兼容eslinteslint兼容eslint"
        @paste="pasting"
    >
        <el-input
            ref="ipv1"
            v-model="ipv1"
            class="ip-el-input"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            @focus="focusInput('ipv2')"
        />
        <div class="ipDiv-dot">.</div>
        <el-input
            ref="ipv2"
            v-model="ipv2"
            class="ip-el-input"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            @focus="focusInput('ipv3')"
        />
        <div class="ipDiv-dot">.</div>
        <el-input
            ref="ipv3"
            v-model="ipv3"
            class="ip-el-input"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            @focus="focusInput('ipv4')"
        />
        <div class="ipDiv-dot">.</div>
        <el-input
            ref="ipv4"
            v-model="ipv4"
            class="ip-el-input"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint"
            @blur="check = null"
        />
    </div>
</template>
<script>
export default {
    props: {
        // 是否需要自动聚焦
        autoFocus: {
            type: Boolean,
            default: false,
        },
        ipType: {
            type: String,
            default: 'ip',
        },
        configIp: {
            type: String,
            default: () => '',
        },
    },
    data() {
        return {
            ipv1: null,
            ipv2: null,
            ipv3: null,
            ipv4: null,
            check: null,
            ipInfo: {
                flag: false,
                ip: null,
                subnet_mask: null,
                gateway: null,
                switch_address: null,
            },
            ipInfo1: {
                flag: false,
                ip: null,
            },
            refreshTime: null,
        };
    },
    watch: {
        ipv1: {
            handler(cur) {
                if (this.valid(cur)) {
                    if (Number(cur) === 0) {
                        return (this.ipv1 = null);
                    }
                    if (this.ipType === 'ip') {
                        if (cur > 255) {
                            this.ipv1 = 255;
                            this.$refs.ipv2.focus();
                            this.$message({
                                message: '只能输入1~255之间的数字',
                                type: 'warning',
                                duration: 1000,
                            });
                        }
                    }
                    else if (this.ipType === 'subnet') {
                        if (cur > 255) {
                            this.ipv1 = 255;
                            this.$refs.ipv2.focus();
                            this.$message({
                                message: '只能输入1~255之间的数字',
                                type: 'warning',
                                duration: 1000,
                            });
                        }
                    }
                    else if (this.ipType === 'gateway') {
                        // getGateway
                        if (cur > 255) {
                            this.ipv1 = 255;
                            this.$refs.ipv2.focus();
                            this.$message({
                                message: '只能输入1~255之间的数字',
                                type: 'warning',
                                duration: 1000,
                            });
                        }
                    }
                    else if (this.ipType === 'device') {
                        // getDevice
                        if (cur > 255) {
                            this.ipv1 = 255;
                            this.$refs.ipv2.focus();
                            this.$message({
                                message: '只能输入1~255之间的数字',
                                type: 'warning',
                                duration: 1000,
                            });
                        }
                    }
                    if (cur.length === 3) {
                        this.$refs.ipv2.focus();
                    }
                }
                else {
                    this.ipv1 = null;
                }
                this.returnIpInfo();
            },
        },
        ipv2: {
            handler(cur) {
                if (this.valid(cur)) {
                    if (cur > 255) {
                        this.ipv2 = 255;
                        this.$refs.ipv3.focus();
                    }
                    else {
                        this.ipv2 = Number(cur);
                    }
                    if (cur.length === 3) {
                        this.$refs.ipv3.focus();
                    }
                }
                else {
                    this.ipv2 = null;
                }
                this.returnIpInfo();
            },
        },
        ipv3: {
            handler(cur) {
                if (this.valid(cur)) {
                    if (cur > 255) {
                        this.ipv3 = 255;
                        this.$refs.ipv4.focus();
                    }
                    else {
                        this.ipv3 = Number(cur);
                    }
                    if (cur.length === 3) {
                        this.$refs.ipv4.focus();
                    }
                }
                else {
                    this.ipv3 = null;
                }
                this.returnIpInfo();
            },
        },
        ipv4: {
            handler(cur) {
                if (this.valid(cur)) {
                    if (Number(cur) === 0) {
                        return (this.ipv4 = null);
                    }
                    if (cur > 255) {
                        this.ipv4 = 255;
                    }
                    if (cur === 0) {
                        this.ipv4 = null;
                    }
                }
                else {
                    this.ipv4 = null;
                }
                this.returnIpInfo();
            },
        },
        configIp: {
            handler() {
                this.initIpconponent();
            },
        },
    },
    mounted() {
        this.init();
    },
    // 销毁键盘监听事件,enter按下事件
    destroyed() {
        document.removeEventListener('keydown', this.getEventType);
    },
    methods: {
        init() {
            this.initEvent();
            this.initIpconponent();
        },
        pasting(e) {
            let tempIp = e.clipboardData.getData('text/plain');
            let tempIpArr = tempIp.split('.');
            this.ipv1 = tempIpArr[0] || null;
            this.ipv2 = tempIpArr[1] || null;
            this.ipv3 = tempIpArr[2] || null;
            this.ipv4 = tempIpArr[3] || null;
            this.refreshTime = new Date().getTime();
        },
        initIpconponent() {
            this.ipv1 = this.configIp.split('.')[0] || null;
            this.ipv2 = this.configIp.split('.')[1] || null;
            this.ipv3 = this.configIp.split('.')[2] || null;
            this.ipv4 = this.configIp.split('.')[3] || null;
            this.ipInfo = this.ipInfo1;
            if (this.autoFocus) {
                this.$refs.ipv1.focus();
            }
        },
        // 返回ip信息
        returnIpInfo() {
            if (this.ipv1 === null || this.ipv2 === null || this.ipv3 === null || this.ipv4 === null) {
                this.ipInfo.flag = false;
            }
            else {
                this.ipInfo.flag = true;
            }
            if (this.ipType === 'ip') {
                this.ipInfo.ip = !this.ipv1 ? ''
                    : this.ipv1 + '.' + this.ipv2 + '.' + this.ipv3 + '.' + this.ipv4;
                this.$emit('getIp', this.ipInfo);
            }
            else if (this.ipType === 'subnet') {
                this.ipInfo.subnet_mask = !this.ipv1 ? ''
                    : this.ipv1  + '.' + this.ipv2 + '.' + this.ipv3 + '.' + this.ipv4;
                this.$emit('getMask', this.ipInfo);
            }
            else if (this.ipType === 'gateway') {
                this.ipInfo.gateway = !this.ipv1 ? ''
                    : this.ipv1  + '.' + this.ipv2 + '.' + this.ipv3 + '.' + this.ipv4;
                this.$emit('getGateway', this.ipInfo);
            }
            else if (this.ipType === 'device') {
                this.ipInfo.switch_address = !this.ipv1 ? ''
                    : this.ipv1  + '.' + this.ipv2 + '.' + this.ipv3 + '.' + this.ipv4;
                this.$emit('getDevice', this.ipInfo);
            }

            this.$emit('getMask', this.ipInfo);
        },
        // 当前聚焦输入框,预先聚焦下一个输入框
        focusInput(flag) {
            this.check = flag;
        },
        // 初始化键盘事件,监听enter按下事件
        initEvent() {
            document.addEventListener('keydown', this.getEventType);
        },
        // 各分支IP校验正则表达式
        valid(val) {
            let reg = /^\d{1,}$/;
            return reg.test(val);
        },
        // enter按键后，所聚焦的输入框
        getEventType(e) {
            if (e.keyCode === 13 || e.keyCode === 110) {
                switch (this.check) {
                    case 'ipv1':
                        if (this.ipv4 === null) {
                            return;
                        }
                        this.$refs.ipv1.focus();
                        break;
                    case 'ipv2':
                        if (this.ipv1 === null) {
                            return;
                        }
                        this.$refs.ipv2.focus();
                        break;
                    case 'ipv3':
                        if (this.ipv2 === null) {
                            return;
                        }
                        this.$refs.ipv3.focus();
                        break;
                    case 'ipv4':
                        if (this.ipv3 === null) {
                            return;
                        }
                        this.$refs.ipv4.focus();
                        break;
                    default:
                        break;
                }
            }
        },
    },
};
</script>
<style>
.ipDiv {
    width: 100%;
    display: flex;
}

.ip-el-input {
    width: 25%;
    text-align: center;
}

.ipDiv .el-input__inner,
.ipDiv .el-input__inner:focus {
    text-align: center;
    border: 1px solid #dcdfe6;
}

.el-input__inner {
    width: 100%;
}

.ipDiv-dot {
    width: 3%;
}

.ipDiv .el-input__inner:focus {
    border: 1px solid #409eff;
}
</style>
