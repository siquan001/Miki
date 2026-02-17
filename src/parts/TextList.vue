<template>
    <div class="nav-top">
        <div class="nav-label">{{ nowSpace == "def" ? "我的文稿" : nowSpaceDt.name }}</div>
        <div class="spaces" @click="showWork=true"><MIcon name="folder" /></div>
        <div class="upload-md" @click="upFileText()"><MIcon name="upload" /></div>
    </div>
    
    <ul class="text-list">
        <li @click="startCreating">
            <div class="title"><MIcon name="add" /> 新建文稿</div>
        </li>

        <li v-if="isCreating" class="renameing">
            <div class="title">
                <input ref="inputRef" v-model="newTitle" class="title-input" @keyup.enter="confirmCreate" @blur="confirmCreate" />
            </div>
        </li>

        <li v-for="text in textList" :key="text.id" 
            :class="{ active: selectedId === text.id,renameing:renamingId===text.id }"
            @click="$emit('open',text.id);handleSelect(text.id)"
            @contextmenu.prevent="onContextMenu($event, text)">
            
            <div v-if="renamingId === text.id" class="title">
                <input :ref="(el) => { if (el) renameInputRef = el as HTMLInputElement }" v-model="renameTitle" class="title-input" @keyup.enter="confirmRename" @blur="confirmRename" />
            </div>
            <div v-else class="title">{{ text.title || '无标题' }}</div>
        </li>
    </ul>

    <Menu v-model:show="menuShow" :items="menuItems" :style="menuStyle" />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, nextTick, computed } from 'vue';
import MIcon from '../util/MIcon.vue';
import Menu from '../util/Menu.vue'; // 确保路径正确
import { NoteCore, type TextMeta, type TextSpace } from '../core';
import type { MenuItem } from '../core/types';
import { nowSpace, selectedId, showTab, showWork } from '../core/store';
import bus from '../core/bus';
import { upFileText } from '../core/export';
import { download } from '../core/util';

defineEmits(["open"])
// ... 原有的 ref 定义 ...
const nowSpaceDt = ref<TextSpace>({ name: "", id: "def" });
const textList = ref<TextMeta[]>([]);
bus.on("renameNowSpace",async ()=>{
    nowSpaceDt.value=(await NoteCore.getSpaceDetail(nowSpace.value)) as TextSpace;
})
bus.on("refreshList",async ()=>{
    textList.value=await NoteCore.getNoteMetas(nowSpace.value);
})

// 菜单相关状态
const menuShow = ref(false);
const menuPos = ref({ x: 0, y: 0 });
const currentActiveText = ref<TextMeta | null>(null);

// 重命名相关状态
const renamingId = ref('');
const renameTitle = ref('');
const renameInputRef = ref<HTMLInputElement | null>(null);

// --- 核心逻辑 ---

const loadTextList = async () => {
    nowSpaceDt.value = (await NoteCore.getSpaceDetail(nowSpace.value)) as TextSpace;
    textList.value = await NoteCore.getNoteMetas(nowSpace.value);
};

// 右键菜单内容
const menuItems = computed<(MenuItem | undefined)[]>(() => [
    {
        title: '重命名',
        icon: 'pencil',
        click: () => startRename()
    },
    {
        title: '删除',
        icon: 'delete',
        click: () => handleDelete()
    },
    {
        title: '导出为.md',
        icon: 'md',
        click: () => {
            if(currentActiveText.value){
                let bid=currentActiveText.value.id;
                NoteCore.getContent(bid).then(content=>{
                    NoteCore.getNoteMetas(nowSpace.value).then(metas=>{
                        let meta=metas.find(m=>m.id==bid);
                        if(meta){
                            download(`${meta.title}.md`,content||"");
                        }
                    })
                }) 
            }
        }
    }
]);

const menuStyle = computed(() => ({
    left: `${menuPos.value.x}px`,
    top: `${menuPos.value.y}px`,
}));

// 触发右键菜单
const onContextMenu = (e: MouseEvent, text: TextMeta) => {
    currentActiveText.value = text;
    menuPos.value = { x: e.clientX, y: e.clientY };
    menuShow.value = true;
};

// --- 操作函数 ---

const startRename = async () => {
    if (!currentActiveText.value) return;
    renamingId.value = currentActiveText.value.id;
    renameTitle.value = currentActiveText.value.title;
    await nextTick();
    renameInputRef.value?.focus();
};

const confirmRename = async () => {
    if (!renamingId.value) return;
    const newName = renameTitle.value.trim();
    if(!newName){
        // TODO : show toast
    }
    if (newName && currentActiveText.value && newName !== currentActiveText.value.title) {
        await NoteCore.updateNote(nowSpace.value, renamingId.value, { title: newName });
        await loadTextList();
    }
    renamingId.value = '';
};

const handleDelete = async () => {
    if (!currentActiveText.value) return;

    await NoteCore.deleteNote(nowSpace.value, currentActiveText.value.id);
    await loadTextList();
    if(selectedId.value===currentActiveText.value.id){
        selectedId.value="";
        showTab.value=0;
    }
};

// 新建状态管理
const isCreating = ref(false);
const newTitle = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

// 开启新建模式
const startCreating = async () => {
    isCreating.value = true;
    newTitle.value = "";
    // 等待 DOM 渲染后自动聚焦
    await nextTick();
    inputRef.value?.focus();
};

const DefContent=`# Miki\n\n> 海内存知己，天涯若比邻。\n\n千里之行，始于足下，从这里开始你的创作吧！`;

// 确认创建逻辑
const confirmCreate = async () => {
    if (!isCreating.value) return; // 防止 blur 和 enter 重复触发

    const title = newTitle.value.trim();
    if (title) {
        const nt=await NoteCore.createNote(nowSpace.value, title, DefContent);
        await loadTextList();
        selectedId.value=nt.id;
        showTab.value=1;
    }
    
    // 重置状态
    isCreating.value = false;
    newTitle.value = "";
};

const handleSelect = (id: string) => {
    selectedId.value = id;
};

watch(nowSpace, () => loadTextList());
onMounted(() => loadTextList());
</script>

<style lang="scss">
.title-input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 14px;
    color: var(--mi-color);
    padding: 0;
    margin: 0;

    &::placeholder {
        color: #ccc;
    }
}
.nav-top {
    padding: 0 20px;
    padding-top: 20px;
    overflow: hidden;

    .nav-label {
        font-size: 12px;
        line-height: 20px;
        color: var(--mi-color-label);
        float: left;
    }

    .spaces,.upload-md {
        width: 20px;
        height: 20px;
        float: right;
        border-radius: 4px;
        cursor: pointer;
        margin: 0 4px;

        .m-icon {
            width: 16px;
            height: 16px;
            margin: 2px;
        }

        &:hover{
            background-color: var(--mi-hover);
        }
    }
}


.text-list {
    margin: 10px 20px;
    list-style: none;
    height: calc(100% - 250px);
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;

    li {
        width: 100%;
        margin: 0 4px;
        border-radius: 4px;
        height: 36px;
        color: var(--mi-color);
        transition: all .2s;
        cursor: pointer;

        &:hover,&.renameing{
            background-color: var(--mi-hover);
        }
        &.active{
            background-color: var(--mi-active);
            color:#fff;
        }

        .title {
            line-height: 36px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: calc(100% - 20px);
            font-size: 14px;
            padding: 0 10px;
        }

        .m-icon {
            float: left;
            width: 1.5em;
            height: 36px;
            padding-right: .5em;
        }
    }
}
</style>