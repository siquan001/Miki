<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';
import Editor from './Editor.vue';
import { NoteCore,type DiaryMeta } from '../core';
import { MilkdownProvider } from '@milkdown/vue';
import { nowDiaryDate } from '../core/store';
import bus from '../core/bus';
import DiaryPicker from './DiaryPicker.vue';
const label = ref("");
const id=computed(()=>{
    return NoteCore.getDiaryId(nowDiaryDate.value);
});
watch(nowDiaryDate,()=>{
    NoteCore.getDiary(nowDiaryDate.value).then(f=>{
        if(f){
            label.value=f.label;
        }else{
            label.value="";
        }
    })
},{immediate:true})

async function lastDiary(){
    const ds=await NoteCore.getDiaries();
    for(let i=0;i<ds.length;i++){
        let b=ds[i] as DiaryMeta;
        if(b.id==NoteCore.getDiaryId(nowDiaryDate.value)){
            if(i<ds.length-1){
                nowDiaryDate.value=NoteCore.getDiaryDate((ds[i+1] as DiaryMeta).id);
            }else{
                bus.emit("toast","已经是第一篇日记了");
            }
            break;
        }
    }
}

async function nextDiary(){
    const ds=await NoteCore.getDiaries();
    for(let i=0;i<ds.length;i++){
        let b=ds[i] as DiaryMeta;
        if(b.id==NoteCore.getDiaryId(nowDiaryDate.value)){
            if(i>0){
                nowDiaryDate.value=NoteCore.getDiaryDate((ds[i-1] as DiaryMeta).id);
            }else{
                nowDiaryDate.value=dayjs();
            }
            break;
        }
    }
}

bus.on("diary-last",lastDiary);
bus.on("diary-next",nextDiary);

const showPicker=ref(false);
bus.on("showpicker",()=>{
    showPicker.value=true;
});
const cz=ref(0);
bus.on("diary-updated",()=>{
    cz.value++;
});
</script>

<template>
    <div class="diary-ed">
        <div class="diary-header">
            <div class="date">{{ nowDiaryDate.format('YYYY年MM月DD日') }}</div>
            <div class="label">
                <input type="text" placeholder="今天心情如何？" v-model="label"/>
            </div>
        </div>
        <div class="diary-edit">
            <MilkdownProvider>
                <Editor :key="id" type="diary" :id="id" :label="label"/>
            </MilkdownProvider>
        </div>
        <DiaryPicker v-model:show="showPicker" :key="cz"/>
    </div>
</template>

<style lang="scss">
.diary-ed {
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.diary-header {
    width: calc(100% - 240px);
    margin: 20px auto;
    margin-bottom:0;
    padding-top: 20px;
    max-width: 1000px;
    overflow:hidden;

    .date {
        font-size: 24px;
        font-weight: bold;
        float: left;
        color:var(--mi-color);
        line-height: 30px;
    }

    .label {
        float: right;

        input {
            line-height: 28px;
            height: 28px;
            font-size: 16px;
            border:transparent 1px solid;
            outline:0;
            font-family: inherit;
            border-radius: 5px;
            width: 200px;
            padding: 0 10px;
            &:focus{
                border: #ccc 1px solid;
            }
        }

    }
}

.diary-edit{
    .eM .milkdown{
        min-height: calc(100vh - 196px);
    }
}
</style>