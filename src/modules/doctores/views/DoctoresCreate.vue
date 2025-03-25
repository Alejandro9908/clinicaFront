<script setup>
import {ref} from 'vue'
import { useDoctores } from "@/modules/doctores/composables/useDoctores.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import DoctoresForm from "@/modules/doctores/components/DoctoresForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { createDoctor } = useDoctores();

const errorFields = ref({})
const newDoctor = ref({
  nombre: '',
  apellido: '',
  direccion: '',
  telefono: '',
  correo: '',
  estado: 'activo',
  fechaNacimiento: '',
  especialidadId: ''
});

const handleSave = async () => {
  const result = await createDoctor(newDoctor.value)

  if (result.success) {
    alert("Guardado correctamente");
    await router.push("/doctores");
  } else {
    errorFields.value = result.errorFields
  }
}
</script>

<template>
  <div class="w-full ">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200 ">
      <PageHeading title="Nuevo Doctor" />
      <RouterLink
          :to="{ path: '/doctores' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>

    <DoctoresForm
        :doctor="newDoctor"
        :errorFields="errorFields"
        @save="handleSave"
    />
  </div>
</template>

<style scoped>
</style>