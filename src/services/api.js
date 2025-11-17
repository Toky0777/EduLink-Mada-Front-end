import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor pour ajouter le token aux requêtes
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor pour gérer les erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => api.post('/login', credentials),
    register: (userData) => api.post('/register', userData),
    logout: () => api.post('/logout'),
    getUser: () => api.get('/user'),
};

export const professorAPI = {
    getAll: (params) => api.get('/professors', { params }),
    search: (filters) => api.get('/professors/search', { params: filters }),
    getPopular: () => api.get('/professors/popular'),
    getById: (id) => api.get(`/professors/${id}`),
    update: (id, data) => api.put(`/professors/${id}`, data),
};

export const appointmentAPI = {
    getAll: (params) => api.get('/appointments', { params }),
    create: (data) => api.post('/appointments', data),
    confirm: (id) => api.put(`/appointments/${id}/confirm`),
    cancel: (id, reason) => api.put(`/appointments/${id}/cancel`, { reason }),
    complete: (id) => api.put(`/appointments/${id}/complete`),
};

export const reviewAPI = {
    getByProfessor: (professorId) => api.get('/reviews', { params: { professor_id: professorId } }),
    create: (data) => api.post('/reviews', data),
    respond: (id, response) => api.put(`/reviews/${id}/respond`, { response }),
    delete: (id) => api.delete(`/reviews/${id}`),
};

export const favoriteAPI = {
    getAll: () => api.get('/favorites'),
    add: (professorId) => api.post('/favorites', { professor_id: professorId }),
    remove: (professorId) => api.delete(`/favorites/${professorId}`),
    check: (professorId) => api.get(`/favorites/check/${professorId}`),
};

export const statsAPI = {
    platform: () => api.get('/stats/platform'),
    professor: () => api.get('/stats/professor'),
};

export default api;