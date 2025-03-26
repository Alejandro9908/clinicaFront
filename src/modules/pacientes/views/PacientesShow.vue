<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from "vue-router";
import { usePacientes } from "@/modules/pacientes/composables/usePacientes.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import DescriptionItem from "@/modules/common/components/DescriptionItem.vue";

const router = useRouter();
const route = useRoute();
const { paciente, fetchPaciente } = usePacientes();

const showPaciente = ref({
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
  showPaciente.value = {
    id: paciente.value.id,
    dpi: paciente.value.dpi,
    nombre: paciente.value.nombre,
    apellido: paciente.value.apellido,
    direccion: paciente.value.direccion,
    telefono: paciente.value.telefono,
    correo: paciente.value.correo,
    fechaNacimiento: paciente.value.fechaNacimiento,
    alfabeta: (paciente.value.alfabeta === true) ? "Si" : "No",
    estadoCivil: paciente.value.estadoCivil,
    genero: (paciente.value.genero === "m") ? "Masculino" : "Femenino",
    estado: paciente.value.estado,
  };
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200">
      <PageHeading title="Datos del paciente" />
      <RouterLink
          :to="{ path: '/pacientes' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>
    <div class="w-full flex flex-wrap justify-start">
      <DescriptionItem size="1" :value="showPaciente.id" label="Id"/>
      <DescriptionItem size="3" :value="showPaciente.dpi" label="DPI"/>
      <DescriptionItem size="1" :value="showPaciente.nombre" label="Nombre"/>
      <DescriptionItem size="1" :value="showPaciente.apellido" label="Apellido"/>
      <DescriptionItem size="2" :value="showPaciente.direccion" label="Dirección"/>
      <DescriptionItem size="1" :value="showPaciente.fechaNacimiento" label="Fecha de nacimiento"/>
      <DescriptionItem size="1" :value="showPaciente.genero" label="Género"/>
      <DescriptionItem size="1" :value="showPaciente.estadoCivil" label="Estado civil"/>
      <DescriptionItem size="1" :value="showPaciente.alfabeta" label="Alfabeta"/>
      <DescriptionItem size="1" :value="showPaciente.telefono" label="Teléfono"/>
      <DescriptionItem size="1" :value="showPaciente.correo" label="Correo"/>
      <DescriptionItem size="1" :value="showPaciente.estado" label="Estado"/>

    </div>
  </div>
</template>

<style scoped>

</style>