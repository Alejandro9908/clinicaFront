<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
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

</script>

<template>
<div :class="['px-6 py-2', widthClass]">
  <div class="flex flex-col gap-1">
    <div class="flex flex-col gap-1">
      <label for="descripcion" class="text-sm font-medium text-gray-700">{{ label }}</label>
      <p id="descripcion" class="text-lg text-gray-900">{{ value }} </p>
    </div>
  </div>
</div>
</template>

<style scoped>
</style>