<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  options: Array<string>
}>()

const selectedOption = ref<string>()
const showOptions = ref<boolean>(false)

const selectOption = (option: string) => {
  selectedOption.value = option
  toggleOptions()
}

const toggleOptions = () => {
  showOptions.value = !showOptions.value
}
</script>

<template>
  <div class="dropdown relative inline-block text-left">
    <div
      class="selected-option inline-flex justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 w-56 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 cursor-pointer"
      @click="toggleOptions"
    >
      <div>
        {{ selectedOption || 'Elige un usuario' }}
      </div>
      <img v-if="showOptions" src="./icons/arrow-up.svg" alt="˄" />
      <img v-else src="./icons/arrow-down.svg" alt="˅" />
    </div>

    <div
      class="options-list absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
      v-if="showOptions"
    >
      <div
        class="relative hover:bg-gray-100 hover:text-gray-900 text-gray-700 block px-4 py-2 text-sm"
        v-for="(option, index) in options"
        :key="index"
        @click="selectOption(option)"
      >
        <div class="inline-flex ml-7 mr-3">
          <img
            class="absolute left-4 top-3"
            src="./icons/profile.svg"
            alt="👤"
          />
          {{ option }}
        </div>
        <div v-if="option === selectedOption" class="absolute right-3 top-4">
          <img src="./icons/check.svg" alt="✓" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
