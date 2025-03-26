<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDoctores } from '@/modules/doctores/composables/useDoctores.js';
import PageHeading from '@/modules/common/components/PageHeading.vue';
import DoctoresForm from '@/modules/doctores/components/DoctoresForm.vue';
import { useEspecialidades } from '@/modules/especialidades/composables/useEspecialidades.js';

const { fetchEspecialidades } = useEspecialidades();

const router = useRouter();
const route = useRoute();
const { doctor, fetchDoctor, updateDoctor } = useDoctores();
const errorFields = ref({});

const actDoctor = ref({
  id: '',
  nombre: '',
  apellido: '',
  direccion: '',
  telefono: '',
  correo: '',
  fechaNacimiento: '',
  especialidadId: '',
  estado: '',
});

onMounted(async () => {
  await fetchDoctor(route.params.id);
  await fetchEspecialidades('', 0, 100); // ¡Asegúrate que incluye la especialidad actual!
  actDoctor.value = {
    id: doctor.value.id,
    nombre: doctor.value.nombre,
    apellido: doctor.value.apellido,
    direccion: doctor.value.direccion,
    telefono: doctor.value.telefono,
    correo: doctor.value.correo,
    fechaNacimiento: doctor.value.fechaNacimiento,
    especialidadId: doctor.value.especialidadId || doctor.value.especialidad?.id || '',
    estado: doctor.value.estado,
  };
});

const handleUpdate = async () => {
  const result = await updateDoctor(route.params.id, actDoctor.value);

  if (result.success) {
    alert('Guardado correctamente');
    await router.push('/doctores');
  } else {
    errorFields.value = result.errorFields;
  }
};
</script>

<template>
  <div class="flex justify-between items-center mb-4 border-b border-gray-200">
    <PageHeading title="Editar Doctor" />
    <RouterLink
        :to="{ path: '/doctores' }"
        class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
    >
      Regresar
    </RouterLink>
  </div>

  <DoctoresForm
      :doctor="actDoctor"
      :errorFields="errorFields"
      @save="handleUpdate"
  />
</template>

<style scoped>
</style>