<script setup>
import {ref, onMounted} from 'vue'
import { useCitas } from "@/modules/citas/composables/useCitas.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import SearchBar from "@/modules/common/components/SearchBar.vue";
import SimpleTable from "@/modules/common/components/SimpleTable.vue";
import Pagination from '@/modules/common/components/Pagination.vue'
import { PlusIcon } from '@heroicons/vue/20/solid'

const { citas, fetchCitas, metadata, cancelCita } = useCitas();

const rows = ref([]);
const currentPage = ref(0)
const pageSize = ref(10)
const search = ref('')

const searchRegistros = async () => {
  await fetchCitas(search.value, currentPage.value, pageSize.value);
  rows.value = citas.value.map(item => ({
    key: item.id,
    ID: item.id,
    "Fecha y Hora": item.fechaHoraCita,
    Doctor: item.nombreDoctor + " " + item.apellidoDoctor,
    Paciente: item.nombrePaciente + " " + item.apellidoPaciente,
    Estado: item.estado,
  }));
}

const cancelar = async (id) => {
  const confirmacion = confirm('¿Estás seguro que deseas cancelar la cita?')
  if (!confirmacion) return

  try {
    await cancelCita(id)
    await searchRegistros()
  } catch (e) {
    alert('Error al eliminar el registro')
    console.error(e)
  }
}

onMounted(async () => {
  searchRegistros();
});
</script>

<template>
  <div class="space-y-6">

    <div class="flex justify-between items-center mb-4 border-b border-gray-200">
      <PageHeading title="Citas" />

      <RouterLink
          :to="{ path: '/citas/create' }"
          class="inline-flex items-center gap-2 mb-2 px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-md shadow-sm"
      >
        <PlusIcon class="w-5 h-5" />
        Nuevo
      </RouterLink>
    </div>

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
      <SearchBar
          v-model:search="search"
          @search="searchRegistros"
      />

      <Pagination
          v-model:currentPage="currentPage"
          :totalPages="metadata.totalPages"
          @change="searchRegistros"
      />
    </div>

    <SimpleTable :headers="['ID', 'Fecha y Hora', 'Paciente', 'Doctor', 'Estado', 'Acciones']" :rows="rows">
      <template #acciones="{ row }">
        <div class="flex gap-2">
          <RouterLink
              :to="{ path: '/citas/' + row.key }"
              class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm cursor-pointer"
          >
            Ver
          </RouterLink>
          <RouterLink
              v-if="row.Estado === 'PENDIENTE'"
              :to="{ path: '/citas/edit/' + row.key }"
              class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-600 rounded-md shadow-sm cursor-pointer"
          >
            Atender
          </RouterLink>
          <button
              v-if="row.Estado === 'PENDIENTE'"
              class="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md shadow-sm cursor-pointer"
              @click="cancelar(row.key)"
          >
            Cancelar
          </button>
        </div>
      </template>
    </SimpleTable>
  </div>
</template>

<style scoped>

</style>