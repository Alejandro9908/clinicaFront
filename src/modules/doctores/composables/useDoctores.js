import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = "http://localhost:8080/api/doctores";

export function useDoctores() {
    const doctores = ref([]);
    const doctor = ref(null);
    const metadata = ref({
        totalPages: 0,
        currentPage: 0,
        totalElements: 0
    })

    const fetchDoctores = async (search = '', page = 0, size = 10) => {
        try {
            const response = await axios.get(
                `${API_URL}?search=${search}&page=${page}&size=${size}`
            )
            doctores.value = response.data.data.content;
            metadata.value = {
                totalPages: response.data.data.totalPages,
                currentPage: response.data.data.number,
                totalElements: response.data.data.totalElements,
            }
        } catch (e) {
            alert("Error al cargar registros: " + e);
        }
    }

    const fetchDoctor = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            doctor.value = response.data.data;
        } catch (e) {
            alert("Error al cargar el registro: " + e);
        }
    }

    const createDoctor = async (data) => {
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

    const updateDoctor = async (id, data) => {
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

    const deleteDoctor = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            console.log(response.data);
            return response.data;
        } catch (e) {
            alert("Error al eliminar registro: " + e);
        }
    };

    return {
        doctores,
        doctor,
        metadata,
        fetchDoctores,
        fetchDoctor,
        createDoctor,
        updateDoctor,
        deleteDoctor,
    }
}