<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  options: Array<string>
  hint?: string
  label?: string
}>()

const emit = defineEmits<(e: 'selectionChanged', option: string) => void>()

const selectedOption = ref<string>(props.hint || '')
const showOptions = ref<boolean>(false)
const search = ref<string>()

const selectOption = (option: string) => {
  setTimeout(() => {
    emit('selectionChanged', option)
    selectedOption.value = option
    search.value = option
    toggleOptions()
  }, 400)
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

const filteredOptions = computed(() => {
  return selectedOption.value === search.value
    ? sortedOptions.value
    : sortedOptions.value.filter(
        option =>
          !search.value ||
          option.toLowerCase().includes(search.value.toLowerCase().trim()),
      )
})
</script>

<template>
  <div class="dropdown-search relative inline-block text-left w-full">
    <div
      v-if="showOptions && hint"
      class="legend absolute -top-2 text-xs left-2 bg-white text-gray-500 px-0.5"
    >
      {{ hint }}
    </div>
    <div
      :class="[
        {
          'text-gray-900': selectedOption,
          'text-gray-500': !selectedOption,
          'hover:shadow-md': !showOptions,
        },
        'selected-option rounded-md bg-white px-3 py-2 min-w-56 w-full text-sm ring-1 ring-inset ring-gray-300',
      ]"
      @click="toggleOptions"
    >
      <input
        v-model="search"
        :placeholder="hint"
        type="text"
        class="search text-gray-900 focus:outline-none"
        onfocus="this.placeholder=''"
      />
      <span class="toggle cursor-pointer absolute top-4 right-3">
        <svg
          v-if="showOptions"
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.16665 7.5L6.99998 1.66667L12.8333 7.5"
            stroke="#6B7280"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <svg
          v-else
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8333 1.5L7 7.33333L1.16666 1.5"
            stroke="#6B7280"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <div
      v-if="!showOptions || !filteredOptions.length"
      class="label text-xs left-2 bg-white text-gray-500 pl-3 pt-0.5 pb-1"
    >
      {{ filteredOptions.length ? label : 'No results' }}
    </div>

    <div
      class="options-list right-0 z-10 mt-1 min-w-56 w-full max-h-56 overflow-y-scroll origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
      v-if="showOptions && filteredOptions.length"
    >
      <div
        :class="[
          { 'font-bold': selectedOption === option },
          'option-wrapper relative hover:bg-gray-100 text-gray-800 block px-4 py-2 text-sm',
        ]"
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="selectOption(option)"
      >
        <div class="option inline-flex ml-7 mr-3">
          <svg
            class="profile-icon absolute left-4 top-3"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.41402 10.8692C3.76844 10.1036 5.3332 9.66667 7 9.66667C8.6668 9.66667 10.2316 10.1036 11.586 10.8692M9 5.66667C9 6.77124 8.10457 7.66667 7 7.66667C5.89543 7.66667 5 6.77124 5 5.66667C5 4.5621 5.89543 3.66667 7 3.66667C8.10457 3.66667 9 4.5621 9 5.66667ZM13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
              :stroke="selectedOption === option ? 'black' : '#6B7280'"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          {{ option }}
        </div>
        <div
          v-if="option === selectedOption"
          class="check-icon-wrapper inline-flex mx-2"
        >
          <svg
            class="check-icon absolute right-3 top-4"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.33337 4.66669L4.00004 7.33335L10.6667 0.666687"
              stroke="#0E7490"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
