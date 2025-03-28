<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
  modelValue: { type: [String, Number], default: '' }, // el ID seleccionado
  searchTerm: { type: String, default: '' }, // el texto que el usuario escribe
  options: { type: Array, default: () => [] }, // resultados devueltos por el padre
  placeholder: { type: String, default: 'Buscar...' },
})

const emit = defineEmits(['update:modelValue', 'update:searchTerm'])

const showDropdown = ref(false)
const searchTerm = ref(props.searchTerm)

watch(() => props.searchTerm, (newVal) => {
  searchTerm.value = newVal
})

const selectItem = (item) => {
  emit('update:modelValue', item.id)
  searchTerm.value = item.descripcion
  emit('update:searchTerm', item.descripcion)
  showDropdown.value = false
}
</script>

<template>
  <div class="flex flex-col gap-2 relative mb-2">
    <!-- Label -->
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Select visible (search input) -->
    <input
        :id="id"
        type="text"
        :placeholder="placeholder"
        v-model="searchTerm"
        @input="$emit('update:searchTerm', searchTerm)"
        @focus="showDropdown = true"
        class="block w-full rounded-md px-3 py-2 focus:ring focus:ring-opacity-50 sm:text-sm border border-gray-300"
        :class="[
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      ]"
    />

    <!-- Dropdown -->
    <div
        v-if="showDropdown"
        class="absolute z-10 mt-18 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-auto"
    >
      <ul>
        <li
            v-for="item in options"
            :key="item.id"
            @click="selectItem(item)"
            class="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
        >
          {{ item.descripcion }}
        </li>
      </ul>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-600 first-letter:uppercase">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>