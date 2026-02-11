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
import { nowSpace, selectedId } from "../core/store";
import { NoteCore } from "../core";
import { switchFull } from "../core/util";
import { replaceAll } from "@milkdown/kit/utils";
import bus from "../core/bus";
import dayjs from "dayjs";
function keydown(a:Crepe){
    return function(e:KeyboardEvent){
        if(e.ctrlKey){
            if(e.key=="s"){
                e.preventDefault();
                save(a)
            }
        }
        if(e.key=="f11"){
            e.preventDefault();
            switchFull();
        }
    }
}
const props=defineProps({
    id:{
        type:String,
        required:true
    },
    type:{
        type:String,
        default:"note"
    },
    label:{
        type:String,
        default:""
    }
})
const tarId=props.id;
async function save(a:Crepe){
    const content=a.getMarkdown();
    if(props.type=="note"){
        await NoteCore.updateNote(nowSpace.value,tarId,{content});
        bus.emit("toast","已保存 at "+dayjs().format('YYYY/MM/DD HH:mm:ss'));
    }else if(props.type=="diary"){
        if(content.trim()=='')return;
        const f=await NoteCore.getDiary(NoteCore.getDiaryDate(tarId));
        if(!f)await NoteCore.createDiary(props.label);
        await NoteCore.updateDiary(tarId,{content,label:props.label});
        bus.emit("toast","已保存 at "+dayjs().format('YYYY/MM/DD HH:mm:ss'));
    } 
}
useEditor((root) => {
    const a = new Crepe({
        root,
        defaultValue: '',
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
    a.create().then(()=>{
        NoteCore.getContent(tarId).then(content=>{
            content=content||'';
            a.editor.action(replaceAll(content));
        });
        let kdf=keydown(a);
        let tosave=()=>save(a);
        beforefn=async ()=>{
            document.removeEventListener("keydown",kdf);
            bus.off("save",tosave);
            await save(a);
            bus.emit("toast","已自动保存上个文档");
            a.destroy();
        }
        document.addEventListener("keydown",kdf);
        bus.on("save",tosave);
    });
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
