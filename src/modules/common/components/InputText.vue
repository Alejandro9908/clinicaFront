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
  type: {
    type: String,
    default: 'text'
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Label -->
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Input -->
    <input
        :id="id"
        :name="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
        class="block w-full rounded-md border border-gray-300 px-3 py-2 sm:text-sm"
        :class="[
          'block w-full rounded-md px-3 py-2 focus:ring focus:ring-opacity-50 sm:text-sm',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        ]"
    />

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-600 first-letter:uppercase">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>