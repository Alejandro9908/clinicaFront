<script setup>
import {ref} from 'vue'
import { useRouter } from "vue-router";
import { useCitas } from "@/modules/citas/composables/useCitas.js";
import PageHeading from "@/modules/common/components/PageHeading.vue";
import CitasCreateForm from "@/modules/citas/components/CitasCreateForm.vue";

const router = useRouter();
const { createCita } = useCitas();
const errorFields = ref({})
const newCita = ref({
  fechaHoraCita: "",
  duracionCita: 30,
  pacienteId: 0,
  doctorId: 0,
  motivo: "",
  fechaAtendida: "2025-01-01T00:00:00",
});

const handleSave = async () => {
  const result = await createCita(newCita.value)

  if (result.success) {
    alert("Guardado correctamente");
    await router.push("/citas");
  } else {
    errorFields.value = result.errorFields
  }
}
</script>

<template>
  <div class="w-full ">
    <div class="flex justify-between items-center mb-4 border-b border-gray-200 ">
      <PageHeading title="Nueva Cita" />
      <RouterLink
          :to="{ path: '/citas' }"
          class="mb-2 bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-md hover:bg-gray-300 transition cursor-pointer"
      >
        Regresar
      </RouterLink>
    </div>

    <CitasCreateForm
        :cita="newCita"
        :errorFields="errorFields"
        @save="handleSave"
    />

  </div>
</template>

<style scoped>

</style>