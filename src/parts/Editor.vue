<template>
    <div class="eM">
        <Milkdown />
    </div>
    <div class="ai-dialog" :class="{aishow}">
        <div class="close-btn" @click="aishow=false">
            <MIcon name="close"/>
        </div>
        <div class="b">
            <div class="q">{{ qai }}</div>
            <div class="a">{{ aia }}</div>
            <div class="float-clear"></div>
        </div>
        <div class="i">
            <input type="text" v-model="rqai"/>
            <button @click="bqai()">发送</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Milkdown, useEditor } from "@milkdown/vue";
import "@milkdown/crepe/theme/common/style.css";
import { Crepe } from "@milkdown/crepe";
import { clouds } from "thememirror";
import { onBeforeUnmount } from "vue";
import { $t, lang, mode, nowSpace } from "../core/store";
import { NoteCore } from "../core";
import { switchFull } from "../core/util";
import { replaceAll } from "@milkdown/kit/utils";
import {coolGlow} from 'thememirror';
import bus from "../core/bus";
import dayjs from "dayjs";
import langs from "../langs";
import MIcon from "../util/MIcon.vue";
import { ref } from "vue";
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
async function save(a:Crepe,mode?:string){
    const content=a.getMarkdown();
    if(props.type=="note"){
        await NoteCore.updateNote(nowSpace.value,tarId,{content});
    }else if(props.type=="diary"){
        if(content.trim()=='')return;
        const f=await NoteCore.getDiary(NoteCore.getDiaryDate(tarId));
        if(!f)await NoteCore.createDiary(props.label);
        await NoteCore.updateDiary(tarId,{content,label:props.label});
        bus.emit("diary-updated",{id:tarId});
    } 
    if(mode=="auto"){
        bus.emit("toast",$t("autosave")+" at "+dayjs().format('YYYY/MM/DD HH:mm:ss'));
    }else{
        bus.emit("toast",$t("saved")+" at "+dayjs().format('YYYY/MM/DD HH:mm:ss'));
    }
}
useEditor((root) => {
    const a = new Crepe({
        root,
        defaultValue: '',
        featureConfigs: {
            "code-mirror": {
                theme: mode.value=="dark"?coolGlow:clouds,
            },
            "block-edit": {
                blockHandle: {
                    getPlacement: () => 'left-start',
                },
                ...langs[lang.value].editor
            }
        }
    })
    a.create().then(()=>{
        NoteCore.getContent(tarId).then(content=>{
            content=content||'';
            a.editor.action(replaceAll(content));
        });
        let kdf=keydown(a);
        let tosave=(mode?:string)=>save(a,mode);
        let tostat=()=>{
            bus.emit("toast",$t("charstat")+`：${clearTxt(a.getMarkdown()).length}字`);
        };
        beforefn=async ()=>{
            document.removeEventListener("keydown",kdf);
            bus.off("save",tosave);
            bus.off("stat",tostat);
            await save(a);
            bus.emit("toast",$t("autosavelast"));
            a.destroy();
        }
        document.addEventListener("keydown",kdf);
        bus.on("save",tosave);
        bus.on("stat",tostat);
    });
    initAI(a);
    return a;
});
function clearTxt(md:string){
    // clear all md syntax and html tags
    return md.replace(/!\[.*?\]\(.*?\)/g,'') // 图片
    .replace(/\[.*?\]\(.*?\)/g,'') // 链接
    .replace(/`{1,3}.*?`{1,3}/gs,'') // 代码块和行内代码
    .replace(/>\s?(.+)/g,'$1') // 引用
    .replace(/#+\s?(.+)/g,'$1') // 标题
    .replace(/[-*+]\s?(.+)/g,'$1') // 无序列表
    .replace(/\d+\.\s?(.+)/g,'$1') // 有序列表
    .replace(/<[^>]+>/g,'') // HTML标签
    .replace(/\n+/g,'\n') // 多余换行
    .trim();
}
let beforefn=async ()=>{};
onBeforeUnmount(()=>{
    beforefn();
})

const aishow=ref(false);
const qai=ref("");
const aia=ref("");
const rqai=ref("");
interface Req{
    abort:()=>void;
}
let lrq:Req|undefined=void 0;
function bqai(){
    qai.value=rqai.value;
    rqai.value='';
    let t=setInterval(()=>{
        let b=["AI正在思考...","思考可能需要一点时间...","有时学会自己创作也是件好事...","AI将会在所有内容思考完毕输出答案..."]
        aia.value=b[Math.floor(Math.random()*b.length)]||'';
    },1000);
    if(lrq)lrq.abort();
    lrq=post({
        url:"https://yunzhiapi.cn/API/doubao.php",
        data:{
            token:"pBzGDf712Gwc",
            question:qai.value,
            system:`你是一个文本创作助手，你在回答用户问题的同时应鼓励用户自己创作，同时尽量精简你的回答，除非用户问十分具体的内容，请都要只回答一个大纲即可，同时一定要鼓励用户自己思考，你只是提供一个仅供参考的灵感方向，每一个回答要精简到200字左右或以内，以下是用户现在的文本：\n${(initAI as any)().getMarkdown()}`
        },
        cb(text){
            clearInterval(t);
            aia.value=text;
        },
        err(){
            aia.value="AI助手出现了一点小问题喵~"
        }
    });
}

let initAI=(a:Crepe)=>{
    initAI=function(){
        return a;
    }
}

interface PostDT{
    url:string,
    data:any,
    cb:(res:any)=>void,
    err:()=>void
}
function post(dt:PostDT){
    const params = new URLSearchParams(dt.data);
    const abc=new AbortController();
    // 发送请求
    fetch(dt.url, {
        method: "POST", // 也可以使用 "GET"
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params,
        signal:abc.signal
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 错误！状态码: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        dt.cb(data)
    })
    .catch(() => {
        dt.err();
    });
    return {
        abort(){
            abc.abort();
        }
    }
}
bus.on("ai-assist",()=>{
    aishow.value=true;
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
        background: transparent!important;
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

.ai-dialog{
    width: 400px;
    height: 250px;
    padding: 10px;
    border-radius:10px;
    background-color: var(--mi-bg-0);
    box-shadow:0 1px 10px #888;
    border-radius:10px;
    position:absolute;
    top:50px;
    left:50px;
    display:none;
    .close-btn{
        width: 20px;
        height: 20px;
        position:absolute;
        top:0;
        right:0;
    }
    .b{
        width:100%;
        height: 230px;
        overflow-y:auto;
        .q{
            float: right;
            text-align:right;
            background-color: var(--mi-bg-0);
        }
        .a{
            float: left;
            background-color: var(--mi-bg-1);
            white-space: pre-wrap;
        }
        .q,.a{
            padding: 10px;
            font-size: 12px;
            line-height: 1.5em;
            min-width: 50%;
            box-shadow:0 1px 4px #888;
            margin: 10px;
        }
    }

    .i{
        >*{
            float: left;
        }
        input{
            width: calc(100% - 54px);
            height: 20px;
        }
        button{
            width: 50px;
            height: 20px;
        }
    }
    &.aishow{
        display: block;
    }
}
</style>
