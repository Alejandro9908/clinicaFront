<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from "vue-router";
import { useEspecialidades } from "@/modules/especialidades/composables/useEspecialidades.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import DescriptionItem from "@/modules/common/components/DescriptionItem.vue";

const router = useRouter();
const route = useRoute();
const { especialidad, fetchEspecialidad } = useEspecialidades();

const showEspecialidad = ref({
  id: "",
  descripcion: "",
});

onMounted(async () => {
  await fetchEspecialidad(route.params.id);
  showEspecialidad.value = {
    id: especialidad.value.id,
    descripcion: especialidad.value.descripcion,
  };
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200">
      <PageHeading title="Datos de especialidad" />
      <RouterLink
          :to="{ path: '/especialidades' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>
    <div class="w-full flex flex-wrap justify-start">
      <DescriptionItem size="1" :value="showEspecialidad.id" label="Id"/>
      <DescriptionItem size="3" :value="showEspecialidad.descripcion" label="Descripción"/>
    </div>
  </div>
</template>

<style scoped>
</style>