export default {
    diary: '日記',
    sbnote: "随筆",
    help: "ヘルプ",
    about: "Mikiについて",
    selecting: "選択してください..",
    isfirstnow: "これが最初の記です",
    date_format: "YYYY年MM月DD日",
    howareyou: "今日の気分はどうですか？",
    datepicker: "カレンダー表示",
    listpicker: "リスト表示",
    writediary: "✍️ 日記を書く",
    nodiary: "日記はまだありません",
    autosave: "自動保存",
    saved: "保存済み",
    editor: {
        textGroup: {
            label: 'テキスト',
            text: { label: '標準テキスト' },
            h1: { label: '見出し 1' },
            h2: { label: '見出し 2' },
            h3: { label: '見出し 3' },
            h4: null,
            h5: null,
            h6: null,
            quote: { label: '引用' },
            divider: { label: "区切り線" }
        },
        listGroup: {
            label: 'リスト',
            bulletList: { label: '箇条書き' },
            orderedList: { label: '番号付きリスト' },
            taskList: { label: 'タスクリスト' },
        },
        advancedGroup: {
            label: '高度な機能',
            image: { label: '画像' },
            codeBlock: { label: 'コードブロック' },
            table: { label: 'テーブル' },
            math: { label: 'Latex数式' },
        },
    },
    charstat: "文字数統計",
    autosavelast: "前のドキュメントを自動保存しました",
    save: "保存",
    stat: "統計",
    exportmd: ".mdとして書き出し",
    rename: "名前を変更",
    delete: "削除",
    newdoc: "新規ドキュメント",
    fileupload: "ファイルアップロード",
    workspace: "ワークスペース",
    setting: "設定",
    settings: {
        theme: "テーマモード",
        theme_desc: "外観モードを切り替えます",
        theme_light: "ライト",
        theme_dark: "ダーク",
        theme_eyes: "目に優しい",
        lang: "言語",
        lang_desc: "アプリの言語を切り替えます",
        theme_color: "テーマカラー",
        theme_color_desc: "メインカラーを選択します",
        theme_color_default: "ブルー（デフォルト）",
        theme_color_pink: "ピンク",
        theme_color_orange: "オレンジ",
        theme_color_green: "グリーン",
        theme_color_purple: "パープル",
        backup: "データのバックアップ",
        backup_desc: "すべての記事を.mikibaseとして書き出します",
        export: "データの書き出し",
        export_desc: "フォルダにmd形式で書き出します。フォルダからのインポートはできません",
        import: "バックアップから復元",
        import_desc: ".mikibaseからインポートします",
        help: "ヘルプ",
        help_desc: "ヘルプドキュメントを表示",
        see: "表示",
        imp: "インポート",
        exp: "書き出し",
        bkp: "バックアップ",
        processing: "処理中..."
    },
    manageworkspace: "ワークスペース管理",
    mytexts: "マイ原稿",
    spacenaming: "スペース名...",
    deletespace: "スペースを削除",
    confirmdeletespace: "\"$\" を削除してもよろしいですか？この操作は取り消せません！",
    docs: {
        help: `# ヘルプ

## ドキュメントについて

1. **ドキュメントの作成**: 左サイドバーの \`+ 新規原稿\` をクリックします。
2. **名前の変更**: サイドバーの項目を右クリックし、「名前を変更」を選択します。
3. **削除**: 右クリックで「削除」を選択します（復元できないためご注意ください）。
4. **インポート**: サイドバーの「アップロード」アイコンから Markdown ファイルを選択します。
5. **ワークスペース**: 「フォルダ」アイコンからワークスペースの作成や切り替えが可能です。

## エディタ

1. **Markdown**: 本エディタは Markdown 形式を採用しています。「# 」と入力すると見出しになります。
2. **スラッシュコマンド**: 行頭で「/」を入力すると、挿入メニューが表示されます。
3. **スタイル設定**: テキストを選択すると表示されるメニューから装飾が可能です。
4. **保存**: メニューから「保存」をクリックします。3分ごとの自動保存および切り替え時の保存も行われます。
5. **統計**: メニューの「統計」から文字数を確認できます。

## 日記

1. サイドバーの「日記」から利用できます。
2. デフォルトで今日の記が表示されます。「<」「>」またはカレンダーアイコンで日付を切り替えられます。
3. **注意**: 過去の日付の日記を新規作成することはできません。その日に書く必要があります。
4. 過去の日記を編集することはできますが、削除はできません。

## データ管理

1. 設定画面から全データのバックアップ（.mikibase）と復元が可能です。

## テーマ

1. 設定からライト、ダーク、目に優しいモードを選択できます。`,
        about: `# Miki · シンプルな創作

> バージョン: V0.0.1
> 
> 海内存知己，天涯若比鄰。 — 王勃

何かを書きたいと思ったとき、多機能すぎるツールに煩わされたくない人のために、**Miki は生まれました。**

直感的な Markdown 形式で、シンプルさを極限まで追求しています。ログインもクラウド同期も AI もありません。あるのは、あなたと言葉だけです。

タイポグラフィや設定に時間を取られず、あなたの生命力を文字に込めてください。

*創作は、本来シンプルであるべきです。*

<br />

> Miki 開発者：yz小雨竹（[雨竹upon : siquan001](https://github.com/siquan001/)）
>
> Github リポジトリ：[siquan001/miki](https://github.com/siquan001/miki/)
>
> ライセンス：[GPL-3.0](https://github.com/siquan001/Miki/blob/main/LICENSE)
>
> Powered By Vue3, Vite, localforage, dayjs, milkdown, thememirror (CodeMirror テーマ), VCalendar, Scss, JsZip, アイコン（[Icons.ts](https://github.com/siquan001/Miki/blob/main/src/util/Icons.ts) を参照）`
    }
}