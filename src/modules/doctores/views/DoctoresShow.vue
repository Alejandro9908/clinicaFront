<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDoctores } from '@/modules/doctores/composables/useDoctores.js';
import PageHeading from '@/modules/common/components/PageHeading.vue';
import DescriptionItem from '@/modules/common/components/DescriptionItem.vue';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const { doctor, fetchDoctor } = useDoctores();

const showDoctor = ref({
  id: '',
  nombre: '',
  apellido: '',
  direccion: '',
  telefono: '',
  correo: '',
  fechaNacimiento: '',
  especialidad: '',
  estado: '',
});

onMounted(async () => {
  await fetchDoctor(route.params.id);

  const especialidadId = doctor.value.especialidadId;
  let especialidadNombre = 'No asignada';

  if (especialidadId) {
    try {
      const res = await axios.get(`http://localhost:8080/api/especialidades/${especialidadId}`);
      //console.log('Especialidad response:', res.data);
      especialidadNombre = res?.data?.data?.descripcion || 'No asignada';
    } catch (e) {
      console.warn("Error al cargar especialidad:", e);
    }
  }

  showDoctor.value = {
    id: doctor.value.id,
    nombre: doctor.value.nombre,
    apellido: doctor.value.apellido,
    direccion: doctor.value.direccion,
    telefono: doctor.value.telefono,
    correo: doctor.value.correo,
    fechaNacimiento: doctor.value.fechaNacimiento,
    especialidad: especialidadNombre,
    estado: doctor.value.estado,
  };
  //console.log('showDoctor:', showDoctor.value);
});


</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200">
      <PageHeading title="Datos del doctor" />
      <RouterLink
          :to="{ path: '/doctores' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>
    <div class="w-full flex flex-wrap justify-start">
      <DescriptionItem size="1" :value="String(showDoctor.id)" label="ID" />
      <DescriptionItem size="1" :value="String(showDoctor.nombre)" label="Nombre" />
      <DescriptionItem size="2" :value="String(showDoctor.apellido)" label="Apellido" />
      <DescriptionItem size="4" :value="String(showDoctor.direccion)" label="Dirección" />
      <DescriptionItem size="1" :value="String(showDoctor.telefono)" label="Teléfono" />
      <DescriptionItem size="1" :value="String(showDoctor.correo)" label="Correo" />
      <DescriptionItem size="1" :value="String(showDoctor.fechaNacimiento)" label="Fecha de nacimiento" />
      <DescriptionItem size="2" :value="String(showDoctor.especialidad)" label="Especialidad" />
      <DescriptionItem size="1" :value="String(showDoctor.estado)" label="Estado" />
    </div>
  </div>
</template>

<style scoped>
</style>