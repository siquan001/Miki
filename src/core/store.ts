import { computed, ref, watch } from "vue";
import {NoteCore} from "./index";
import dayjs from "dayjs";

const cts: Record<string, string> = {
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

export const nowSpace=ref('def');
export const selectedId=ref('');
export const isfullscreen=ref(false);
export const showWork=ref(false);
export const showTab = ref(0);
export const nowDiaryDate=ref(dayjs());
export const mode=ref("light");
export const readonlyContent=computed(()=>{
    return cts[contentId.value]||"";
});
export const contentId=ref('');

watch(nowSpace,()=>{
    NoteCore.getNoteMetas(nowSpace.value).then((list)=>{
        selectedId.value=list[0]?.id||'';
        if(list.length>0)showTab.value=1;
        else showTab.value=0;
    })
})

