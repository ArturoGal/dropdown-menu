<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from './components/dropdown-menu.vue'

const selectedDropdownOption = ref<string>('testing')
</script>

<template>
  <header></header>

  <main>
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
      v-model="selectedDropdownOption"
      @selection-changed="option => (selectedDropdownOption = option)"
    ></dropdown>
  </main>
</template>
