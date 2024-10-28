<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  options: Array<string>
}>()

const emit = defineEmits<{
  (e: 'selectionChanged', option: string): void
}>()

const selectedOption = ref<string>()
const showOptions = ref<boolean>(false)

const selectOption = (option: string) => {
  selectedOption.value = option
  toggleOptions()
  emit('selectionChanged', option)
}

const toggleOptions = () => {
  showOptions.value = !showOptions.value
}

const sortedOptions = computed(() =>
  [...props.options].sort((a, b) => {
    if (b === selectedOption.value) return 1
    if (a === selectedOption.value) return -1
    return a > b ? 1 : -1
  }),
)
</script>

<template>
  <div class="dropdown relative inline-block text-left w-full">
    <div
      v-if="showOptions"
      class="absolute -top-2 text-xs left-2 bg-white text-gray-500 px-0.5"
    >
      Elige un usuario
    </div>
    <div
      :class="[
        {
          'text-gray-900': selectedOption,
          'text-gray-500': !selectedOption,
          'hover:shadow-md': !showOptions,
        },
        'selected-option inline-flex justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 min-w-56 w-full text-sm ring-1 ring-inset ring-gray-300',
      ]"
    >
      <div class="h-5">
        {{ selectedOption || (!showOptions ? 'Elige un usuario' : '') }}
      </div>
      <span class="cursor-pointer flex align-middle" @click="toggleOptions">
        <img v-if="showOptions" src="./icons/arrow-up.svg" alt="˄" />
        <img v-else src="./icons/arrow-down.svg" alt="˅" />
      </span>
    </div>

    <div
      class="options-list right-0 z-10 mt-1 min-w-56 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
      v-if="showOptions"
    >
      <div
        :class="[
          { 'font-bold': selectedOption === option },
          'relative hover:text-gray-900 hover:font-bold text-gray-800 block px-4 py-2 text-sm',
        ]"
        v-for="(option, index) in sortedOptions"
        :key="index"
        @click="selectOption(option)"
      >
        <div class="inline-flex ml-7 mr-3">
          <img
            class="profile-icon absolute left-4 top-3"
            src="./icons/profile.svg"
            alt="👤"
          />
          {{ option }}
        </div>
        <div v-if="option === selectedOption" class="inline-flex mx-2">
          <img src="./icons/check.svg" alt="✓" class="absolute right-3 top-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
