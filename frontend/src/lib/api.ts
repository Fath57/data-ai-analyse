import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getOne: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

export const dataAPI = {
  upload: (projectId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/data/upload/${projectId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getDatasets: (projectId: string) => api.get(`/data/datasets/${projectId}`),
  getDataset: (id: string) => api.get(`/data/dataset/${id}`),
  preview: (id: string) => api.get(`/data/dataset/${id}/preview`),
  delete: (id: string) => api.delete(`/data/dataset/${id}`),
};

export const aiAPI = {
  query: (data: any) => api.post('/ai/query', data),
  getTemplates: () => api.get('/ai/templates'),
  executeTemplate: (templateId: string, params: any) =>
    api.post(`/ai/template/${templateId}`, params),
  getHistory: (projectId: string) => api.get(`/ai/queries/${projectId}`),
  exportResults: (queryId: string, format: 'pdf' | 'excel') =>
    api.post(`/ai/export/${queryId}`, { format }),
};
