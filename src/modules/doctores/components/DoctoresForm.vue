<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue';
import InputSelectSearch from '@/modules/common/components/InputSelectSearch.vue';
import { useEspecialidades } from '@/modules/especialidades/composables/useEspecialidades.js';
import InputText from "@/modules/common/components/InputText.vue";

const props = defineProps({
  doctor: Object,
  errorFields: Object
});

const { especialidades, fetchEspecialidades } = useEspecialidades();

const searchEspecialidad = ref('')

// Buscar cuando el texto cambia
watch(searchEspecialidad, async (newVal) => {
  await fetchEspecialidades(newVal, 0, 5) // Opcional: limitás resultados
})

const emit = defineEmits(["save"])
</script>

<template>
  <form @submit.prevent="emit('save')" class="p-6 w-full max-w-lg space-y-4">
    <InputText
        v-model="doctor.nombre"
        label="Nombres"
        id="nombre"
        type="text"
        :required="true"
        :error="errorFields?.nombre"
    />

    <InputText
        v-model="doctor.apellido"
        label="Apellidos"
        id="apellido"
        type="text"
        :required="true"
        :error="errorFields?.apellido"
    />

    <InputText
        v-model="doctor.direccion"
        label="Dirección"
        id="direccion"
        type="text"
        :required="false"
        :error="errorFields?.direccion"
    />

    <InputText
        v-model="doctor.telefono"
        label="Teléfono"
        id="telefono"
        type="text"
        :required="true"
        :error="errorFields?.telefono"
    />

    <InputText
        v-model="doctor.correo"
        label="Correo"
        id="correo"
        type="text"
        :required="true"
        :error="errorFields?.correo"
    />

    <InputText
        v-model="doctor.fechaNacimiento"
        label="Fecha de nacimiento"
        id="fechaNacimiento"
        type="date"
        :required="true"
        :error="errorFields?.fechaNacimiento"
    />

    <!-- Selector de especialidad -->
    <InputSelectSearch
        id="especialidad"
        label="Especialidad"
        v-model="doctor.especialidadId"
        :searchTerm="searchEspecialidad"
        @update:searchTerm="searchEspecialidad = $event"
        :options="especialidades"
        :required="true"
        :error="errorFields?.especialidadId"
    />

    <button
        type="submit"
        class="mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
    >
      Guardar
    </button>
  </form>
</template>