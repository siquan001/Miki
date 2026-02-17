import localforage from "localforage";
import { NoteCore, type TextMeta } from ".";
import { pickFile } from "./util";
import { nowSpace } from "./store";
import bus from "./bus";

export async function exportAlltoLocal(callbackFn?: (stat: boolean, msg: string) => void, progressingFn?: (done: number, total: number) => void) {
    let dirHandle: FileSystemDirectoryHandle;
    try {
        dirHandle = await window.showDirectoryPicker({ mode: "readwrite" });
    } catch (err) {
        console.error(err);
        if (callbackFn) callbackFn(false, "用户取消选择");
        return;
    }
    try {
        let spaces = await NoteCore.getSpaces();
        let results = [];
        let handles = [];
        for (let space of spaces) {
            results.push(await NoteCore.getNoteMetas(space.id));
            handles.push(await dirHandle.getDirectoryHandle(space.name, { create: true }));
        }
        let diaries=await NoteCore.getDiaries();
        let total = 0, done = 0;
        for (let metas of results) total += metas.length;
        total += diaries.length;
        for (let i = 0; i < results.length; i++) {
            let metas = results[i] as TextMeta[];
            let handle = handles[i] as FileSystemDirectoryHandle;
            for (let meta of metas) {
                let content = await NoteCore.getContent(meta.id);
                let fileHandle = await handle.getFileHandle(meta.title.replace(/[\\/:\*\?"<>\|]/g, '_')+"_"+meta.id.slice(-5)+".md", { create: true });
                let writer = await fileHandle.createWritable()
                await writer.write(content || '')
                await writer.close();
                done++;
                if (progressingFn) progressingFn(done, total);
            }
        }

        if(diaries.length>0){
            let handle=await dirHandle.getDirectoryHandle("Miki_Diary_"+Math.random().toString(36).substring(2,5),{create:true});
            for(let meta of diaries){
                let content=await NoteCore.getContent(meta.id);
                let fileHandle=await handle.getFileHandle(meta.id+".md",{create:true});
                let writer=await fileHandle.createWritable();
                await writer.write(`> ${meta.label}\n\n`+(content||''));
                await writer.close();
                done++;
                if (progressingFn) progressingFn(done, total);
            }
        }
        if (callbackFn) callbackFn(true, "导出完成");

    } catch (err) {
        console.log(err);
        if (callbackFn) callbackFn(false, "导出失败");
    }

}

export async function exportAlltoMikiBase(callbackFn?: (stat: boolean, msg: string) => void) {
    const JSZip=await import('jszip');
    let zip = new JSZip.default();
    let ks=await localforage.keys();
    for(let k of ks){
        let f=await localforage.getItem(k);
        let fm=typeof f=="string"?f:JSON.stringify(f);
        zip.file(k, fm);
    }
    let g=await zip.generateAsync({ type: "blob" });
    let a=document.createElement("a");
    a.href=URL.createObjectURL(g);
    a.download="note.mikibase";
    a.click();
    if (callbackFn) callbackFn(true, "导出完成");
}

export async function importFromMikiBase(callbackFn?: (stat: boolean, msg: string) => void) {
    let file=await pickFile('.mikibase');
    const JSZip=await import('jszip');
    let zip = new JSZip.default();
    try {
        let content = await zip.loadAsync(file);
        let keys = Object.keys(content.files);
        async function hb(k:string,v?:string){
            let nsp=JSON.parse(v||"[]");
            let ysp=await localforage.getItem(k) as any[]||[];
            nsp=nsp.filter((s:any)=>!ysp.find(ys=>ys.id==s.id));
            ysp.push(...nsp);
            await localforage.setItem(k, ysp);
        }
        for (let k of keys) {
            let v = await content.file(k)?.async("string");
            if(k=="all_spaces"){
                await hb(k,v);
            }else if(k.startsWith("meta_")||k.startsWith("META_")){
                if(await localforage.getItem(k)){
                    await hb(k,v);
                }else{
                    await localforage.setItem(k, JSON.parse(v||"[]"));
                }
            }else{
                await localforage.setItem(k, v);
            }
        }
        if (callbackFn) callbackFn(true, "导入完成");
    } catch (err) {
        console.error(err);
        if (callbackFn) callbackFn(false, "导入失败，文件可能损坏");
    }
}

export async function upFileText(){
    const k=await pickFile(".md");
    const content=await k.text();
    const name=k.name.replace(/\.md$/,"");
    await NoteCore.createNote(nowSpace.value,name,content);
    bus.emit("refreshList");
}