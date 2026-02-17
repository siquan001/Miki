<script setup lang="ts">
import { ref } from 'vue';
import SelectDown from '../util/SelectDown.vue';
import SettingItem from './SettingItem.vue';
import { contentId, mode, showTab } from '../core/store';
import { exportAlltoLocal, exportAlltoMikiBase, importFromMikiBase } from '../core/export';
import bus from '../core/bus';

const language=ref("zh-cn");

function ep(){
    exportAlltoLocal((stat,msg)=>{
        if(stat){
            bus.emit("toast","导出成功！"+msg);
        }else{
            bus.emit("toast","导出失败！"+msg);
        }
    },(done,total)=>{
        bus.emit("toast","正在导出... "+done+"/"+total);
    })
}

function em(){
    exportAlltoMikiBase((stat,msg)=>{
        if(stat){
            bus.emit("toast","备份成功！"+msg);
        }else{
            bus.emit("toast","备份失败！"+msg);
        }
    });
}

function im(){
    importFromMikiBase((stat)=>{
        if(stat){
            bus.emit("toast","导入成功！");
            setTimeout(()=>{
                window.location.reload();
            },1000)
        }else{
            bus.emit("toast","导入失败！");
        }
    })
}
</script>

<template>
    <div class="se-con">
        <h1 style="padding-bottom: 30px;">设置</h1>
        <SettingItem title="主题模式" desc="切换应用的主题模式（亮、暗）">
            <SelectDown :options="[
                { label: '浅色', value: 'light' },
                { label: '深色', value: 'dark' },
                { label: '护眼', value: 'eye' },
            ]" v-model="mode"/>
        </SettingItem>
        <SettingItem title="语言 Language" desc="切换应用的语言 Switch the application language">
            <SelectDown :options="[
                { label: '简体中文', value: 'zh-cn' },
            ]" v-model="language"/>
        </SettingItem>
        <SettingItem title="备份文章数据" desc="导出所有文章为一个.mikibase（其仅用于数据备份）">
            <div class="btn" @click="em()">开始备份</div>
        </SettingItem>
        <SettingItem title="导出所有文章" desc="选择一个文件夹导出所有文章，文章将会以md格式导出，你无法通过文件夹导入数据，若进行数据迁移请用上面的东西">
            <div class="btn" @click="ep()">导出</div>
        </SettingItem>
        <SettingItem title="导入数据" desc="从.mikibase导入所有文章">
            <div class="btn" @click="im()">导入</div>
        </SettingItem>
        <SettingItem title="帮助" desc="查看帮助文档">
            <div class="btn" @click="contentId='help';showTab=4">查看</div>
        </SettingItem>
        <SettingItem title="关于Miki" desc="查看关于Miki的信息">
            <div class="btn" @click="contentId='about';showTab=4">查看</div>
        </SettingItem>
    </div>
</template>

<style lang="scss">
.se-con {
    max-width: 800px;
    width: calc(100% - 40px);
    margin: 0 auto;
    padding: 20px;
}

.btn{
    width:100px;
    height: 30px;
    line-height:30px;
    text-align:center;
    background-color: var(--mi-bg-1);
    border-radius: 5px;
    color:var(--mi-color);
    font-size: 12px;
    cursor:pointer;
}

.btn:hover{
    background-color: var(--mi-hover);
}

.btn:active{
    background-color:var(--mi-active);
    // color:#fff;
}
</style>