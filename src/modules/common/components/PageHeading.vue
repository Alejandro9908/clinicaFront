<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-2">
    <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
  </div>
</template>

<style scoped>

</style>