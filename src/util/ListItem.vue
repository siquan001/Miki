<template>
    <div class="nav-list-item" :class="{active}" :title="title">
        <MIcon :name="icon" />
        <div class="title">{{ title }}</div>
    </div>
</template>

<script lang="ts" setup>
import MIcon from './MIcon.vue';

const props=defineProps({
    icon:{
        type:String,
        default:'unknown'
    },
    title:{
        type:String,
        default:'Item'
    },
    active:{
        type:Boolean,
        default:false
    }
})
</script>

<style lang="scss">
.nav-list-item{
    width: calc(100% - 20px);
    margin: 10px;
    border-radius: 5px;
    height: 40px;
    color: var(--mi-color);
    transition: all .2s;
    .m-icon{
        width: 16px;
        height: 16px;
        margin: 12px;
        float: left;
    }
    .title{
        float: left;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: calc(100% - 40px);
    }
    &:hover{
        background-color: var(--mi-hover);
    }
    &.active{
        background-color: var(--mi-active);
        color:#fff;
    }
}
</style>