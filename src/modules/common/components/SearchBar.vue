<script setup>
import { ref, watch } from 'vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  search: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:search', 'search'])

const localSearch = ref(props.search)

watch(() => props.search, (newVal) => {
  localSearch.value = newVal
})
</script>

<template>
  <form @submit.prevent="emit('search')" class="w-full max-w-lg flex gap-2 items-center">
    <div class="relative flex-1">
      <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      <input
          type="text"
          v-model="localSearch"
          @input="$emit('update:search', localSearch)"
          id="search"
          placeholder="Buscar..."
          class="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 focus:ring-opacity-50 sm:text-sm"
      />
    </div>
    <button
        type="submit"
        class="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md cursor-pointer"
    > Buscar</button>
  </form>
</template>

<style scoped>
</style>