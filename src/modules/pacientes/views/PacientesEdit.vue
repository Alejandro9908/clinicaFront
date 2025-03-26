<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from "vue-router";
import { usePacientes } from "@/modules/pacientes/composables/usePacientes.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import PacientesForm from "@/modules/pacientes/components/PacientesForm.vue";

const router = useRouter();
const route = useRoute();
const { paciente, fetchPaciente, updatePaciente } = usePacientes();
const errorFields = ref({});

const actPaciente = ref({
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
  estado: "",
});

onMounted(async () => {
  await fetchPaciente(route.params.id);
  actPaciente.value = {
    id: paciente.value.id,
    dpi: paciente.value.dpi,
    nombre: paciente.value.nombre,
    apellido: paciente.value.apellido,
    direccion: paciente.value.direccion,
    telefono: paciente.value.telefono,
    correo: paciente.value.correo,
    fechaNacimiento: paciente.value.fechaNacimiento,
    alfabeta: paciente.value.alfabeta,
    estadoCivil: paciente.value.estadoCivil,
    genero: paciente.value.genero,
    estado: paciente.value.estado,
  };
})

const handleUpdate = async () => {
  const result = await updatePaciente(route.params.id, actPaciente.value);

  if (result.success) {
    alert("Guardado correctamente");
    await router.push("/pacientes");
  } else {
    errorFields.value = result.errorFields
  }
}
</script>

<template>
  <div class="flex justify-between items-center mb-4 border-b border-gray-200">
    <PageHeading title="Editar Paciente" />
    <RouterLink
        :to="{ path: '/pacientes' }"
        class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
    >
      Regresar
    </RouterLink>
  </div>

  <PacientesForm
      :paciente="actPaciente"
      :errorFields="errorFields"
      @save="handleUpdate"
  />
</template>

<style scoped>

</style>