import localforage from "localforage";

export interface CSSItem{
    id:string,
    name:string,
    enabled:boolean
}

const KEY='miki-user-csslist';
export function getCSSList():CSSItem[]{
    return JSON.parse(localStorage.getItem(KEY)||'[]');
}

export function setCSSList(list:CSSItem[]){
    localStorage.setItem(KEY,JSON.stringify(list));

    g();
}

function g(){
    let list=getCSSList();
    document.querySelectorAll("style.user-css").forEach(el=>{
        let ti=list.find(ci=>ci.id==el.getAttribute("data-id"));
        if(ti&&ti.enabled){}else{
            el.remove();
        }
    })
    list.forEach(ci=>{
        if(ci.enabled){
            if(!document.querySelector("style.user-css[data-id=\""+ci.id+"\"]")){
                addCSS(ci.id);
            }
        }
    })
}
g();

export function addCSS(id:string){
    let s=document.createElement("style");
    localforage.getItem(id).then(ms=>{
        s.innerHTML=ms as string;
    })
    s.classList.add("user-css");
    s.setAttribute("data-id",id);
    document.head.append(s);
}

export async function setCSS(id:string,content:string){
    await localforage.setItem(id,content);
    let ys=document.querySelector("style.user-css[data-id=\""+id+"\"]");
    if(ys)ys.innerHTML=content;
}

export async function getCSS(id:string){
    return await localforage.getItem(id) as string;
}