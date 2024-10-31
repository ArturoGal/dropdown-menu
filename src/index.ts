import type { App } from 'vue'
import DropdownMenu from './components/dropdown-menu.vue'

export default {
  install: (app: App) => {
    app.component('DropdownMenu', DropdownMenu)
  },
}
