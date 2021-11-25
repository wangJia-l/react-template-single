<template>
    <div class="waste-disposal">
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            data-attr="兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint兼容eslint"
        >
            <el-form-item label="处置原因" prop="scrapReason">
                <el-input v-model="form.scrapReason" placeholder="请输入处置原因"/>
            </el-form-item>
            <el-form-item label="处置去向" prop="disposalWhereabouts">
                <el-input v-model="form.disposalWhereabouts" placeholder="请输入处置去向"/>
            </el-form-item>
            <el-form-item label="责任人" prop="responsibilityPerson">
                <el-input v-model="form.responsibilityPerson" placeholder="请输入责任人"/>
            </el-form-item>
            <el-form-item label="报废描述" prop="disposalDescription">
                <el-input v-model="form.disposalDescription" placeholder="请输入报废描述"/>
            </el-form-item>
        </el-form>
        <div class="botton-box-waste">
            <el-button
                size="small" type="primary"
                @click="closeDialog()"
            >关闭</el-button>
            <el-button
                type="primary"
                size="small"
                :loading="ifLoading"
                data-attr="兼容eslint兼容eslint兼容eslint"
                @click="submitForm()"
            >
                确认提交
            </el-button>
        </div>
    </div>
</template>

<script>
/* eslint-disable camelcase */
import {scrapDisposal} from '../servies';
export default {
    props: {
        id: {
            type: Number,
            default: () => null,
        },
        handleCloseWaste: {
            type: Function,
            default: null,
        },
    },
    data() {
        return {
            ifLoading: false,
            rules: {
                scrapReason: [{required: true, message: '请输入处置原因', trigger: 'change'}],
                disposalWhereabouts: [{required: true, message: '请输入处置去向', trigger: 'change'}],
                responsibilityPerson: [{required: true, message: '请输入责任人', trigger: 'change'}],
                disposalDescription: [{required: true, message: '请输入报废描述', trigger: 'change'}],
            },
            form: {},
        };
    },
    computed: {},
    watch: {},
    async mounted() {},
    methods: {
        closeDialog() {
            // this.$emit('CloseWaste');
            this.handleCloseWaste();
        },
        submitForm() {
            this.ifLoading = true;
            this.$refs.form.validate(async values => {
                if (values) {
                    const params = {
                        ...this.form,
                        deviceId: this.id,
                    };
                    const response = await scrapDisposal(params);
                    const {flag} = response;
                    this.ifLoading = false;
                    if (flag) {
                        this.$message({
                            type: 'success',
                            message: '提交成功！',
                        });

                        setTimeout(() => {
                            this.$emit('CloseWaste');
                        }, 1000);
                    }
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
    },
};
</script>

<style lang="less">
.el-input--small .el-input__inner {
    background-color: #081e43 !important;
    height: 42px;
    font-size: 14px;
    border: 1px solid #0d3271;
    box-sizing: border-box;
}

.botton-box-waste {
    text-align: center;
    padding: 10px 0 0 0;
    display: flex;

    .el-button {
        width: 50%;
        height: 32.5px;
    }
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
