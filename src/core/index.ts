import localforage from "localforage";

function getHash() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
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
    label: string; // 额外增加的 label
    createTime: number;
    editTime: number;
    tags: string[];
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
const DIARY_KEY = "special_diaries";
const DRAFT_KEY = "special_drafts";

export const NoteCore = {
    // --- 空间管理 ---
    async getSpaces(): Promise<TextSpace[]> {
        return (await localforage.getItem<TextSpace[]>(SPACES_KEY)) || [];
    },

    async createSpace(name: string) {
        const spaces = await this.getSpaces();
        const newSpace = { id: getHash(), name };
        await localforage.setItem(SPACES_KEY, [...spaces, newSpace]);
        return newSpace;
    },

    // --- 笔记管理 ---
    /** 获取列表信息（Meta） */
    async getNoteMetas(spaceId: string): Promise<TextMeta[]> {
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
            localforage.setItem(getMetaKey(spaceId), [...metas, newMeta]) // 索引统存
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
    // --- 日记模块 (Diary) ---
    async getDiaries(): Promise<DiaryMeta[]> {
        return (await localforage.getItem<DiaryMeta[]>(DIARY_KEY)) || [];
    },

    async createDiary(content: string, label: string, tags: string[] = []) {
        const diaries = await this.getDiaries();
        const id = getHash();
        const now = Date.now();

        const newMeta: DiaryMeta = { id, label, tags, createTime: now, editTime: now };

        await Promise.all([
            localforage.setItem(id, content),
            localforage.setItem(DIARY_KEY, [newMeta, ...diaries]) // 新日记排在前面
        ]);
        return newMeta;
    },

    async updateDiary(id: string, updates: { content?: string; label?: string; tags?: string[] }) {
        const diaries = await this.getDiaries();
        const updatedDiaries = diaries.map(d =>
            d.id === id ? { ...d, ...updates, editTime: Date.now() } : d
        );

        const tasks: Promise<any>[] = [localforage.setItem(DIARY_KEY, updatedDiaries)];
        if (updates.content !== undefined) {
            tasks.push(localforage.setItem(id, updates.content));
        }
        await Promise.all(tasks);
    },

    // --- 随笔模块 (Draft) ---
    async getDrafts(): Promise<DraftMeta[]> {
        return (await localforage.getItem<DraftMeta[]>(DRAFT_KEY)) || [];
    },

    async createDraft(content: string, tags: string[] = []) {
        const drafts = await this.getDrafts();
        const id = getHash();
        const now = Date.now();

        const newMeta: DraftMeta = { id, tags, createTime: now, editTime: now };

        await Promise.all([
            localforage.setItem(id, content),
            localforage.setItem(DRAFT_KEY, [newMeta, ...drafts])
        ]);
        return newMeta;
    },

    /** 统一的内容获取接口 (日记、随笔、普通笔记通用) */
    async getContent(id: string): Promise<string | null> {
        return await localforage.getItem<string>(id);
    },

    /** 统一的删除接口 (根据类型清理元数据) */
    async deleteSpecial(id: string, type: 'diary' | 'draft') {
        const key = type === 'diary' ? DIARY_KEY : DRAFT_KEY;
        const list = (await localforage.getItem<any[]>(key)) || [];
        await Promise.all([
            localforage.setItem(key, list.filter(item => item.id !== id)),
            localforage.removeItem(id)
        ]);
    }
};