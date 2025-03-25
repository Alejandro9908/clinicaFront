<script setup>
import {ref} from 'vue'
import { useEspecialidades } from "@/modules/especialidades/composables/useEspecialidades.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import EspecialidadesForm from "@/modules/especialidades/components/EspecialidadesForm.vue";
import {useRouter} from "vue-router";

const router = useRouter();
const { createEspecialidad } = useEspecialidades();
const errorFields = ref({})
const newEspecialidad = ref({
  descripcion: "",
});

const handleSave = async () => {
  const result = await createEspecialidad(newEspecialidad.value)

  if (result.success) {
    alert("Guardado correctamente");
    await router.push("/especialidades");
  } else {
    errorFields.value = result.errorFields
  }
}
</script>

<template>
  <div class="w-full ">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200 ">
      <PageHeading title="Nueva Especialidad" />
      <RouterLink
          :to="{ path: '/especialidades' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>

    <EspecialidadesForm
        :especialidad="newEspecialidad"
        :errorFields="errorFields"
        @save="handleSave"
    />

  </div>
</template>

<style scoped>
</style>