<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from "vue-router";
import { useEspecialidades } from "@/modules/especialidades/composables/useEspecialidades.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import EspecialidadesForm from "@/modules/especialidades/components/EspecialidadesForm.vue";

const router = useRouter();
const route = useRoute();
const { especialidad, fetchEspecialidad, updateEspecialidad } = useEspecialidades();
const errorFields = ref({})

const actEspecialidad = ref({
  id: "",
  descripcion: "",
  eliminado: "",
});

onMounted(async () => {
  await fetchEspecialidad(route.params.id);
  actEspecialidad.value = {
    id: especialidad.value.id,
    descripcion: especialidad.value.descripcion,
    eliminado: especialidad.value.eliminado,
  };
});

const handleUpdate = async () => {
  const result = await updateEspecialidad(route.params.id, actEspecialidad.value);

  if (result.success) {
    alert("Guardado correctamente");
    await router.push("/especialidades");
  } else {
    errorFields.value = result.errorFields
  }
}

</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200">
      <PageHeading title="Editar Especialidad" />
      <RouterLink
          :to="{ path: '/especialidades' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>

    <EspecialidadesForm
        :especialidad="actEspecialidad"
        :errorFields="errorFields"
        @save="handleUpdate"
    />

  </div>
</template>

<style scoped>
</style>