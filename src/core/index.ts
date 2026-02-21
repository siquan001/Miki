import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import localforage from "localforage";
import { getHash } from "./util";

// 笔记元数据：轻量，用于列表展示
export interface TextMeta {
    id: string;
    title: string;
    createTime: number;
    editTime: number;
    tags: string[];
}

// 笔记空间
export interface TextSpace {
    id: string;
    name: string;
}

// 日记元数据
export interface DiaryMeta {
    id: string;
    label: string; 
}

// 随笔元数据
export interface DraftMeta {
    id: string;
    createTime: number;
    editTime: number;
    tags: string[];
}
const SPACES_KEY = "all_spaces";
const getMetaKey = (spaceId: string) => `meta_${spaceId}`;
const DIARY_META_KEY = "META_DIARY";
const DEFAULT_SPACE: TextSpace = { id: "def", name: "My Docs" };

export const NoteCore = {
    // --- 空间管理 ---
    async getSpaces(): Promise<TextSpace[]> {
        const spaces = await localforage.getItem<TextSpace[]>(SPACES_KEY);

        // 严谨处理：只有当数据库中完全没有该 Key 时（首次启动），才进行初始化
        if (spaces === null) {
            await localforage.setItem(SPACES_KEY, [DEFAULT_SPACE]);
            return [DEFAULT_SPACE];
        }

        return spaces;
    },

    async getSpaceDetail(id: string): Promise<TextSpace | undefined> {
        const s = await this.getSpaces();
        for (let i = 0; i < s.length; i++) {
            if ((s[i] as TextSpace).id == id) {
                return s[i];
            }
        }
    },

    async createSpace(name: string) {
        const spaces = await this.getSpaces();
        const newSpace = { id: getHash(), name };
        await localforage.setItem(SPACES_KEY, [newSpace, ...spaces]);
        return newSpace;
    },

    // --- 笔记管理 ---
    /** 获取列表信息（Meta） */
    async getNoteMetas(spaceId: string): Promise<TextMeta[]> {
        await this.getSpaces(); // to ensure inited
        return (await localforage.getItem<TextMeta[]>(getMetaKey(spaceId))) || [];
    },

    /** 创建笔记：元数据统存，内容按 ID 独存 */
    async createNote(spaceId: string, title: string, content: string, tags: string[] = []) {
        const metas = await this.getNoteMetas(spaceId);
        const id = getHash();
        const now = Date.now();
        const newMeta: TextMeta = { id, title, tags, createTime: now, editTime: now };

        await Promise.all([
            localforage.setItem(id, content), // 内容独立存
            localforage.setItem(getMetaKey(spaceId), [newMeta, ...metas]) // 索引统存
        ]);
        return newMeta;
    },

    /** 更新笔记 */
    async updateNote(spaceId: string, noteId: string, updates: { title?: string; content?: string; tags?: string[] }) {
        const metas = await this.getNoteMetas(spaceId);
        const now = Date.now();

        // 更新索引信息
        const updatedMetas = metas.map(m =>
            m.id === noteId ? { ...m, ...updates, editTime: now } : m
        );

        const tasks: Promise<any>[] = [localforage.setItem(getMetaKey(spaceId), updatedMetas)];
        if (updates.content !== undefined) {
            tasks.push(localforage.setItem(noteId, updates.content));
        }
        await Promise.all(tasks);
    },

    /** 删除笔记 */
    async deleteNote(spaceId: string, noteId: string) {
        const metas = await this.getNoteMetas(spaceId);
        await Promise.all([
            localforage.setItem(getMetaKey(spaceId), metas.filter(m => m.id !== noteId)),
            localforage.removeItem(noteId)
        ]);
    },
    getDiaryId(date:Dayjs){
        return "DIARY_"+date.format("YYYY-MM-DD");
    },
    getDiaryDate(id:string){
        const dateStr=id.replace("DIARY_","");
        return dayjs(dateStr);
    },
    async getDiary(date:Dayjs){
        const id=this.getDiaryId(date);
        const metas:DiaryMeta[]=(await localforage.getItem(DIARY_META_KEY))||[];
        return metas.find(meta=>meta.id==id);
    },
    async getDiaries(){
        const metas:DiaryMeta[]=(await localforage.getItem(DIARY_META_KEY))||[];
        return metas;
    },

    async createDiary(label?:string){
        const metas:DiaryMeta[]=(await localforage.getItem(DIARY_META_KEY))||[];
        const now=dayjs();
        const id=this.getDiaryId(now);
        const newMeta:DiaryMeta={id,label:label||""};
        metas.unshift(newMeta);
        await Promise.all([
            localforage.setItem(id,""),
            localforage.setItem(DIARY_META_KEY,metas)
        ]);
        return newMeta;
    },

    async updateDiary(id:string,updates:{label?:string,content?:string}){
        const metas:DiaryMeta[]=(await localforage.getItem(DIARY_META_KEY))||[];
        for(let i=0;i<metas.length;i++){
            if((metas[i] as DiaryMeta).id==id){
                (metas[i] as DiaryMeta).label=updates.label||'';
                break;
            }
        }
        await localforage.setItem(DIARY_META_KEY,metas);
        if(updates.content!==undefined){
            await localforage.setItem(id,updates.content);
        }
    },

    /** 统一的内容获取接口 (日记、随笔、普通笔记通用) */
    async getContent(id: string): Promise<string | null> {
        return await localforage.getItem<string>(id);
    },

    /** * 更新空间名称
   */
    async updateSpace(spaceId: string, newName: string) {
        const spaces = await this.getSpaces();
        const updated = spaces.map(s => s.id === spaceId ? { ...s, name: newName } : s);
        await localforage.setItem(SPACES_KEY, updated);
    },

    /** * 删除空间及其下属所有笔记
     */
    async deleteSpace(spaceId: string) {
        // 1. 获取该空间下的所有笔记元数据，为了拿到它们的 ID 来删除具体内容
        const metaKey = getMetaKey(spaceId);
        const metas = await this.getNoteMetas(spaceId);

        // 2. 并行删除所有笔记的具体内容
        const deleteContentTasks = metas.map(meta => localforage.removeItem(meta.id));

        // 3. 删除该空间的元数据列表
        const deleteMetaTask = localforage.removeItem(metaKey);

        // 4. 从总空间列表中移除该空间
        const spaces = await this.getSpaces();
        const updateSpacesTask = localforage.setItem(SPACES_KEY, spaces.filter(s => s.id !== spaceId));

        // 执行所有清理任务
        await Promise.all([...deleteContentTasks, deleteMetaTask, updateSpacesTask]);
    }
};