import type { VNode } from "vue"

export interface EventHandle {
    on:(event:string, listener:Function)=>void,
    off:(event:string, listener:Function)=>void,
    emit:(event:string, data?:any)=>void,
    clear:(event:string|null)=>void,
    _listeners:{[event:string]:Function[]}
}

export interface MenuItem {
    title: string,
    icon?: string | VNode,
    click: () => void,
    disabled?: boolean
}