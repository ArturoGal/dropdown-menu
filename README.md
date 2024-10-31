# dropdown-search-menu

## How to use this component

### Install in your project

```sh
npm install @arturogal/dropdown-search-menu
```

### Import in your main.ts or main.js file

```sh
import DropdownSearchMenu from '@arturogal/dropdown-search-menu'
```

### Import styles in your maint.ts or main.js file

```sh
import '@arturogal/dropdown-search-menu/dist/style.css'
```

### Add it to your app in main.ts or main.js file

```sh
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
app.use(DropdownSearchMenu)
```

### Use the web component in your app, wherever you want

```sh
<dropdown
    :options="[
        'Luis Gerardo García',
        'Juan Pérez',
        'Martín Martínez',
        'Arturo García',
        'Rodrigo Bentancur',
        'Cristian Romero',
        'Pedro Porro',
    ]"
    hint="Elige un usuario"
    label="Usuarios registrados"
    @selection-changed="(option: string) => (selectedDropdownOption = option)">
</dropdown>
```
