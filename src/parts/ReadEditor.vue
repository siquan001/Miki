<template>
    <div class="eM">
        <Milkdown />
    </div>
</template>

<script lang="ts" setup>
import { Milkdown, useEditor } from "@milkdown/vue";
import "@milkdown/crepe/theme/common/style.css";
import { Crepe } from "@milkdown/crepe";
import { clouds } from "thememirror";
import { onBeforeUnmount } from "vue";
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
                theme: clouds,
            },
            "block-edit": {
                blockHandle: {
                    getPlacement: () => 'left-start',
                },
                textGroup: {
                    label: '文本块',
                    text: {
                        label: '文字',
                    },
                    h1: {
                        label: '标题 1',
                    },
                    h2: {
                        label: '标题 2',
                    },
                    h3: {
                        label: '标题 3',
                    },
                    h4:null,
                    h5: null,
                    h6: null,
                    quote: {
                        label: '引用',
                    },
                    divider:{
                        label: "分割线"
                    }
                },
                listGroup: {
                    label: '列表',
                    bulletList: {
                        label: '无序列表',
                    },
                    orderedList: {
                        label: '有序列表',
                    },
                    taskList: {
                        label: '任务列表',
                    },
                },
                advancedGroup: {
                    label: '高级',
                    image: {
                        label: '图片',
                    },
                    codeBlock: {
                        label: '代码块',
                    },
                    table: {
                        label: '表格',
                    },
                    math: {
                        label: 'Latex公式',
                    },
                },
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
