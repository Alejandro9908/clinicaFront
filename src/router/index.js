import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/especialidades',
    },
    {
      path: '/especialidades',
      component: () => import('@/modules/especialidades/views/EspecialidadesIndex.vue'),
    },
    {
      path: '/especialidades/create',
      component: () => import('@/modules/especialidades/views/EspecialidadesCreate.vue'),
    },
    {
      path: '/especialidades/:id',
      component: () => import('@/modules/especialidades/views/EspecialidadesShow.vue'),
    },
    {
      path: '/especialidades/edit/:id',
      component: () => import('@/modules/especialidades/views/EspecialidadesEdit.vue'),
    },
    {
      path: '/doctores',
      component: () => import('@/modules/doctores/views/DoctoresIndex.vue'),
    },
    {
      path: '/doctores/create',
      component: () => import('@/modules/doctores/views/DoctoresCreate.vue'),
    },
    {
      path: '/pacientes',
      component: () => import('@/modules/pacientes/views/PacientesIndex.vue'),
    },
    {
      path: '/pacientes/create',
      component: () => import('@/modules/pacientes/views/PacientesCreate.vue'),
    },
    {
      path: '/pacientes/:id',
      component: () => import('@/modules/pacientes/views/PacientesShow.vue'),
    },
    {
      path: '/pacientes/edit/:id',
      component: () => import('@/modules/pacientes/views/PacientesEdit.vue'),
    },
  ],
})

export default router
