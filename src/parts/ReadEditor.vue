<template>
    <div class="eM">
        <Milkdown />
    </div>
</template>

<script lang="ts" setup>
import { Milkdown, useEditor } from "@milkdown/vue";
import "@milkdown/crepe/theme/common/style.css";
import { Crepe } from "@milkdown/crepe";
import { clouds, coolGlow } from "thememirror";
import { onBeforeUnmount } from "vue";
import { mode } from "../core/store";
const props=defineProps({
    content:{
        type:String,
        default:''
    }
})
useEditor((root) => {
    const a = new Crepe({
        root,
        defaultValue: props.content,
        featureConfigs: {
            "code-mirror": {
                theme: mode.value=="dark"?coolGlow:clouds,
            }
        }
    })
    a.setReadonly(true);
    beforefn=async ()=>{
        a.destroy();
    }
    return a;
});

let beforefn=async ()=>{};
onBeforeUnmount(async ()=>{
    await beforefn();
})
</script>
<style lang="scss">
.eM {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    animation: fadein .3s;

    .milkdown {
        min-height: calc(100vh - 116px);
        max-width: 1000px;
        width: calc(100% - 40px);
        margin: 0px auto;
    }
}

@keyframes fadein {
    0%{
        opacity: 0;
        transform:translateY(50px);
    }100%{
        opacity: 1;
        transform:none;
    }
}
</style>
