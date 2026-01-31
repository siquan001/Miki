<script setup lang="ts">
import MIcon from '../util/MIcon.vue';

</script>

<template>
    <div class="nav">
        <div class="nav-left">
            <div class="nav-btn">
                <MIcon name="setting"/>
            </div>
            <div class="nav-btn">
                <MIcon name="menu"/>
            </div>
        </div>
        <div class="nav-right">
            <div class="nav-btn">
                <MIcon name="minimize"/>
            </div>
            <div class="nav-btn">
                <MIcon name="maximize"/>
            </div>
            <div class="nav-btn close">
                <MIcon name="close"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.nav{
    width: 100%;
    height: 36px;
    opacity: .3;
    transition: all .2s;
    &:hover{
        opacity: 1;
    }
    .nav-left{
        float: left;
        .nav-btn{
            width: 30px;
            height: 30px;
            margin: 3px;
            border-radius: 4px;
            .m-icon{
                margin: 7px;
            }
        }
    }
    .nav-right{
        float: right;
    }
    .nav-btn{
        width: 36px;
        height: 36px;
        float: left;
        .m-icon{
            width: 16px;
            height: 16px;
            margin: 10px;
        }
        &:hover{
            background-color: #f4f4f4;
        }
        &.close:hover{
            background-color: red;
            color: #fff;
        }
    }
}
</style>