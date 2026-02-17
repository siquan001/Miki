interface DicPickerOptions{
    startIn?:string;
    id?:string;
    mode?:'read'|'readwrite';
}

interface Window{
    electronAPI(api:string,...args:any[]):Promise<any>;
    showDirectoryPicker(options?:DicPickerOptions):Promise<FileSystemDirectoryHandle>;
}