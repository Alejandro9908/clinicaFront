<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue';
import InputSelectSearch from '@/modules/common/components/InputSelectSearch.vue';
import { useEspecialidades } from '@/modules/especialidades/composables/useEspecialidades.js';
import InputText from "@/modules/common/components/InputText.vue";
import {usePacientes} from "@/modules/pacientes/composables/usePacientes.js";
import InputSelect from "@/modules/common/components/InputSelect.vue";

const props = defineProps({
  paciente: Object,
  errorFields: Object
});

const emit = defineEmits(["save"])
</script>

<template>
  <form @submit.prevent="emit('save')" class="p-6 w-full max-w-lg space-y-4">
    <InputText
        v-model="paciente.dpi"
        label="DPI"
        id="nombre"
        type="text"
        :required="true"
        :error="errorFields?.nombre"
    />

    <InputText
        v-model="paciente.nombre"
        label="Nombres"
        id="nombre"
        type="text"
        :required="true"
        :error="errorFields?.nombre"
    />

    <InputText
        v-model="paciente.apellido"
        label="Apellidos"
        id="apellido"
        type="text"
        :required="true"
        :error="errorFields?.apellido"
    />

    <InputText
        v-model="paciente.direccion"
        label="Dirección"
        id="direccion"
        type="text"
        :required="false"
        :error="errorFields?.direccion"
    />

    <InputText
        v-model="paciente.telefono"
        label="Teléfono"
        id="telefono"
        type="text"
        :required="true"
        :error="errorFields?.telefono"
    />

    <InputText
        v-model="paciente.correo"
        label="Correo"
        id="correo"
        type="text"
        :required="true"
        :error="errorFields?.correo"
    />

    <InputText
        v-model="paciente.fechaNacimiento"
        label="Fecha de nacimiento"
        id="fechaNacimiento"
        type="date"
        :required="true"
        :error="errorFields?.fechaNacimiento"
    />

    <InputSelect
        id="genero"
        label="Genero"
        v-model="paciente.genero"
        :required="true"
        :options="[
          { id: 'm', label: 'Masculino' },
          { id: 'f', label: 'Femenino' }
        ]"
        :error="errorFields.genero"
    />

    <InputSelect
        id="estadoCivil"
        label="Estado Civil"
        v-model="paciente.estadoCivil"
        :required="true"
        :options="[
          { id: 'soltero', label: 'Soltero/a' },
          { id: 'casado', label: 'Casado/a' },
          { id: 'divorciado', label: 'Divorciado/a' },
          { id: 'viudo', label: 'Viudo/a' },
        ]"
        :error="errorFields.estadoCivil"
    />

    <InputSelect
        id="alfabeta"
        label="Alfabeta"
        v-model="paciente.alfabeta"
        :required="true"
        :options="[
          { id: 'true', label: 'Si' },
          { id: 'false', label: 'No' }
        ]"
        :error="errorFields.alfabeta"
    />

    <button
        type="submit"
        class="mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
    >
      Guardar
    </button>

  </form>
</template>

<style scoped>

</style>