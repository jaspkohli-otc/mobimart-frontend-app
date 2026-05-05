import axios from 'axios'

const API = axios.create({
  baseURL: 'https://mobimart-backend-production.up.railway.app/api'
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const auth = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  me: () => API.get('/auth/me'),
}

export const products = {
  getAll: (params) => API.get('/products', { params }),
  getOne: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  remove: (id) => API.delete(`/products/${id}`),
  getCategories: () => API.get('/products/categories'),
  getReviews: (id) => API.get(`/products/${id}/reviews`),
  addReview: (id, data) => API.post(`/products/${id}/reviews`, data),
  deleteReview: (id) => API.delete(`/products/${id}/reviews`),
}

export const vendors = {
  getAll: () => API.get('/vendors'),
  createStore: (data) => API.post('/vendors/store', data),
  getMyStore: () => API.get('/vendors/store'),
  uploadImage: (formData) => API.post('/vendors/upload-image', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  bulkUpload: (formData) => API.post('/vendors/bulk-upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
}

export const cart = {
  get: () => API.get('/cart'),
  add: (data) => API.post('/cart', data),
  update: (productId, data) => API.put(`/cart/${productId}`, data),
  remove: (productId) => API.delete(`/cart/${productId}`),
}

export const orders = {
  place: (data) => API.post('/orders', data),
  getAll: () => API.get('/orders'),
  getOne: (id) => API.get(`/orders/${id}`),
  updateStatus: (id, status) => API.put(`/orders/${id}/status`, { status }),
  adminGetAll: () => API.get('/orders/admin/all-orders'),
  adminGetStats: () => API.get('/orders/admin/stats'),
  adminGetUsers: () => API.get('/orders/admin/users'),
  adminGetVendors: () => API.get('/orders/admin/vendors'),
}

export default API