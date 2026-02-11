import { ref, watch } from "vue";
import {NoteCore} from "./index";
import dayjs from "dayjs";

export const nowSpace=ref('def');
export const selectedId=ref('');
export const isfullscreen=ref(false);
export const showWork=ref(false);
export const showTab = ref(0);
export const nowDiaryDate=ref(dayjs());

watch(nowSpace,()=>{
    NoteCore.getNoteMetas(nowSpace.value).then((list)=>{
        selectedId.value=list[0]?.id||'';
        if(list.length>0)showTab.value=1;
        else showTab.value=0;
    })
})

