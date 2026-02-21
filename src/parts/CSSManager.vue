<template>
    <div class="app-dialog app-css-ma" :class="{show}">
        <div class="b-drop" @click="show=false"></div>
        <div class="a-content">
            <div class="close-btn" @click="show=false">
                <MIcon name="close"/>
            </div>
            <h2 class="title">管理自定义CSS</h2>
            <div class="css-list">
                <div class="cs-item newcss" @click="newCss()">
                    <span>+ 新建CSS</span>
                </div>
                <div class="cs-item newcss" @click="pload()">
                    <span><u>↑</u> 上传CSS</span>
                </div>
                <div class="cs-item" v-for="(cssItem,index) in cssItems" :key="cssItem.id">
                    <div class="cs-name"><input type="text" v-model="cssItem.name"/></div>
                    <div class="controls">
                        <div class="ic-con" @click="edShow=true;toEdid=cssItem.id">
                            <MIcon name="pencil"/>
                        </div>
                        <div class="ic-con del" @click="cssItems.splice(index,1)">
                            <MIcon name="delete"/>
                        </div>
                        <div class="btn" :class="{enabled:cssItem.enabled}" @click="cssItem.enabled=!cssItem.enabled">
                            {{  cssItem.enabled?"启用中":"已禁用" }}
                        </div>
                    </div>
                </div>
                <div class="float-clear"></div>
            </div>
        </div>
    </div>
    <CSSEditor v-model:show="edShow" :edid="toEdid"/>
</template>

<script lang="ts" setup>
import { reactive, ref ,watch} from 'vue';
import MIcon from '../util/MIcon.vue';
import { getCSSList, setCSS, setCSSList, type CSSItem } from '../core/cssset';
import CSSEditor from './CSSEditor.vue';
import { getHash, pickFile } from '../core/util';

const show = defineModel<boolean>('show',{ default: false });
const edShow=ref(false);
const toEdid=ref('');
const cssItems=reactive<CSSItem[]>(getCSSList());
watch(cssItems,()=>{
    setCSSList(cssItems);
})

function newCss(){
    let id=getHash();
    cssItems.push({
        id,
        name:"新的CSS",
        enabled:true
    })
    setCSS(id,'');
}
function pload(){
    let n='新的CSS';
    pickFile('text/css').then(f=>{
        n=f.name.replace(".css",'');
        return f.text()
    }).then(cs=>{
        let id=getHash();
        cssItems.push({
            id,
            name:n,
            enabled:true
        })
        setCSS(id,cs);
    })
    
}
</script>

<style lang="scss">
.app-css-ma{
    .close-btn{
        width: 20px;
        height: 20px;
        position:absolute;
        top:0;
        right:0;
        padding: 10px;
        border-radius:10px;
        &:hover{
            background-color: var(--mi-hover);
        }
    }

    .title{
        padding: 20px;
        font-size:20px;
    }

    .css-list{
        width:100%;
        height:calc(100% - 80px);
        overflow-y:auto;
        .cs-item{
            width: calc(100% - 20px);
            margin: 10px;
            height: 40px;
            line-height: 40px;
            background-color: var(--mi-hover);
            border-radius: 10px;
            float:left;
            .cs-name{
                max-width: calc(100% - 160px);
                float: left;
                line-height: 40px;
                padding-left: 10px;
                input{
                    width:100%;
                    font-size: 16px;
                    border:0;
                    outline: 0;
                    background:transparent;
                }
            }
            .controls{
                width: 140px;
                float: right;
                padding-right: 10px;
                .ic-con{
                    width: 16px;
                    height: 16px;
                    float: left;
                    padding: 4px;
                    margin: 8px;
                    border-radius:50%;
                    &:hover{
                        color: var(--mi-active);
                    }
                    &.del:hover{
                        color:red;
                    }
                }
                .btn{
                    float: left;
                    width: 60px;
                    margin: 5px 0;
                    &.enabled{
                        background-color: var(--mi-active);
                        color:#fff;
                    }
                    background-color: var(--mi-bg-0-2);
                }
            }
        }
        .newcss{
            width:calc(50% - 20px);
            float: left;
            text-align: center;
            cursor: pointer;
            user-select:none;
            transition:all .2s;
            &:hover{
                filter:brightness(1.05);
            }
        }
    }
}

</style>