<script setup>
const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  required: { type: Boolean, default: false },
  error: { type: String, default: '' },
  modelValue: { type: [String, Number, Boolean], default: '' },
  options: { type: Array, default: () => [] },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- Label -->
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }} <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Select -->
    <select
        :id="id"
        :name="id"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :required="required"
        class="block w-full rounded-md px-3 py-2 focus:ring focus:ring-opacity-50 sm:text-sm border border-gray-300"
        :class="[
        error
          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
      ]"
    >
      <option value="" disabled selected>Seleccione una opción</option>
      <option v-for="item in options" :key="item.id" :value="item.id">
        {{ item.label || item.nombre || item.descripcion }}
      </option>
    </select>

    <!-- Error -->
    <p v-if="error" class="text-sm text-red-600 first-letter:uppercase">{{ error }}</p>
  </div>
</template>