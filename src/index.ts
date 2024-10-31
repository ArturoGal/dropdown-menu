import type { App } from 'vue'
import DropdownSearchMenu from './components/dropdown-search-menu.vue'

export default {
  install: (app: App) => {
    app.component('DropdownSearchMenu', DropdownSearchMenu)
  },
}
