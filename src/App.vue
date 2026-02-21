<template>
    <div class="app" :class="[mode,'co-'+theme]">
    <div class="app-left" :style="{ width: leftWidth + 'px' }">
        <Logo @click="selectedId='';showTab=0" />

        <ListItem icon="diary" :title="$t('diary')" :active="showTab==3" @click="selectedId='';showTab=3" />
        <!-- <ListItem icon="text" :title="$t('sbnote')" /> -->

        <TextList @open="showTab = 1" />
    </div>
    <div class="app-fg" :style="{ left: (leftWidth - 2) + 'px' }" @mousedown="startResize"></div>
    <div class="app-right" :style="{ width: 'calc(100% - ' + leftWidth + 'px)' }">
        <Nav @setting="showTab = 2" />
        <div class="app-tabs">
            <div class="tab initial" :style="{ display: showTab == 0 ? 'flex' : 'none' }">
                <Logo />
                <ul class="initlist">
                    <ListItem icon="help" :title="$t('help')" @click="contentId='help';showTab=4"/>
                    <ListItem icon="about" :title="$t('about')" @click="contentId='about';showTab=4"/>
                </ul>
            </div>
            <div class="tab ap-editor" :style="{ display: showTab == 1 ? 'block' : 'none' }">
                <MilkdownProvider>
                    <Editor :key="selectedId" :id="selectedId"/>
                </MilkdownProvider>
            </div>
            <div class="tab setting" :style="{ display: showTab == 2 ? 'block' : 'none' }">
                <Setting />
            </div>
            <div class="tab ap-diary" :style="{ display: showTab == 3 ? 'block' : 'none' }">
                <Diary v-if="showTab==3"/>
            </div>
            <div class="tab ap-readeditor" :style="{ display: showTab == 4 ? 'block' : 'none' }">
                <MilkdownProvider>
                    <ReadEditor :key="contentId" :content="readonlyContent"/>
                </MilkdownProvider>
            </div>
        </div>
    </div>
    <Workspaces v-model:show="showWork" v-model:model-value="nowSpace"/>
    <div class="co"></div>
    </div>
</template>

<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue';
import Logo from './parts/Logo.vue';
import Nav from './parts/Nav.vue';
import TextList from './parts/TextList.vue';
import ListItem from './util/ListItem.vue';
import Editor from './parts/Editor.vue';
import { onMounted, ref } from 'vue';
import Setting from './parts/Setting.vue';
import bus from './core/bus';
import { nowSpace, selectedId, showTab, showWork,mode, contentId, readonlyContent, theme, $t } from './core/store';
import Workspaces from './parts/Workspaces.vue';
import Diary from './parts/Diary.vue';
import ReadEditor from './parts/ReadEditor.vue';

let stolw = localStorage.getItem('kd');
const leftWidth = ref(stolw ? parseFloat(stolw) : 300);

const startResize = (e: MouseEvent) => {
    e.preventDefault();

    const sx = e.clientX;
    const sw = leftWidth.value;

    const onMouseMove = (e2: MouseEvent) => {
        const newWidth = sw + (e2.clientX - sx);
        if(newWidth<50){
            leftWidth.value = 0;
        }else if(newWidth<200){
            leftWidth.value = 200;
        }else if(newWidth > window.innerWidth * 0.5){
            leftWidth.value=window.innerWidth * 0.5;
        }else{
            leftWidth.value=newWidth;
        }
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        localStorage.setItem("kd", leftWidth.value.toString());
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
};

onMounted(() => {
    document.addEventListener("click", () => {
        bus.emit("doc-click");
    })
    window.addEventListener('resize',() => {
        if(leftWidth.value>window.innerWidth*0.5){
            leftWidth.value=window.innerWidth*0.5;
        }
    })
    // because App just use onetime,I think unmounted is useless
})
</script>

<style lang="scss">
.app{
    width:100%;
    height:100%;
}
.app-left {
    width: 300px;
    height: 100vh;
    background-color: var(--mi-bg-1);
    position: absolute;
    top: 0;
    left: 0;
}

.app-fg {
    width: 4px;
    height: 100vh;
    position: absolute;
    top: 0;
    // left: 298px;
    z-index: 99;
    cursor: ew-resize;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1); // 增加悬浮提示
    }
}

.app-right {
    width: calc(100% - 300px);
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    background-color: var(--mi-bg-0);
    overflow: hidden;

    .app-tabs {
        width: 100%;
        height: calc(100% - 36px);

        .tab {
            display: none;
            height: 100%;

            &.initial {
                justify-content: center;
                align-items: center;
                flex-direction: column;

                .logo {
                    font-size: 80px;
                    color: var(--mi-se-color-0);
                }

                .initlist {
                    margin: 60px 0;
                    margin-bottom: 40px;
                    width: 300px;

                    .nav-list-item {
                        margin: 5px 0;
                        color: var(--mi-se-color-1);
                        background-color: var(--mi-bg-0-1);

                        &:hover {
                            background-color: var(--mi-bg-0-2);
                        }
                    }
                }

            }
        }
    }
}

.co{
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ff00003b;
    opacity: 0;
    transition:all .3s;
    pointer-events: none;
    z-index:999;
}

.eye .co {
    opacity: .3;
}
</style>