<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { usePacientes } from "@/modules/pacientes/composables/usePacientes.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import PacientesForm from "@/modules/pacientes/components/PacientesForm.vue";

const router = useRouter();
const { createPaciente } = usePacientes();
const errorFields = ref({})

const newPaciente = ref({
  id: "",
  dpi: "",
  nombre: "",
  apellido: "",
  direccion: "",
  telefono: "",
  correo: "",
  fechaNacimiento: "",
  alfabeta: "",
  estadoCivil: "",
  genero: "",
  estado: "activo",
});

const handleSave = async () => {
  const result = await createPaciente(newPaciente.value)

  if (result.success) {
    alert("Guardado correctamente");
    await router.push("/pacientes");
  } else {
    errorFields.value = result.errorFields
  }
}
</script>

<template>
  <div class="w-full ">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200 ">
      <PageHeading title="Nuevo Paciente" />
      <RouterLink
          :to="{ path: '/doctores' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>

    <PacientesForm
        :paciente="newPaciente"
        :errorFields="errorFields"
        @save="handleSave"
    />
  </div>
</template>

<style scoped>

</style>