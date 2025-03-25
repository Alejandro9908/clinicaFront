<script setup>
defineProps({
  headers: {
    type: Array,
    required: true,
  },
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="overflow-x-auto rounded-md ring-1 ring-gray-200">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
      <tr>
        <th
            v-for="(header, index) in headers"
            :key="index"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {{ header }}
        </th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="(row) in rows" :key="row.key">
        <td
            v-for="(header, colIndex) in headers"
            :key="colIndex"
            class="px-6 py-3 whitespace-nowrap text-sm text-gray-900"
        >
          <slot
              v-if="header === 'Acciones'"
              name="acciones"
              :row="row"
          />
          <template v-else>
            {{ row[header] }}
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
</style>