<script setup lang="ts">
import DropdownMenu from './components/dropdown-menu.vue'
</script>

<template>
  <header></header>

  <main>
    <DropdownMenu
      :options="['Juan Pérez', 'Luis Gerardo García', 'Martín Martínez']"
    ></DropdownMenu>
  </main>
</template>
