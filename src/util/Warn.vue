<template>
    <div class="warn-text">
        <slot></slot>
    </div>
</template>

<style>
.warn-text{
    line-height: 1em;
    padding:1em 1em;
    background-color: #ff0;
    border-radius: 10px;
    color:rgb(255, 94, 0);
    font-size:12px;
}
</style>