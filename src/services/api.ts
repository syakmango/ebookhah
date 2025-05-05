import axios from 'axios';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  
  const response = await api.post('/token', formData);
  return response.data;
};

export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/register', { name, email, password });
  return response.data;
};

export const getBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getBook = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (book: any) => {
  const response = await api.post('/books', book);
  return response.data;
};

export const updateBook = async (id: string, book: any) => {
  const response = await api.put(`/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

export default api;