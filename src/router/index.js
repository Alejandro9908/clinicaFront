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
      path: '/doctores/:id',
      component: () => import('@/modules/doctores/views/DoctoresShow.vue')
    },
    {
      path: '/doctores/edit/:id',
      component: () => import('@/modules/doctores/views/DoctoresEdit.vue')
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
    {
      path: '/citas',
      component: () => import('@/modules/citas/views/CitasIndex.vue'),
    },
    {
      path: '/citas/create',
      component: () => import('@/modules/citas/views/CitasCreate.vue'),
    },
    {
      path: '/citas/:id',
      component: () => import('@/modules/citas/views/CitasShow.vue'),
    },
    {
      path: '/citas/edit/:id',
      component: () => import('@/modules/citas/views/CitasEdit.vue'),
    },
  ],
})

export default router
