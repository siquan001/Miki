import { computed, ref, watch } from "vue";
import {NoteCore} from "./index";
import dayjs from "dayjs";
import langs from "../langs";

export const nowSpace=ref('def');
export const selectedId=ref('');
export const isfullscreen=ref(false);
export const showWork=ref(false);
export const showTab = ref(0);
export const nowDiaryDate=ref(dayjs());
export const mode=ref(localStorage.getItem("miki-theme")||"light");
type langT=keyof typeof langs;
type contentIdT=keyof typeof langs[langT]['docs'];
export const lang=ref<langT>(localStorage.getItem("miki-lang") as langT||"zh-cn");
export const readonlyContent=computed(()=>{
    return langs[lang.value].docs[contentId.value as contentIdT]||"";
});
export const contentId=ref('');
export const theme=ref(localStorage.getItem("miki-theme-color")||"default");

watch(nowSpace,()=>{
    NoteCore.getNoteMetas(nowSpace.value).then((list)=>{
        selectedId.value=list[0]?.id||'';
        if(list.length>0)showTab.value=1;
        else showTab.value=0;
    })
})

watch(mode,(val)=>{
    selectedId.value='';
    localStorage.setItem("miki-theme",val);
})

watch(theme,(val)=>{
    localStorage.setItem("miki-theme-color",val);
})

watch(lang,(val)=>{
    localStorage.setItem("miki-lang",val);
})

export function $t(key:string,langK?:langT){
    const keys=key.split(".");
    let res:any=langs[langK||lang.value];
    for(let k of keys){
        res=res[k];
        if(!res)break;
    }
    if((!res)&&(!langK)) return $t(key,"zh-cn");
    return res||key;
}