<script setup>
import { ref, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' },
  searchTerm: { type: String, default: '' },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: 'Buscar...' },
})

const emit = defineEmits(['update:modelValue', 'update:searchTerm'])

const showDropdown = ref(false)
const internalSearch = ref(props.searchTerm)
const highlightedIndex = ref(0)
const dropdownRef = ref(null)
const wrapperRef = ref(null)

watch(() => props.searchTerm, (newVal) => {
  internalSearch.value = newVal
  highlightedIndex.value = 0
})

watch(() => props.options, () => {
  highlightedIndex.value = 0
})

const selectItem = (item) => {
  emit('update:modelValue', item.id)
  internalSearch.value = item.label
  emit('update:searchTerm', item.label)
  showDropdown.value = false
}

const onKeyDown = (e) => {
  if (!showDropdown.value || !props.options.length) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (highlightedIndex.value < props.options.length - 1) {
      highlightedIndex.value++
      scrollToHighlighted()
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (highlightedIndex.value > 0) {
      highlightedIndex.value--
      scrollToHighlighted()
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = props.options[highlightedIndex.value]
    if (item) selectItem(item)
  } else if (e.key === 'Escape') {
    showDropdown.value = false
  }
}

const scrollToHighlighted = async () => {
  await nextTick()
  const list = dropdownRef.value
  const items = list?.querySelectorAll('li')
  const highlightedItem = items?.[highlightedIndex.value]
  highlightedItem?.scrollIntoView({ block: 'nearest' })
}

const handleClickOutside = (event) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target)) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="wrapperRef" class="flex flex-col gap-2 relative mb-2">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <input
        :id="id"
        type="text"
        :placeholder="placeholder"
        v-model="internalSearch"
        @input="$emit('update:searchTerm', internalSearch)"
        @focus="showDropdown = true"
        @keydown="onKeyDown"
        class="block w-full rounded-md px-3 py-2 focus:ring focus:ring-opacity-50 sm:text-sm border"
        :class="[
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      ]"
    />

    <div
        v-if="showDropdown && options.length"
        ref="dropdownRef"
        class="absolute z-10 mt-18 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto"
    >
      <ul>
        <li
            v-for="(item, index) in options"
            :key="item.id"
            @click="selectItem(item)"
            :class="[
            'px-4 py-2 text-sm cursor-pointer',
            index === highlightedIndex ? 'bg-blue-100' : 'hover:bg-blue-50'
          ]"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>

    <p v-if="error" class="text-sm text-red-600 first-letter:uppercase">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>