# dropdown-menu

## How to use this component

### Install in your project

```sh
npm install @arturogal/dropdown-menu
```

### Import in your main.ts or main.js file

```sh
import DropdownMenu from '@arturogal/dropdown-menu'
```

### Import styles in your maint.ts or main.js file

```sh
import '@arturogal/dropdown-menu/dist/style.css'
```

### Add it to your app in main.ts or main.js file

```sh
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
app.use(DropdownMenu)
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
