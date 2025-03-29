<script setup>
import { ref, onMounted } from 'vue';
import {useRoute, useRouter} from "vue-router";
import { useCitas } from "@/modules/citas/composables/useCitas.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import DescriptionItem from "@/modules/common/components/DescriptionItem.vue";

const router = useRouter();
const route = useRoute();
const { cita, fetchCita } = useCitas();

const showCita = ref({
  id: "",
  fechaHoraCita: "",
  duracionCita: 0,
  fechaAtendida: "",
  pacienteId: 0,
  doctorId: 0,
  motivo: "",
  diagnostico: "",
  receta: "",
  observacion: "",
  estado: "",
  nombrePaciente: "",
  apellidoPaciente: "",
  nombreDoctor: "",
  apellidoDoctor: "",
  antecedentesMedicos: "",
  antecedentesQuirurjicos: "",
  antecedentesAlergicos: "",
  antecedentesTraumaticos: "",
  antecedentesFamiliares: "",
  antecedentesObservacion: "",
});

onMounted(async () => {
  await fetchCita(route.params.id);
  showCita.value = {
    id: cita.value.id,
    fechaHoraCita: cita.value.fechaHoraCita,
    duracionCita: cita.value.duracionCita,
    fechaAtendida: (cita.value.fechaAtendida == '2025-01-01T00:00:00') ? "" : cita.value.fechaAtendida,
    pacienteId: cita.value.pacienteId,
    doctorId: cita.value.doctorId,
    motivo: cita.value.motivo,
    diagnostico: cita.value.diagnostico,
    receta: cita.value.receta,
    observacion: cita.value.observacion,
    estado: cita.value.estado,
    nombrePaciente: cita.value.nombrePaciente,
    apellidoPaciente: cita.value.apellidoPaciente,
    nombreDoctor: cita.value.nombreDoctor,
    apellidoDoctor: cita.value.apellidoDoctor,
    antecedentesMedicos: cita.value.antecedentesMedicos,
    antecedentesQuirurjicos: cita.value.antecedentesQuirurjicos,
    antecedentesAlergicos: cita.value.antecedentesAlergicos,
    antecedentesTraumaticos: cita.value.antecedentesTraumaticos,
    antecedentesFamiliares: cita.value.antecedentesFamiliares,
    antecedentesObservacion: cita.value.antecedentesObservacion,
  };
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200">
      <PageHeading title="Datos de la cita" />
      <RouterLink
          :to="{ path: '/citas' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>
    <div class="w-full flex flex-wrap justify-start">
      <DescriptionItem size="1" :value="showCita.id" label="Id"/>
      <DescriptionItem size="1" :value="showCita.fechaHoraCita" label="Fecha y Hora"/>
      <DescriptionItem size="1" :value="showCita.fechaAtendida" label="Fecha y Hora (Atendida)"/>
      <DescriptionItem size="1" :value="showCita.estado" label="Estado"/>
      <DescriptionItem size="2" :value="showCita.nombrePaciente + ' ' + showCita.apellidoPaciente" label="Paciente"/>
      <DescriptionItem size="2" :value="showCita.nombreDoctor + ' ' + showCita.apellidoDoctor" label="Doctor"/>
      <DescriptionItem size="4" :value="showCita.motivo" label="Motivo de consulta"/>
      <DescriptionItem size="4" :value="showCita.diagnostico" label="Diagnóstico"/>
      <DescriptionItem size="4" :value="showCita.receta" label="Receta"/>
      <DescriptionItem size="4" :value="showCita.observacion" label="Observaciones"/>
    </div>
    <h2 class="text-3 mt-10 mb-10">Antecedentes</h2>
    <div class="w-full flex flex-wrap justify-start">
      <DescriptionItem size="4" :value="showCita.antecedentesMedicos" label="Antecedentes médicos"/>
      <DescriptionItem size="4" :value="showCita.antecedentesQuirurjicos" label="Antecedentes quirúrgicos"/>
      <DescriptionItem size="4" :value="showCita.antecedentesAlergicos" label="Antecedentes alérgicos"/>
      <DescriptionItem size="4" :value="showCita.antecedentesTraumaticos" label="Antecedentes traumáticos"/>
      <DescriptionItem size="4" :value="showCita.antecedentesFamiliares" label="Antecedentes familiares"/>
      <DescriptionItem size="4" :value="showCita.antecedentesObservacion" label="Observaciones antecedentes"/>
    </div>
  </div>
</template>

<style scoped>

</style>