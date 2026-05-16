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

API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Catch 401 Unauthorized from any API call.
    // If user has no token, send them to /login.
    // If token exists but is expired/invalid, clear it and send to /login.
    if (error.response?.status === 401) {
      const path = window.location.pathname
      // Don't redirect if already on auth pages (avoids loop)
      const authPaths = ['/login', '/register']
      if (!authPaths.includes(path)) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        // Use window.location instead of react-router because this file
        // doesn't have access to router context.
        window.location.href = '/login?redirect=' + encodeURIComponent(path)
      }
    }
    return Promise.reject(error)
  }
)

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
  getMyEarnings: () => API.get('/vendors/earnings'),
  updateIban: (data) => API.put('/vendors/iban', data),
  adminGetPayouts: () => API.get('/vendors/admin/payouts'),
  adminMarkPaid: (data) => API.post('/vendors/admin/payouts', data),
  updateStatus: (data) => API.post('/vendors/admin/status', data),
  updateSubscription: (vendorId, data) =>
  API.put(`/vendors/admin/subscription/${vendorId}`, data),
  updateFees: (vendorId, data) =>
  API.put(`/vendors/admin/fees/${vendorId}`, data),
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
  updateUserStatus: (id, approvalStatus) =>
    API.put(`/orders/admin/users/${id}/status`, { approvalStatus }),
}

export default API
