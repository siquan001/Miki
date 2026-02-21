<template>
    <div class="app-workspaces app-dialog" :class={show}>
        <div class="b-drop" @click="show=false"></div>
        <div class="a-content">
            <div class="ws-header">
                <span>{{ $t("manageworkspace") }}</span>
                <MIcon name="close" @click="show=false" class="close-dialog-btn" />
                <MIcon name="add" @click="startCreate" class="add-btn" title="新增工作区" />
            </div>

            <ul class="ws-list">
                <li :class="{ 'ws-item': true, active: modelValue === 'def' }" @click="modelValue='def'" @contextmenu.prevent="">
                    <MIcon name="document" />
                    <span class="name">{{ $t("mytexts") }}</span>
                </li>
                <li v-if="isCreating" class="ws-item editing">
                    <input :ref="(el) => { if (el) editInputRef = el as HTMLInputElement }" v-model="editTitle"
                        @blur="confirmCreate" @keyup.enter="confirmCreate" :placeholder="$t('spacenaming')" />
                </li>
                <template v-for="space in spaces" :key="space.id">
                    <li v-if="space.id!== 'def'"
                    :class="{ 'ws-item': true, active: modelValue === space.id }" @click="modelValue=space.id"
                    @contextmenu.prevent="onContextMenu($event, space)">
                    <input v-if="renamingId === space.id"
                        :ref="(el) => { if (el) editInputRef = el as HTMLInputElement }" v-model="editTitle"
                        @blur="confirmRename" @keyup.enter="confirmRename" class="rename-input" />
                    <template v-else>
                        <MIcon name="folder" />
                        <span class="name">{{space.name }}</span>
                    </template>
                </li>
                </template>
                
            </ul>
        </div>

        <Menu v-model:show="menuShow" :items="menuItems" :style="menuStyle" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { NoteCore, type TextSpace } from '../core';
import Menu from '../util/Menu.vue';
import MIcon from '../util/MIcon.vue';
import bus from '../core/bus';
import { $t, nowSpace } from '../core/store';

const show=defineModel("show",{
    default:false,
    type:Boolean
})

const modelValue = defineModel("modelValue",{
    type:String
})

const spaces = ref<TextSpace[]>([]);
const editInputRef = ref<HTMLInputElement | null>(null);

// 状态管理
const isCreating = ref(false);
const renamingId = ref('');
const editTitle = ref('');

// 菜单相关
const menuShow = ref(false);
const menuPos = ref({ x: 0, y: 0 });
const activeSpace = ref<TextSpace | null>(null);

const loadSpaces = async () => {
    spaces.value = await NoteCore.getSpaces();
};

// --- 逻辑操作 ---

const startCreate = async () => {
    isCreating.value = true;
    editTitle.value = "";
    await nextTick();
    editInputRef.value?.focus();
};

const confirmCreate = async () => {
    if (!isCreating.value) return;
    const name = editTitle.value.trim();
    if (name) {
        await NoteCore.createSpace(name);
        await loadSpaces();
    }
    isCreating.value = false;
};

const onContextMenu = (e: MouseEvent, space: TextSpace) => {
    if (space.id === 'def'){
        menuShow.value = false;
        return; // 默认空间禁止重命名/删除
    }
    activeSpace.value = space;
    menuPos.value = { x: e.clientX, y: e.clientY };
    menuShow.value = true;
};

const menuItems = computed(() => [
    { title: $t("rename"), icon: 'pencil', click: () => startRename() },
    { title: $t("deletespace"), icon: 'delete', click: () => deleteSpace() }
]);

const menuStyle = computed(() => ({
    // position: 'fixed' as const,
    left: `${menuPos.value.x}px`,
    top: `${menuPos.value.y}px`
}));

const startRename = async () => {
    if (!activeSpace.value) return;
    renamingId.value = activeSpace.value.id;
    editTitle.value = activeSpace.value.name;
    await nextTick();
    editInputRef.value?.focus();
    editInputRef.value?.select();
};

const confirmRename = async () => {
    if (!renamingId.value) return;
    const newName = editTitle.value.trim();
    if (newName && activeSpace.value && newName !== activeSpace.value.name) {
        await NoteCore.updateSpace(renamingId.value, newName); // 确保 core 实现了 updateSpace
        if(nowSpace.value==renamingId.value)bus.emit("renameNowSpace");
        await loadSpaces();
    }
    renamingId.value = '';
};

const deleteSpace = async () => {
    if (!activeSpace.value) return;
    if(!confirm($t("confirmdeletespace").replace("$",activeSpace.value.name)))return;
    await NoteCore.deleteSpace(activeSpace.value.id);
    if (modelValue.value === activeSpace.value.id) {
        modelValue.value='def';
    }
    await loadSpaces();
};

onMounted(loadSpaces);
</script>

<style lang="scss">
.app-workspaces .a-content {
    padding: 20px;
    display: flex;
    flex-direction: column;

    .ws-header {
        margin-bottom: 15px;
        font-weight: bold;
        color: var(--mi-color);
        height: 40px;
        line-height: 40px;
        .m-icon{
            width: 20px;
            height: 20px;
            padding: 10px;
            float: right;
            cursor: pointer;
            &:hover {
                color: var(--mi-active);
            }
        }
        span{
            float: left;
        }
    }

    .ws-list {
        list-style: none;
        flex: 1;
        overflow-y: auto;

        .ws-item {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            margin-bottom: 8px;
            background: var(--mi-bg-0);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            .m-icon{
                width: 30px;
                height: 30px;
            }
            &:hover {
                background: var(--mi-hover);
            }

            &.active {
                background: var(--mi-active);
                color:#fff;
            }

            .name {
                flex: 1;
                margin-left: 10px;
                font-size: 14px;
            }

            .more-icon {
                opacity: 0.5;
                font-size: 12px;
            }

            input {
                width: 100%;
                border: none;
                outline: none;
                background: transparent;
                font-size: 14px;
            }
        }
    }
}


</style>