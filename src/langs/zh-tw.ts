export default {
    diary: '日記',
    sbnote: "隨筆",
    help: "幫助",
    about: "關於",
    selecting: "請選擇..",
    isfirstnow: "已經是第一篇日記了",
    date_format: "YYYY年MM月DD日",
    howareyou: "今天心情如何？",
    datepicker: "日曆視圖",
    listpicker: "列表視圖",
    writediary: "✍️ 寫日記",
    nodiary: "暫時沒有日記哦",
    autosave: "自動保存",
    saved: "已保存",
    editor: {
        textGroup: {
            label: '文本塊',
            text: { label: '文字' },
            h1: { label: '標題 1' },
            h2: { label: '標題 2' },
            h3: { label: '標題 3' },
            h4: null,
            h5: null,
            h6: null,
            quote: { label: '引用' },
            divider: { label: "分割線" }
        },
        listGroup: {
            label: '列表',
            bulletList: { label: '無序列表' },
            orderedList: { label: '有序列表' },
            taskList: { label: '任務列表' },
        },
        advancedGroup: {
            label: '高級',
            image: { label: '圖片' },
            codeBlock: { label: '代碼塊' },
            table: { label: '表格' },
            math: { label: 'Latex公式' },
        },
    },
    charstat: "字數統計",
    autosavelast: "已自動保存上個文檔",
    save: "保存",
    stat: "統計",
    exportmd: "導出為.md",
    rename: "重命名",
    delete: "刪除",
    newdoc: "新建文檔",
    fileupload: "文件上傳",
    workspace: "工作區",
    setting: "設置",
    settings: {
        theme: "主題模式",
        theme_desc: "切換應用的主題模式（亮、暗）",
        theme_light: "淺色",
        theme_dark: "深色",
        theme_eyes: "護眼",
        lang: "語言",
        lang_desc: "切換應用的語言",
        theme_color: "主題顏色",
        theme_color_desc: "選擇頁面的主題顏色",
        theme_color_default: "藍色（默認）",
        theme_color_pink: "粉色",
        theme_color_orange: "橙色",
        theme_color_green: "綠色",
        theme_color_purple: "紫色",
        backup: "備份數據",
        backup_desc: "導出所有文章為一個.mikibase（僅用於數據備份）",
        export: "導出數據",
        export_desc: "選擇一個文件夾導出所有文章為md格式，無法透過文件夾導入數據，若進行數據遷移請用上面的東西",
        import: "從備份恢復",
        import_desc: "從.mikibase導入所有文章",
        help: "幫助",
        help_desc: "查看幫助文檔",
        see: "查看",
        imp: "導入",
        exp: "導出",
        bkp: "備份",
        processing: "處理中..."
    },
    manageworkspace: "管理工作空間",
    mytexts: "我的文稿",
    spacenaming: "空間名稱...",
    deletespace: "刪除空間",
    confirmdeletespace: "確定要刪除 \"$\" 嗎？該操作不可恢復！",
    docs: {
        help: `# 幫助

## 文檔相關

1. **創建文檔**：在左側導航欄，你可以看到一個顯眼的 \`+ 新建文稿\`，點擊即可。
2. **重命名**：鼠標右鍵左側導航欄相應文檔項，點擊「重命名」。
3. **刪除文檔**：同上，但點擊「刪除」（文檔一旦刪除無法恢復，請謹慎）。
4. **導入 Markdown 文檔**：點擊左側導航欄中的「文件上傳」圖標，選擇 Markdown 文件。
5. **選擇/創建工作區**：點擊左側導航欄的「文件夾」圖標，進行相關操作，其創建/刪除/重命名均與上方內容類似。

## 編輯器

1. 本編輯器使用 Markdown 格式，你可以按 Markdown 格式輸入類似「# 」，系統會自動識別。
2. 你也可以在每行開頭時輸入「/」，選擇你要插入的內容。
3. 你可以透過拖選文本，在彈出的二級菜單中進行文本樣式設置。
4. 你可以點擊上方的「菜單」圖標，再點擊「保存」以保存文檔。同時，編輯器會每 3 分鐘自動保存，在切換文檔時也會自動保存。
5. 同上，點擊「統計」可以統計文章字數。
6. 同上，點擊「導出為 .md」，可以以 Markdown 格式導出正在編輯的文檔至本地。

## 日記

1. 點擊左側導航欄的「日記」即可使用日記功能。
2. 進入時默認顯示今天的日記，你可以透過上方導航欄的「<」和「>」圖標切換。點擊中間的日曆圖標可以進行可視化選擇。
3. **注意**：你無法在本軟件中創建不是今日日期的日記。這意味著若某天你沒有寫日記，你無法進行「補簽」。
4. 你可以修改過去的日記，但你無法刪除它們。
5. 日記的編輯器與文檔編輯器相同。

## 導入導出數據

1. 在設置中導入導出。
2. 對於單篇文檔的導入和導出見「編輯器」部分。

## 主題

1. 在設置中切換主題模式。`,
        about: `# Miki · 一種簡單的創作

> 版本：V0.0.1
> 
> 海內存知己，天涯若比鄰。 —— 王勃

如果你忽然想寫點什麼，但又不想用某些界面臃腫的「大廠風」或者功能複雜的「專業風」的筆記軟件。**Miki 便是為你而生的。**

Miki 以 Markdown 格式創作，在提供必要功能的同時將簡潔性提升至最高。使用方式簡單且符合直覺，點擊新建文稿，即可開始創作。

Miki 沒有登錄註冊，沒有雲同步，沒有 AI 輔助創作，只有基本的 Markdown 編寫和數據導入導出功能。

希望 Miki 能夠讓你集中精力，用充沛的生命力將文字填滿，而不把時間浪費在排版和樣式上。

*創作，本來就該這麼簡單。*

<br />

> Miki 作者：yz小雨竹（[雨竹upon : siquan001](https://github.com/siquan001/)）
>
> Github 倉庫：[siquan001/miki](https://github.com/siquan001/miki/)
>
> License：[GPL-3.0](https://github.com/siquan001/Miki/blob/main/LICENSE)
>
> Powered By Vue3, Vite, localforage, dayjs, milkdown, thememirror (CodeMirror 主題), VCalendar, Scss, JsZip, 圖標（見 [Icons.ts](https://github.com/siquan001/Miki/blob/main/src/util/Icons.ts)）`
    }
}