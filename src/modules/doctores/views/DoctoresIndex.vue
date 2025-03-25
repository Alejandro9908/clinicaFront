<script setup>

import PageHeading from "@/modules/common/components/PageHeading.vue";
import {PlusIcon} from "@heroicons/vue/20/solid/index.js";
</script>

<template>
  <div class="flex justify-between items-center mb-4 border-b border-gray-200">
    <PageHeading title="Doctores" />

    <RouterLink
        :to="{ path: '/doctores/create' }"
        class="inline-flex items-center gap-2 mb-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md shadow-sm"
    >
      <PlusIcon class="w-5 h-5" />
      Nuevo
    </RouterLink>
  </div>
</template>

<style scoped>

</style>