<template>
    <div class="m-icon" v-html="Icons[name]||Icons['unknown']">
    </div>
</template>

<script lang="ts" setup>
import Icons from './Icons';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>

<style lang="scss">
.m-icon svg{
    width: 100%;
    height: 100%;
    display: block;
}
</style>