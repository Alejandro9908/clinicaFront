<script setup>
import { defineProps, defineEmits } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:currentPage', 'change'])

const prevPage = () => {
  if (props.currentPage > 0) {
    emit('update:currentPage', props.currentPage - 1)
    emit('change')
  }
}

const nextPage = () => {
  if (props.currentPage + 1 < props.totalPages) {
    emit('update:currentPage', props.currentPage + 1)
    emit('change')
  }
}
</script>

<template>
  <div class="flex justify-end items-center gap-2 mt-4">
    <span>Página {{ currentPage + 1 }} de {{ totalPages }}</span>
    <button
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        :disabled="currentPage === 0"
        @click="prevPage"
    >
      <ChevronLeftIcon class="text-gray-800 w-6 h-6" />
    </button>
    <button
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        :disabled="currentPage + 1 >= totalPages"
        @click="nextPage"
    >
      <ChevronRightIcon class="text-gray-800 w-6 h-6" />
    </button>
  </div>
</template>

<style scoped>

</style>