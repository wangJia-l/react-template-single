<template>
    <div class="title-component" :class="`icon-${iconType}`">
        <p>{{ titleName }}</p>
    </div>
</template>

<script>
export default {
    props: {
        iconType: {
            type: Number,
            default: () => 1,
        },
        titleName: {
            type: String,
            default: () => '',
        },
    },
};
</script>

<style lang="less">
.title-component {
    width: 100%;
    height: 42px;
    padding-left: 42px;
    background-image: linear-gradient(90deg, rgba(6, 30, 73, 1) 0%, rgba(9, 38, 89, 0.22) 93%);
    position: absolute;
    top: -1px;
    left: -1px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 42px;
        height: 42px;
        background-image: url('../assets/icons/icon-title1.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 13px 13px;
    }

    p {
        font-family: Microsoft YaHei, sans-serif;
        font-size: 16px;
        color: #edf2ff;
        letter-spacing: 1px;
        text-shadow: 0 2px 6px #152547;
        font-weight: 600;
        line-height: 42px;
    }
}

.icon-1::before {
    background-image: url('../assets/icons/icon-title1.png');
}

.icon-2::before {
    background-image: url('../assets/icons/icon-title2.png');
}
</style>
