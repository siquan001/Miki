<template>
    <div class="app-dialog app-css-ed" :class="{ show }">
        <div class="b-drop" @click="show = false"></div>
        <div class="a-content">
            <Codemirror 
                v-model="code" 
                placeholder="Write your code here..." 
                :extensions="cdex"
            />
            <div class="btn-g">
                <div class="btn" @click="setCSS(edid,code)">{{ $t("save") }}</div>
                <div class="btn cls" @click="show = false">
                    <MIcon name="close" />
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Codemirror } from 'vue-codemirror';
import MIcon from '../util/MIcon.vue';
import { $t, mode } from '../core/store';
import { clouds, coolGlow } from 'thememirror';
import { css } from '@codemirror/lang-css';
import { watch } from 'vue';
import { getCSS, setCSS } from '../core/cssset';

const show = defineModel('show', {
    type: Boolean,
    default: false
})
const code = ref('');
const cdex = computed(()=>[css(), mode.value=="dark"?coolGlow:clouds]);
const props=defineProps({
    edid:{
        type:String,
        default:""
    }
})

watch(()=>props.edid,()=>{
    if(props.edid)
    getCSS(props.edid).then((css)=>{
        code.value = css;
    })
})
</script>

<style lang="scss">
.app-css-ed{
    .btn-g{
        position: absolute;
        bottom:20px;
        right:20px;
        >.btn{
            float: left;
            margin-right: 10px;
            &.cls{
                width: 32px;
            }
            .m-icon{
                height: 16px;
                margin: 7px;
            }
        }
    }
    .v-codemirror{
        display:block;
        width:100%;
        height: 100%;
        &>*{
            width:100%;
            height: 100%;
        }
    }
}

</style>