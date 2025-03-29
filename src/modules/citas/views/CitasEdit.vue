<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCitas } from '@/modules/citas/composables/useCitas.js';
import PageHeading from '@/modules/common/components/PageHeading.vue';
import CitasEditForm from '@/modules/citas/components/CitasEditForm.vue';

import { useAntecedentes } from '@/modules/citas/composables/useAntecedentes.js';

const { createAntecedente } = useAntecedentes();



const route = useRoute();
const router = useRouter();
const { cita, fetchCita, updateCita } = useCitas();

const errorFields = ref({});

const actCita = ref({
  id: '',
  diagnostico: '',
  receta: '',
  motivo: '',
  antecedentesMedicos: '',
  antecedentesQuirurjicos: '',
  antecedentesAlergicos: '',
  antecedentesTraumaticos: '',
  antecedentesFamiliares: '',
  antecedentesObservacion: '',
});

onMounted(async () => {
  await fetchCita(route.params.id);
  actCita.value = {
    id: cita.value.id,
    diagnostico: cita.value.diagnostico || '',
    receta: cita.value.receta || '',
    estado: 'ATENDIDO',
    pacienteId: cita.value.pacienteId,
    doctorId: cita.value.doctorId,
    motivo: cita.value.motivo,
    fechaHoraCita: cita.value.fechaHoraCita,
    duracionCita: cita.value.duracionCita,
    fechaAtendida: cita.value.fechaAtendida,
    observacion: cita.value.observacion || '',
    antecedentesMedicos: cita.value.antecedentesMedicos || '',
    antecedentesQuirurjicos: cita.value.antecedentesQuirurjicos || '',
    antecedentesAlergicos: cita.value.antecedentesAlergicos || '',
    antecedentesTraumaticos: cita.value.antecedentesTraumaticos || '',
    antecedentesFamiliares: cita.value.antecedentesFamiliares || '',
    antecedentesObservacion: cita.value.antecedentesObservacion || '',
  };
});

const handleUpdate = async () => {
  const id = route.params.id;
  actCita.value.id = parseInt(id);

  const result = await updateCita(id, actCita.value);

  if (result.success) {
    // Crear el antecedente relacionado
    const antecedenteData = {
      citaId: parseInt(id),
      medicos: actCita.value.antecedentesMedicos,
      quirurjicos: actCita.value.antecedentesQuirurjicos,
      alergicos: actCita.value.antecedentesAlergicos,
      traumaticos: actCita.value.antecedentesTraumaticos,
      familiares: actCita.value.antecedentesFamiliares,
      observacion: actCita.value.antecedentesObservacion,
      estado: 'ACTIVO' // 👈 aquí lo agregás
    };

    const anteResult = await createAntecedente(antecedenteData);

    if (anteResult.success) {
      alert('Cita y antecedentes guardados correctamente');
      await router.push('/citas');
    } else {
      alert('Cita actualizada, pero hubo error al guardar antecedentes');
      console.error(anteResult);
    }
  } else {
    errorFields.value = result.errorFields;
  }
};
</script>

<template>
  <div class="flex justify-between items-center mb-4 border-b border-gray-200">
    <PageHeading title="Atender Cita" />
    <RouterLink
        :to="{ path: '/citas' }"
        class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
    >
      Regresar
    </RouterLink>
  </div>

  <!-- INFO PACIENTE Y DOCTOR ESTILO "SHOW" -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm text-gray-700">
    <div>
      <p class="font-semibold text-gray-800">Paciente</p>
      <p>{{ cita?.nombrePaciente }} {{ cita?.apellidoPaciente }}</p>
    </div>
    <div>
      <p class="font-semibold text-gray-800">Doctor</p>
      <p>{{ cita?.nombreDoctor }} {{ cita?.apellidoDoctor }}</p>
    </div>
  </div>

  <CitasEditForm
      :cita="actCita"
      :errorFields="errorFields"
      @save="handleUpdate"
  />
</template>

<style scoped>
</style>