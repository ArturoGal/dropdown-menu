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
  <div class="dropdown-search">
    <div v-if="showOptions && hint" class="legend">
      {{ hint }}
    </div>
    <div
      :class="{
        'text-gray-900': selectedOption,
        'text-gray-500': !selectedOption,
        'hover-shadow': !showOptions,
      }"
      class="selected-option"
      @click="toggleOptions"
    >
      <input
        v-model="search"
        :placeholder="hint"
        type="text"
        class="search"
        onfocus="this.placeholder=''"
      />
      <span class="toggle">
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
    <div v-if="!showOptions || !filteredOptions.length" class="label">
      {{ filteredOptions.length ? label : 'No results' }}
    </div>

    <div v-if="showOptions && filteredOptions.length" class="options-list">
      <div
        class="option-wrapper"
        v-for="(option, index) in filteredOptions"
        :key="index"
        @click="selectOption(option)"
      >
        <div :class="{ 'text-bold': selectedOption === option }" class="option">
          <svg
            class="profile-icon"
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
        <div v-if="option === selectedOption" class="check-icon-wrapper">
          <svg
            class="check-icon"
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
/* Dropdown container */
.dropdown {
  position: relative;
  display: inline-block;
  text-align: left;
  width: 100%;
}

/* Hint text displayed above selected option */
.legend {
  position: absolute;
  top: -0.5rem;
  left: 0.5rem;
  font-size: 0.75rem;
  background-color: white;
  color: #6b7280;
  padding: 0 0.125rem;
}

/* Selected option box */
.selected-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.375rem;
  background-color: white;
  padding: 0.5rem 0.75rem;
  min-width: 14rem;
  width: 100%;
  font-size: 0.875rem;
  border: 1px inset rgba(156, 163, 175, 0.5);
}

.selected-option.text-gray-900 {
  color: #111827;
}

.selected-option.text-gray-500 {
  color: #6b7280;
}

/* Hover shadow effect */
.selected-option.hover-shadow:hover {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Text within the selected option box */
.search:focus {
  outline: none;
}

/* Toggle button for dropdown */
.toggle {
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 0.75rem;
}

/* Label shown above the dropdown when closed */
.label {
  font-size: 0.75rem;
  left: 0.5rem;
  color: #6b7280;
  padding-left: 0.75rem;
  padding-top: 0.125rem;
  padding-bottom: 0.25rem;
}

/* Options list dropdown */
.options-list {
  right: 0;
  z-index: 10;
  margin-top: 0.25rem;
  min-width: 14rem;
  width: 100%;
  max-height: 14rem;
  overflow-y: scroll;
  transform-origin: top right;
  border-radius: 0.375rem;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  outline: none;
  cursor: pointer;
}

/* Each option in the dropdown list */
.option-wrapper {
  position: relative;
  color: #1f2937;
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.option.text-bold {
  font-weight: 700;
}

.option-wrapper:hover {
  background-color: #f3f4f6;
}

/* Option icon */
.option {
  display: inline-flex;
  margin-left: 1.75rem;
  margin-right: 0.75rem;
}

/* Profile icon in options */
.profile-icon {
  position: absolute;
  left: 1rem;
  top: 0.75rem;
  width: 0.875rem;
  height: 0.875rem;
}

/* Check icon for selected option */
.check-icon-wrapper {
  display: inline-flex;
  margin: 0 0.5rem;
}

.check-icon {
  position: absolute;
  right: 0.75rem;
  top: 1rem;
  width: 0.75rem;
  height: 0.5rem;
}

/* Custom scrollbar */
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
