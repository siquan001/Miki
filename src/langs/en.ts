export default {
    diary: 'Diary',
    sbnote: "Notes",
    help: "Help",
    about: "About",
    selecting: "Please select..",
    isfirstnow: "Already the first diary entry",
    date_format: "YYYY-MM-DD",
    howareyou: "How are you today?",
    datepicker: "Calendar View",
    listpicker: "List View",
    writediary: "✍️ Write Diary",
    nodiary: "No diary entries yet",
    autosave: "Auto-save",
    saved: "Saved",
    editor: {
        textGroup: {
            label: 'Text Blocks',
            text: { label: 'Text' },
            h1: { label: 'Heading 1' },
            h2: { label: 'Heading 2' },
            h3: { label: 'Heading 3' },
            h4: null,
            h5: null,
            h6: null,
            quote: { label: 'Quote' },
            divider: { label: "Divider" }
        },
        listGroup: {
            label: 'Lists',
            bulletList: { label: 'Bullet List' },
            orderedList: { label: 'Ordered List' },
            taskList: { label: 'Task List' },
        },
        advancedGroup: {
            label: 'Advanced',
            image: { label: 'Image' },
            codeBlock: { label: 'Code Block' },
            table: { label: 'Table' },
            math: { label: 'Latex' },
        },
    },
    charstat: "Word Count",
    autosavelast: "Auto-saved previous document",
    save: "Save",
    stat: "Stats",
    exportmd: "Export as .md",
    rename: "Rename",
    delete: "Delete",
    newdoc: "New Document",
    fileupload: "File Upload",
    workspace: "Workspace",
    setting: "Settings",
    settings: {
        theme: "Theme Mode",
        theme_desc: "Switch between Light and Dark mode",
        theme_light: "Light",
        theme_dark: "Dark",
        theme_eyes: "Eye Care",
        lang: "Language",
        lang_desc: "Change application language",
        theme_color: "Theme Color",
        theme_color_desc: "Choose UI primary color",
        theme_color_default: "Blue (Default)",
        theme_color_pink: "Pink",
        theme_color_orange: "Orange",
        theme_color_green: "Green",
        theme_color_purple: "Purple",
        backup: "Backup Data",
        backup_desc: "Export all to .mikibase (for backup only)",
        export: "Export Documents",
        export_desc: "Export all as .md files to a folder. You cannot import from a folder.",
        import: "Restore Backup",
        import_desc: "Import all data from .mikibase",
        help: "Help",
        help_desc: "View help documentation",
        see: "View",
        imp: "Import",
        exp: "Export",
        bkp: "Backup",
        processing: "Processing..."
    },
    manageworkspace: "Manage Workspace",
    mytexts: "My Drafts",
    spacenaming: "Space Name...",
    deletespace: "Delete Space",
    confirmdeletespace: "Are you sure you want to delete \"$\"? This cannot be undone!",
    docs: {
        help: `# Help

## Documents

1. **Create**: Click the \`+ New Document\` button in the sidebar.
2. **Rename**: Right-click a document in the sidebar and select "Rename".
3. **Delete**: Right-click and select "Delete" (Caution: This cannot be undone).
4. **Import**: Click the "Upload" icon in the sidebar to select a .md file.
5. **Workspaces**: Click the "Folder" icon to manage or switch workspaces.

## Editor

1. **Markdown**: Miki supports standard Markdown syntax. Type "# " for headings, etc.
2. **Slash Command**: Type "/" at the start of a line to see a list of components.
3. **Floating Menu**: Select text to apply styles like bold, italic, or links.
4. **Saving**: Click "Menu" -> "Save". Auto-save occurs every 3 minutes and during document switching.
5. **Stats**: Click "Stats" in the menu to see the word count.
6. **Export**: Click "Export as .md" to save the current file locally.

## Diary

1. Click "Diary" in the sidebar to start journaling.
2. It shows today's entry by default. Use "<" or ">" to navigate, or the calendar icon to pick a date.
3. **Note**: You cannot create entries for past dates. No "retroactive" check-ins.
4. You can edit past entries, but you cannot delete them.
5. The diary uses the same Markdown editor as documents.

## Data Management

1. Go to "Settings" for full data backup and restoration (.mikibase).
2. For single files, use the Import/Export features in the sidebar or editor menu.

## Themes

1. Adjust appearance settings (Light, Dark, Eye-care) in the Settings panel.`,
        about: `# Miki · Simple Creation

> Version: V0.0.1
> 
> "A bosom friend afar brings a distant land near." — Wang Bo

If you suddenly feel like writing something but don't want to use bloated "Big Tech" apps or overly complex "Pro" tools, **Miki is born for you.**

Miki is built for Markdown, prioritizing simplicity and intuition. No registration, no cloud sync, no AI—just you and your words.

Focus on your thoughts and let your vitality fill the screen.

*Creation should be this simple.*

<br />

> Author: yz小雨竹 ([雨竹upon : siquan001](https://github.com/siquan001/))
>
> GitHub Repository: [siquan001/miki](https://github.com/siquan001/miki/)
>
> License: [GPL-3.0](https://github.com/siquan001/Miki/blob/main/LICENSE)
>
> Powered By Vue3, Vite, localforage, dayjs, milkdown, thememirror (CodeMirror themes), VCalendar, Scss, JsZip, Icons (see [Icons.ts](https://github.com/siquan001/Miki/blob/main/src/util/Icons.ts))`
    }
}