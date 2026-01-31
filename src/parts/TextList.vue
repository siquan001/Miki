<template>
    <div class="nav-top">
        <div class="nav-label">我的文稿</div>
        <div class="spaces"><MIcon name="folder"/></div>
    </div>
    <ul class="text-list">
        <li>
            <div class="title">
                <MIcon name="add"/> 新建文稿
            </div>
        </li>
        <li v-for="text in textList" :key="text.id">
            <div class="title">{{ text.title }}</div>
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import MIcon from '../util/MIcon.vue';
interface TextHead {
    title: string;
    id: string;
}

const textList = ref<TextHead[]>([]);
</script>

<style lang="scss">
.nav-top{
    padding: 0 20px;
    padding-top: 20px;
    overflow:hidden;
    .nav-label {
        font-size: 12px;
        line-height: 20px;
        color: #888;
        float:left;
    }
    .spaces{
        width: 20px;
        height: 20px;
        float: right;
        border-radius: 4px;
        cursor: pointer;
        .m-icon{
            width: 16px;
            height: 16px;
            margin: 2px;
        }
        &:hover{
            background-color:rgb(244, 246, 248);
        }
    }
}


.text-list{
    margin: 10px 20px;
    list-style: none;
    height: calc(100% - 250px);
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;
    li{
        width: 100%;
        margin:0 4px;
        border-radius: 4px;
        height: 36px;
        color: #494e59;
        transition: all .2s;
        cursor: pointer;
        &:hover{
            background-color: rgb(244, 246, 248);
        }
        &.active{
            background-color: rgb(246, 248, 250);
        }
        .title{
            line-height: 36px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: calc(100% - 20px);
            font-size: 14px;
            padding: 0 10px;
        }
        .m-icon{
            display: inline-block;
            width: 1em;
            height: 1em;
            padding-right: .5em;
        }
    }
}

.text-list::-webkit-scrollbar {
    background-color: transparent;
    width: 5px;
}

.text-list::-webkit-scrollbar-thumb {
    background-color: #8c95a9;
    border-radius: 5px;
}

.text-list::-webkit-scrollbar-thumb:hover {
    background-color: #494e59;
}
</style>