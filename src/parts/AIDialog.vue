<template>
    <div class="ai-dialog" :class="{aishow}">
        <div class="close-btn" @click="aishow=false">
            <MIcon name="close"/>
        </div>
        <div class="b" :class="{show:bshow}">
            <div class="q">{{ qai }}</div>
            <div class="a">{{ aia }}</div>
            <div class="float-clear"></div>
        </div>
        <div class="i">
            <input type="text" v-model="rqai" @keydown="kd"/>
            <button @click="bqai()">发送</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Crepe } from '@milkdown/crepe';
import { ref } from 'vue';
import bus from '../core/bus';
import MIcon from '../util/MIcon.vue';

const aishow=ref(false);
const bshow=ref(false);
const qai=ref("");
const aia=ref("");
const rqai=ref("");
interface Req{
    abort:()=>void;
}
let lrq:Req|undefined=void 0;
let t:any=null;
const props=defineProps<{editor:Crepe|unknown}>();
function bqai(){
    if(!rqai.value)return;
    qai.value=rqai.value;
    rqai.value='';
    bshow.value=true;
    clearInterval(t);
    t=setInterval(()=>{
        let b=["AI正在思考...","思考可能需要一点时间...","有时学会自己创作也是件好事...","AI将会在所有内容思考完毕输出答案..."]
        aia.value=b[Math.floor(Math.random()*b.length)]||'';
    },1000);
    if(lrq)lrq.abort();
    lrq=post({
        url:"https://yunzhiapi.cn/API/doubao.php",
        data:{
            token:"pBzGDf712Gwc",
            question:qai.value,
            system:`你是一个文本创作助手，你在回答用户问题的同时应鼓励用户自己创作，同时尽量精简你的回答，除非用户问十分具体的内容，请都要只回答一个大纲即可，同时一定要鼓励用户自己思考，你只是提供一个仅供参考的灵感方向，每一个回答要精简到200字左右或以内，以下是用户现在的文本：\n${(props.editor as Crepe).getMarkdown()}`
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

function kd(e:KeyboardEvent){
    if(e.key=="Enter"){
        bqai();
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
    opacity:0;
    pointer-events: none;
    transition:all .3s;
    .close-btn{
        width: 20px;
        height: 20px;
        position:absolute;
        top:10px;
        right:10px;
        cursor:pointer;
        z-index: 999;
    }
    .b{
        width:100%;
        height: 230px;
        overflow-y:auto;
        opacity:0;
        &.show{
            opacity:1;
        }
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
            width: calc(100% - 60px);
            height: 20px;
            border:0;
            outline:0;
            border-bottom:var(--mi-se-color-1) solid 1px;
            &:focus{
                border-color:var(--mi-active);
            }
        }
        button{
            width: 50px;
            height: 20px;
            border:0;
            outline:0;
            background-color: var(--mi-bg-1);
            margin: 0 5px;
            &:hover{
                background-color: var(--mi-hover);
            }
        }
    }
    &.aishow{
        opacity:1;
        pointer-events:all;
    }
}
</style>