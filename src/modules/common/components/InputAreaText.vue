<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 3
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-2 mb-2">
    <!-- Label -->
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Textarea -->
    <textarea
        :id="id"
        :name="id"
        :rows="rows"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
        class="block w-full rounded-md border px-3 py-2 sm:text-sm"
        :class="[
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      ]"
    ></textarea>

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-600 first-letter:uppercase">{{ error }}</p>
  </div>
</template>

<style scoped>
</style>