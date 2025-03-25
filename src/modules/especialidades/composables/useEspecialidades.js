import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = "http://localhost:8080/api/especialidades"

export function useEspecialidades() {
    const especialidades = ref([]);
    const especialidad = ref(null);
    const metadata = ref({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
    })

    const fetchEspecialidades = async (search = '', page = 0, size = 10) => {
        try {
            const response = await axios.get(
                `${API_URL}?search=${search}&page=${page}&size=${size}`
            )
            especialidades.value = response.data.data.content;
            metadata.value = {
                totalPages: response.data.data.totalPages,
                currentPage: response.data.data.number,
                totalElements: response.data.data.totalElements,
            }
        } catch (e) {
            alert("Error al cargar registros: " + e);
        }
    }

    const fetchEspecialidad = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            especialidad.value = response.data.data;
        } catch (e) {
            alert("Error al cargar el registro: " + e);
        }
    }

    const createEspecialidad = async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            return { success: true, data: response.data }
        } catch (e) {
            if (e.response && e.response.status === 400) {
                return {
                    success: false,
                    errorFields: e.response.data.errorFields || {},
                    message: e.response.data.message,
                }
            } else {
                alert("Error desconocido al guardar registro");
                throw e
            }
        }
    };

    const updateEspecialidad = async (id, data) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data);
            return { success: true, data: response.data }
        } catch (e) {
            if (e.response && e.response.status === 400) {
                return {
                    success: false,
                    errorFields: e.response.data.errorFields || {},
                    message: e.response.data.message,
                }
            } else {
                alert("Error desconocido al actualizar registro");
                throw e
            }
        }
    };

    const deleteEspecialidad = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            console.log(response.data);
            return response.data;
        } catch (e) {
            alert("Error al eliminar registro: " + e);
        }
    };

    return {
        especialidades,
        especialidad,
        metadata,
        fetchEspecialidades,
        fetchEspecialidad,
        createEspecialidad,
        updateEspecialidad,
        deleteEspecialidad,
    }
}