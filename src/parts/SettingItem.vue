<template>
    <div class="setting-item">
        <div class="setting-left">
            <div class="title">{{ title }}</div>
            <div class="desc">{{ desc }}</div>
        </div>
        <div class="setting-right">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const props=defineProps<{
    title: string;
    desc: string;
}>();
</script>

<style lang="scss">
.setting-item{
    width:calc(100% - 20px);
    min-height: 60px;
    padding: 0 10px;
    .setting-left{
        float: left;
        .title{
            font-size:16px;
            font-weight: bold;
            margin-top:10px;
        }
        .desc{
            font-size:12px;
            color:#888;
            margin-top:5px;
        }
    }
    .setting-right{
        float: right;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 60px;
    }
}
</style>