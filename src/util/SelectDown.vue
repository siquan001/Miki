<template>
    <div class="select-down-wrapper">
        <div class="select-down-header" @click="isOpen = !isOpen">
            <span class="select-down-label">{{ modelLabel }}</span>
            <span class="select-down-icon" :class="{ open: isOpen }">▼</span>
        </div>
        <transition name="slide">
            <div v-if="isOpen" class="select-down-menu">
                <div
                    v-for="item in options"
                    :key="item.value"
                    class="select-down-item"
                    :class="{ active: modelValue === item.value }"
                    @click="handleSelect(item.value)"
                >
                    {{ item.label }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Option {
    label: string
    value: string | number
}

const props=defineProps<{
    options: Option[]
}>()

const modelValue = defineModel<string | number>()
const modelLabel = computed(() => {
    const selected = props.options.find(item => item.value === modelValue.value)
    return selected ? selected.label : '请选择..'
})
const isOpen = ref(false)

const handleSelect = (value: string | number) => {
    modelValue.value = value
    isOpen.value = false
}
</script>

<style scoped lang="scss">
.select-down-wrapper {
    position: relative;
    width: 100%;
    max-width: 300px;
    min-width: 100px;

    .select-down-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        border: 1px solid var(--mi-se-color-0);
        border-radius: 4px;
        background-color: var(--mi-bg-0);
        cursor: pointer;
        user-select: none;

        &:hover {
            border-color: var(--mi-hover);
        }

        .select-down-label {
            font-size: 14px;
            color: var(--mi-color);
        }

        .select-down-icon {
            font-size: 12px;
            color: var(--mi-color);
            transition: transform 0.3s ease;

            &.open {
                transform: rotate(180deg);
            }
        }
    }

    .select-down-menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        border: 1px solid var(--mi-se-color-0);
        border-radius: 4px;
        background-color: var(--mi-bg-0);
        box-shadow: 0 2px 8px var(--mi-se-color-0);
        z-index: 10;
        max-height: 200px;
        overflow-y: auto;

        .select-down-item {
            padding: 10px 12px;
            font-size: 14px;
            color: var(--mi-color);
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:hover {
                background-color: var(--mi-bg-1);
            }

            &.active {
                background-color: var(--mi-active);
                color: #fff;
                font-weight: 500;
            }
        }
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>