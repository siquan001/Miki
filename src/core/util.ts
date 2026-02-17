export function switchFull(){
    if(document.fullscreenElement){
        document.exitFullscreen();
    }else{
        document.body.requestFullscreen();
    }
}

export function download(name:string,content:string){
    const a=document.createElement("a");
    a.href=URL.createObjectURL(new Blob([content],{type:"text/plain"}));
    a.download=name;
    a.click();
}

export function pickFile(accept?:string){
    return new Promise<File>((res,rej)=>{
        const input=document.createElement("input");
        input.type="file";
        if(accept){
            input.accept=accept;
        }
        input.onchange=()=>{
            if(input.files&&input.files[0]){
                res(input.files[0]);
            }else{
                rej(new Error("No file selected"));
            }
        }
        input.click();
    });
}