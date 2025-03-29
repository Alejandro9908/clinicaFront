<script setup>
import {defineProps, defineEmits, ref, watch} from "vue";
import InputText from "@/modules/common/components/InputText.vue";
import InputSelectSearch from "@/modules/common/components/InputSelectSearch.vue";
import InputAreaText from "@/modules/common/components/InputAreaText.vue";
import {usePacientes} from "@/modules/pacientes/composables/usePacientes.js";

const props = defineProps({
  cita: Object,
  errorFields: Object
})

const emit = defineEmits(["save"])

const { pacientes, fetchPacientes } = usePacientes();

const searchPaciente = ref('')

// Buscar cuando el texto cambia
watch(searchPaciente, async (newVal) => {
  await fetchPacientes(newVal, 0, 5)
})
</script>

<template>
  <form @submit.prevent="$emit('save')">

    <!-- DATOS DE LA CITA -->
    <div class="border border-gray-300 rounded-xl p-4 mb-6 bg-white shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Datos de la Cita</h2>

      <InputAreaText
          v-model="cita.motivo"
          label="Motivo de consulta"
          id="motivo"
          name="motivo"
          :required="true"
          :error="errorFields?.motivo"
      />

      <InputAreaText
          v-model="cita.diagnostico"
          label="Diagnóstico"
          id="diagnostico"
          :error="errorFields?.diagnostico"
      />

      <InputAreaText
          v-model="cita.receta"
          label="Receta"
          id="receta"
          :error="errorFields?.receta"
      />

      <InputAreaText
          v-model="cita.observacion"
          label="Observaciones"
          id="observacion"
          :error="errorFields?.observacion"
      />

    </div>

    <!-- ANTECEDENTES -->
    <div class="border border-gray-300 rounded-xl p-4 mb-6 bg-white shadow-sm">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Antecedentes de la Cita</h2>

      <InputText
          v-model="cita.antecedentesMedicos"
          label="Antecedentes Médicos"
          id="antecedentesMedicos"
          name="antecedentesMedicos"
          :error="errorFields?.antecedentesMedicos"
      />

      <InputText
          v-model="cita.antecedentesQuirurjicos"
          label="Antecedentes Quirúrgicos"
          id="antecedentesQuirurjicos"
          name="antecedentesQuirurjicos"
          :error="errorFields?.antecedentesQuirurjicos"
      />

      <InputText
          v-model="cita.antecedentesAlergicos"
          label="Antecedentes Alérgicos"
          id="antecedentesAlergicos"
          name="antecedentesAlergicos"
          :error="errorFields?.antecedentesAlergicos"
      />

      <InputText
          v-model="cita.antecedentesTraumaticos"
          label="Antecedentes Traumáticos"
          id="antecedentesTraumaticos"
          name="antecedentesTraumaticos"
          :error="errorFields?.antecedentesTraumaticos"
      />

      <InputText
          v-model="cita.antecedentesFamiliares"
          label="Antecedentes Familiares"
          id="antecedentesFamiliares"
          name="antecedentesFamiliares"
          :error="errorFields?.antecedentesFamiliares"
      />

      <InputText
          v-model="cita.antecedentesObservacion"
          label="Observaciones de Antecedentes"
          id="antecedentesObservacion"
          name="antecedentesObservacion"
          :error="errorFields?.antecedentesObservacion"
      />
    </div>

    <!-- BOTÓN -->
    <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
    >
      Guardar
    </button>
  </form>
</template>

<style scoped>

</style>