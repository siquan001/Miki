<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import bus from '../core/bus';
import { $t, isfullscreen, nowDiaryDate, nowSpace, selectedId, showTab } from '../core/store';
import type { MenuItem } from '../core/types';
import { download, switchFull } from '../core/util';
import Menu from '../util/Menu.vue';
import MIcon from '../util/MIcon.vue';
import dayjs from 'dayjs';
import { NoteCore } from '../core';
const editorControlsMenu = computed<MenuItem[]>(() => [
    {
        icon: "save",
        title: $t("save"),
        click: () => {
            bus.emit("save"); // to emit in the editor
        }
    }, {
        icon: "stat",
        title: $t("stat"),
        click: () => {
            bus.emit("stat");
        }
    }, {
        icon: "md",
        title: $t("exportmd"),
        click: () => {
            if (showTab.value == 1) {
                NoteCore.getContent(selectedId.value).then(content => {
                    NoteCore.getNoteMetas(nowSpace.value).then(metas => {
                        let meta = metas.find(m => m.id == selectedId.value);
                        if (meta) {
                            download(`${meta.title}.md`, content || "");
                        }
                    })
                })
            } else if (showTab.value == 3) {
                NoteCore.getDiary(nowDiaryDate.value).then(diary => {
                    if (!diary) return;
                    NoteCore.getContent(NoteCore.getDiaryId(nowDiaryDate.value)).then(content => {
                        download(nowDiaryDate.value.format("YYYY-MM-DD") + " " + (diary.label || "") + ".md", content || "");
                    })
                })
            }
        }
    }
]);
const menubtn = ref<HTMLElement>();
const menuLeft = ref(0);
const showEditorMenu = ref(false);
const toastText = ref("");
const isDiaryNow = computed(() => {
    if (NoteCore.getDiaryId(dayjs()) == NoteCore.getDiaryId(nowDiaryDate.value)) {
        return true;
    }
    return false;
});
let tot: any = void 0;
bus.on("toast", (text: string, time = 3000) => {
    toastText.value = text;
    clearTimeout(tot);
    tot = setTimeout(() => {
        toastText.value = '';
    }, time);
})
onMounted(() => {
    if (menubtn.value) {
        menuLeft.value = (menubtn.value as HTMLElement).offsetLeft;
    }
})

watch(showTab, () => {
    if (menubtn.value) {
        menuLeft.value = (menubtn.value as HTMLElement).offsetLeft;
    }
})
defineEmits(["setting"]);
</script>

<template>
    <div class="nav">
        <div class="nav-left">
            <div class="nav-btn" @click="$emit('setting')">
                <MIcon name="setting" />
            </div>
            <div class="nav-btn" @click.stop="showEditorMenu = true" ref="menubtn" v-if="showTab == 1 || showTab == 3">
                <MIcon name="menu" />
            </div>
            <div class="nav-btn" @click="bus.emit('ai-assist')" v-if="showTab == 1 || showTab == 3">
                <MIcon name="ai" />
            </div>
            <div class="nav-btn" @click="bus.emit('diary-last')" v-if="showTab == 3">
                <MIcon name="chleft" />
            </div>
            <div class="nav-btn" @click="bus.emit('showpicker')" v-if="showTab == 3">
                <MIcon name="diary" />
            </div>
            <div class="nav-btn" @click="bus.emit('diary-next')" v-if="showTab == 3 && (!isDiaryNow)">
                <MIcon name="chright" />
            </div>

        </div>
        <div class="toast">{{ toastText }}</div>
        <div class="nav-right">
            <div class="nav-btn" @click="switchFull()">
                <MIcon :name="isfullscreen ? 'unfull' : 'full'" />
            </div>
            <div class="nav-btn">
                <MIcon name="minimize" />
            </div>
            <div class="nav-btn">
                <MIcon name="maximize" />
            </div>
            <div class="nav-btn close">
                <MIcon name="close" />
            </div>
        </div>
    </div>
    <Menu :items="editorControlsMenu" v-model:show="showEditorMenu" :style="{ top: '36px', left: menuLeft + 'px' }" />
</template>

<style lang="scss">
.nav {
    width: 100%;
    height: 36px;
    opacity: 1;
    transition: all .2s;
    color: var(--mi-color);

    .nav-left {
        float: left;

        .nav-btn {
            width: 30px;
            height: 30px;
            margin: 3px;
            border-radius: 4px;

            .m-icon {
                margin: 7px;
            }
        }
    }

    .toast {
        float: left;
        height: 30px;
        line-height: 30px;
        color: var(--mi-color);
        font-size: 14px;
        margin: 3px 10px;
    }

    .nav-right {
        float: right;
    }

    .nav-btn {
        width: 36px;
        height: 36px;
        float: left;
        transition: all .1s;

        .m-icon {
            width: 16px;
            height: 16px;
            margin: 10px;
        }

        &:hover {
            background-color: var(--mi-hover);
        }

        &.close:hover {
            background-color: red;
            color: #fff;
        }
    }
}
</style>