<script setup lang="ts">
import SelectDown from '../util/SelectDown.vue';
import SettingItem from './SettingItem.vue';
import { $t, contentId, lang, mode, showTab, theme } from '../core/store';
import { exportAlltoLocal, exportAlltoMikiBase, importFromMikiBase } from '../core/export';
import bus from '../core/bus';
import Warn from '../util/Warn.vue';

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
        <h1 style="padding-bottom: 30px;">{{  $t("setting") }}</h1>
        <SettingItem :title="$t('settings.theme')" :desc="$t('settings.theme_desc')">
            <SelectDown :options="[
                { label: $t('settings.theme_light'), value: 'light' },
                { label: $t('settings.theme_dark'), value: 'dark' },
                { label: $t('settings.theme_eyes'), value: 'eye' },
            ]" v-model="mode"/>
        </SettingItem>
        <SettingItem :title="$t('settings.lang')" :desc="$t('settings.lang_desc')">
            <SelectDown :options="[
                { label: '简体中文', value: 'zh-cn' },
                { label: 'English', value: 'en' },
                { label: '繁體中文', value: 'zh-tw' },
                { label: '日本語', value: 'ja' },
            ]" v-model="lang"/>
        </SettingItem>
        <Warn v-if="lang!='zh-cn'">
            当前翻译为Gemini机翻，我们需要更加优质的翻译，若您有能力，可在<a href="https://github.com/siquan001/miki/">Github仓库</a>帮助我们<br>Currently, the translation is Gemini machine translation, we need better translations, if you have the ability, you can help us in the <a href="https://github.com/siquan001/miki/">Github repository</a>
        </Warn>
        <SettingItem :title="$t('settings.theme_color')" :desc="$t('settings.theme_color_desc')">
            <SelectDown :options="[
                { label: $t('settings.theme_color_default'), value: 'default' },
                { label: $t('settings.theme_color_pink'), value: 'pink' },
                { label: $t('settings.theme_color_orange'), value: 'orange' },
                { label: $t('settings.theme_color_green'), value: 'green' },
                { label: $t('settings.theme_color_purple'), value: 'purple' },
            ]" v-model="theme"/>
        </SettingItem>
        <SettingItem :title="$t('settings.backup')" :desc="$t('settings.backup_desc')">
            <div class="btn" @click="em()">{{ $t('settings.bkp') }}</div>
        </SettingItem>
        <SettingItem :title="$t('settings.export')" :desc="$t('settings.export_desc')">
            <div class="btn" @click="ep()">{{ $t('settings.exp') }}</div>
        </SettingItem>
        <SettingItem :title="$t('settings.import')" :desc="$t('settings.import_desc')">
            <div class="btn" @click="im()">{{ $t('settings.imp') }}</div>
        </SettingItem>
        <SettingItem :title="$t('help')" desc="查看帮助文档">
            <div class="btn" @click="contentId='help';showTab=4">{{ $t('settings.see') }}</div>
        </SettingItem>
        <SettingItem title="关于Miki" desc="查看关于Miki的信息">
            <div class="btn" @click="contentId='about';showTab=4">{{ $t('settings.see') }}</div>
        </SettingItem>
    </div>
</template>

<style lang="scss">
.se-con {
    max-width: 800px;
    width: calc(100% - 40px);
    margin: 0 auto;
    padding: 20px;
    height:100%;
    overflow-y: auto;
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