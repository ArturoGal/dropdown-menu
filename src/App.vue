<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from './components/dropdown-menu.vue'

const selectedDropdownOption = ref<string>()
</script>

<template>
  <header></header>

  <main>
    <div class="w-60">
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
        @selection-changed="option => (selectedDropdownOption = option)"
      ></dropdown>
    </div>
  </main>
</template>
