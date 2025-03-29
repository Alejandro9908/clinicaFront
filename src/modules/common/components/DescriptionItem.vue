<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number, null],
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const widthClass = computed(() => {
  return {
    '1': 'w-1/4',
    '2': 'w-2/4',
    '3': 'w-3/4',
    '4': 'w-full',
  }[props.size] || 'w-full'
})

const displayValue = computed(() => {
  const val = props.value
  return val !== null && val !== undefined && String(val).trim() !== '' ? val : 'N/A'
})


</script>

<template>
<div :class="['px-6 py-4 border-b border-gray-200', widthClass]">
  <div class="flex flex-col gap-1">
    <div class="flex flex-col gap-1">
      <label for="descripcion" class="text-sm font-medium text-gray-900">{{ label }}</label>
      <p id="descripcion" class="text-sm text-gray-700 first-letter:uppercase">{{ displayValue }} </p>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>