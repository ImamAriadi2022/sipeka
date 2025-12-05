import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => {
    // Don't send nested object, send flat data
    return api.post('/auth/register', {
      fullName: data.fullName,
      email: data.email,
      npm: data.npm,
      password: data.password,
    });
  },
  
  login: (email, password) => api.post('/auth/login', { email, password }),
  
  logout: () => api.post('/auth/logout'),
  
  getProfile: () => api.get('/auth/profile'),
  
  updateProfile: (formData) => {
    return api.post('/auth/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  changePassword: (currentPassword, newPassword) => api.post('/auth/change-password', {
    currentPassword,
    newPassword,
  }),
};

// Reports API
export const reportsAPI = {
  getAll: (params = {}) => api.get('/reports', { params }),
  
  getById: (id) => api.get(`/reports/${id}`),
  
  create: (formData) => {
    return api.post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  update: (id, data) => api.put(`/reports/${id}`, data),
  
  delete: (id) => api.delete(`/reports/${id}`),
};

// Admin API
export const adminAPI = {
  getPendingReports: () => api.get('/admin/pending-reports'),
  
  validateReport: (id, status) => api.post(`/admin/validate-report/${id}`, { status }),
  
  getReportHistory: (params = {}) => api.get('/admin/report-history', { params }),
  
  getStatistics: () => api.get('/admin/statistics'),
  
  getAllReports: (params = {}) => api.get('/admin/reports', { params }),
};

export default api;
