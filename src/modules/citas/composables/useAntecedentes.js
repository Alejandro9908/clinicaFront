import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = "http://localhost:8080/api/cita-antecedentes";

export function useCitas() {
    const antecedentes = ref([]);
    const antecedente = ref(null);
    const metadata = ref({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
    })

    const fetchAntecedentes = async (search = '', page = 0, size = 10) => {
        try {
            const response = await axios.get(
                `${API_URL}?search=${search}&page=${page}&size=${size}`
            )
            antecedentes.value = response.data.data.content;
            metadata.value = {
                totalPages: response.data.data.totalPages,
                currentPage: response.data.data.number,
                totalElements: response.data.data.totalElements,
            }
        } catch (e) {
            alert("Error al cargar registros: " + e);
        }
    }

    const fetchAntecedente = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            antecedente.value = response.data.data;
        } catch (e) {
            alert("Error al cargar el registro: " + e);
        }
    }

    const createAntecedente = async (data) => {
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

    const updateAntecedente = async (id, data) => {
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

    const deleteAntecedente = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (e) {
            alert("Error al eliminar registro: " + e);
        }
    };

    return {
        antecedentes,
        antecedente,
        metadata,
        fetchAntecedentes,
        fetchAntecedente,
        createAntecedente,
        updateAntecedente,
        deleteAntecedente,
    }
}