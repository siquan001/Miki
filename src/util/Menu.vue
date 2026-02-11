<template>
    <div :class="{ menu: true, show }">
        <div class="menu-content">
            <template v-for="item in items">
                <div class="menu-hr" v-if="typeof item === 'undefined'"></div>
                <div v-else :class="{ 'menu-item': true, disabled: item.disabled }" @click="item.click">
                    <div class="menu-icon">
                        <MIcon v-if="typeof item.icon === 'string'" :name="item.icon"></MIcon>
                        <div v-else-if="typeof item.icon === 'undefined'"></div>
                        <component v-else :is="item.icon"></component>
                    </div>
                    <div class="menu-title">{{ item.title }}</div>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue';
import bus from '../core/bus';
import type { MenuItem } from '../core/types';
import MIcon from './MIcon.vue';

const show = defineModel("show", {
    default: false
});
const props = defineProps<{
    items: (MenuItem | undefined)[]
}>();

function unshow() {
    show.value = false;
}

onMounted(() => {
    bus.on("doc-click", unshow)
})

onUnmounted(() => {
    bus.off("doc-click", unshow)
})
</script>

<style lang="scss">
.menu {
    position: absolute;
    z-index: 9999;
    user-select: none;
    border-radius: 5px;
    overflow: hidden;
    background-color: #fff;
    box-shadow: #aaa 0 1px 5px;
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.15s ease;
    overflow: hidden;

    &.show {
        grid-template-rows: 1fr;
        max-height: 1000px;
    }

    .menu-content {
        min-height: 0px;
    }

    .menu-item {
        min-width: 120px;
        width: calc(100% - 10px);
        height: 30px;
        margin: 3px;
        border-radius: 4px;

        &:hover {
            background-color: #f5f5f5;
        }

        .menu-icon {
            width: 30px;
            height: 30px;
            float: left;

            .m-icon {
                width: 16px;
                height: 16px;
                margin: 7px;
            }
        }

        .menu-title {
            width: calc(100% - 30px);
            height: 30px;
            float: left;
            text-align: left;
            font-size: 14px;
            line-height: 30px;
        }
    }
}
</style>