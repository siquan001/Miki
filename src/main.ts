import { createApp } from 'vue'
import App from './App.vue'
import './base.css';
import '@milkdown/crepe/theme/nord.css'
// You may also want to import styles by feature
import '@milkdown/crepe/theme/common/prosemirror.css'
import '@milkdown/crepe/theme/common/reset.css'
import '@milkdown/crepe/theme/common/block-edit.css'
import '@milkdown/crepe/theme/common/toolbar.css'

// And introduce the theme
import '@milkdown/crepe/theme/crepe/style.css'

createApp(App).mount('#app')