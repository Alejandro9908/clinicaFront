<script setup>
import {defineProps, defineEmits, ref, watch} from "vue";
import InputText from "@/modules/common/components/InputText.vue";
import InputSelectSearch from "@/modules/common/components/InputSelectSearch.vue";
import {usePacientes} from "@/modules/pacientes/composables/usePacientes.js";
import {useDoctores} from "@/modules/doctores/composables/useDoctores.js";

const props = defineProps({
  cita: Object,
  errorFields: Object
})

const emit = defineEmits(["save"])

const { pacientes, fetchPacientes } = usePacientes();

const { doctores, fetchDoctores } = useDoctores();

const searchPaciente = ref('')
const searchDoctor = ref('')

// Buscar cuando el texto cambia
watch(searchPaciente, async (newVal) => {
  await fetchPacientes(newVal, 0, 5)
})

watch(searchDoctor, async (newVal) => {
  await fetchDoctores(newVal, 0, 5)
})
</script>

<template>
  <form @submit.prevent="emit('save')" class="p-6 w-1/2">
    <InputText
        v-model="cita.fechaHoraCita"
        label="Fecha y hora"
        id="fechaHoraCita"
        name="fechaHoraCita"
        type="datetime-local"
        :required="true"
        :error="errorFields?.fechaHoraCita"
    />
    <InputSelectSearch
        id="paciente"
        label="Paciente"
        v-model="cita.pacienteId"
        :searchTerm="searchPaciente"
        @update:searchTerm="searchPaciente = $event"
        :options="pacientes.map(p => ({ id: p.id, label: p.nombre + ' ' + p.apellido }))"
        :required="true"
        :error="errorFields?.pacienteId"
    />
    <InputSelectSearch
        id="doctor"
        label="Doctor"
        v-model="cita.doctorId"
        :searchTerm="searchDoctor"
        @update:searchTerm="searchDoctor = $event"
        :options="doctores.map(d => ({ id: d.id, label: d.nombre + ' ' + d.apellido }))"
        :required="true"
        :error="errorFields?.doctorId"
    />
    <InputText
        v-model="cita.motivo"
        label="Motivo"
        id="motivo"
        name="motivo"
        :required="true"
        :error="errorFields?.motivo"
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