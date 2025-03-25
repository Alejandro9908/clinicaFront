<script setup>
import { defineProps, defineEmits } from "vue";
import InputText from "@/modules/common/components/InputText.vue";
import {PlusIcon} from "@heroicons/vue/20/solid/index.js";

const props = defineProps({
  especialidad: Object,
  errorFields: Object
})

const emit = defineEmits(["save"])
</script>

<template>
  <form @submit.prevent="emit('save')" class="p-6 w-1/2">
    <InputText
        v-model="especialidad.descripcion"
        label="Especialidad"
        id="descripcion"
        name="descripcion"
        :required="true"
        :error="errorFields?.descripcion"
    />
    <div class="flex justify-start items-center gap-2 mt-4">
      <button
          type="submit"
          class="mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition cursor-pointer"
      >
        Guardar
      </button>
    </div>

  </form>
</template>

<style scoped>

</style>