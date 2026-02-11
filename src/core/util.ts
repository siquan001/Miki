export function switchFull(){
    if(document.fullscreenElement){
        document.exitFullscreen();
    }else{
        document.body.requestFullscreen();
    }
}