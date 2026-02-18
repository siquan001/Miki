export default {
    diary:'日记',
    sbnote:"随笔",
    help:"帮助",
    about:"关于",
    selecting:"请选择..",
    isfirstnow:"已经是第一篇日记了",
    date_format:"YYYY年MM月DD日",
    howareyou:"今天心情如何？",
    datepicker:"日历视图",
    listpicker:"列表视图",
    writediary:"✍️ 写日记",
    nodiary:"暂时没有日记哦",
    autosave:"自动保存",
    saved:"已保存",
    editor:{
        textGroup: {
            label: '文本块',
            text: {
                label: '文字',
            },
            h1: {
                label: '标题 1',
            },
            h2: {
                label: '标题 2',
            },
            h3: {
                label: '标题 3',
            },
            h4:null,
            h5: null,
            h6: null,
            quote: {
                label: '引用',
            },
            divider:{
                label: "分割线"
            }
        },
        listGroup: {
            label: '列表',
            bulletList: {
                label: '无序列表',
            },
            orderedList: {
                label: '有序列表',
            },
            taskList: {
                label: '任务列表',
            },
        },
        advancedGroup: {
            label: '高级',
            image: {
                label: '图片',
            },
            codeBlock: {
                label: '代码块',
            },
            table: {
                label: '表格',
            },
            math: {
                label: 'Latex公式',
            },
        },
    },
    charstat:"字数统计",
    autosavelast:"已自动保存上个文档",
    save:"保存",
    stat:"统计",
    exportmd:"导出为.md",
    rename:"重命名",
    delete:"删除",
    newdoc:"新建文档",
    fileupload:"文件上传",
    workspace:"工作区",
    setting:"设置",
    settings:{
        theme:"主题模式",
        theme_desc:"切换应用的主题模式（亮、暗）",
        theme_light:"浅色",
        theme_dark:"深色",
        theme_eyes:"护眼",
        lang:"语言",
        lang_desc:"切换应用的语言",
        theme_color:"主题颜色",
        theme_color_desc:"选择页面的主题颜色",
        theme_color_default:"蓝色（默认）",
        theme_color_pink:"粉色",
        theme_color_orange:"橙色",
        theme_color_green:"绿色",
        theme_color_purple:"紫色",
        backup:"备份数据",
        backup_desc:"导出所有文章为一个.mikibase（其仅用于数据备份）",
        export:"导出数据",
        export_desc:"选择一个文件夹导出所有文章，文章将会以md格式导出，你无法通过文件夹导入数据，若进行数据迁移请用上面的东西",
        import:"从备份恢复",
        import_desc:"从.mikibase导入所有文章",
        help:"帮助",
        help_desc:"查看帮助文档",
        see:"查看",
        imp:"导入",
        exp:"导出",
        bkp:"备份",
        processing:"处理中..."
    },
    manageworkspace:"管理工作空间",
    mytexts:"我的文稿",
    spacenaming:"空间名称...",
    deletespace:"删除空间",
    confirmdeletespace:"确定要删除 \"$\" 吗？该操作不可恢复！",
    docs:{
    help:`# 帮助

## 文档相关

1. 创建文档：在左侧导航栏，你可以看到一个显眼的\`+ 新建文稿\` ，点击即可
2. 重命名：鼠标右键左侧导航栏相应文档项，点击“重命名”
3. 删除文档：同上，但点击“删除”（文档一旦删除无法恢复，请谨慎）
4. 导入Markdown文档：点击左侧导航栏中的“文件上传”图标，选择Markdown文件。
5. 选择/创建工作区：点击左侧导航栏的“文件夹”图标，进行相关操作，其创建/删除/重命名均与上方内容类似。

## 编辑器

1. 本编辑器使用Markdown格式，你可以按Markdown格式输入类似“# ”，其会自动识别。
2. 你也可以在每行开头时输入“/”，选择你要插入的内容。
3. 你可以通过拖选文本，在弹出的二级菜单中进行文本样式设置。
4. 你可以点击上方的“菜单”图标，再点击“保存”，以保存文档，同时，本编辑器也会每3分钟自动保存，在切换文档时也会自动保存。
5. 同上，点击“统计”可以统计文章字数。
6. 同上，点击“导出为.md”，可以以Markdown格式导出正在编辑的文档至本地（记得在导出前保存）你也可以在左侧导航栏右键选择“导出为.md”，即可导出选中的文档。

## 日记

1. 点击左侧导航栏的“日记”即可使用日记。
2. 进入时默认显示今天的日记，你可以通过上方导航栏的“<”和“>”图标切换上一篇和下一篇。点击中间的日历图标可以进行可视化选择。
3. **注意**：你无法在本软件中创建不是今日日期的日记。这意味着若某天你没有写日记，你无法进行“补签”。
4. 你可以修改过去的日记，但你无法删除它们。
5. 日记的编辑器与文档编辑器相同，使用问题可以参考上方。

## 导入导出数据

1. 在设置中导入导出
2. 对于单篇文档的导入和导出见“编辑器”部分。

## 主题

1. 在设置中设置主题。`,
    about:`# Miki  ·  一种简单的创作

> 版本：V0.0.1
> 
> 海内存知己，天涯若比邻。  —— 王勃

如果你忽然想写点什么，但又不想用某些界面臃肿的“大厂风”或者功能复杂的“专业风”的笔记软件。**Miki便是为你而生的。**

Miki以Markdown格式创作，在提供必要功能的同时将简洁性提升至最高。使用方式简单且符合直觉（详情可见“帮助”文档），点击新建文稿，即可开始创作。

Miki没有登录注册，没有云同步，没有AI辅助创作，没有细致的界面排版，也没有其他杂七杂八的组件，只有基本的Markdown编写和文档数据导入导出功能。

希望Miki能够让你集中精力，用充沛的生命力将文字填满，而不把时间浪费在排版和样式上。

*创作，本来就该这么简单。*

<br />

> Miki作者：yz小雨竹（[雨竹upon : siquan001](https://github.com/siquan001/)）
>
> Github仓库：[siquan001/miki](https://github.com/siquan001/miki/)
>
> License：[GPL-3.0](https://github.com/siquan001/Miki/blob/main/LICENSE)
>
> Powered By Vue3，Vite，localforage，dayjs，milkdown，thememirror（CodeMirror主题），VCanlendar，Scss，JsZip，图标（见[Icons.ts](https://github.com/siquan001/Miki/blob/main/src/util/Icons.ts)）
`
}
}