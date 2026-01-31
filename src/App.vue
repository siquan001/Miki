<template>
    <div class="app-left">
        <Logo />

        <ListItem icon="diary" title="日记"/>
        <ListItem icon="text" title="随笔"/>

        <TextList/>
    </div>
    <div class="app-right">
        <Nav/>
        <MilkdownProvider>
            <Editor/>
        </MilkdownProvider>
    </div>
</template>

<script setup lang="ts">
import { MilkdownProvider } from '@milkdown/vue';
import Logo from './parts/Logo.vue';
import Nav from './parts/Nav.vue';
import TextList from './parts/TextList.vue';
import ListItem from './util/ListItem.vue';
import Editor from './parts/Editor.vue';

</script>

<style lang="scss">
.app-left{
    width: 300px;
    height: 100vh;
    background-color: rgb(236,239,244);
    position: absolute;
    top:0;
    left:0;
}

.app-right{
    width: calc(100% - 300px);
    height: 100vh;
    position: absolute;
    top:0;
    right:0;
}
</style>