// import axios from 'axios'

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: { 'Content-Type': 'application/json' },
//   timeout: 10000
// })

// // Attach JWT token to every request if present
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('codecelix-token')
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// // Global error handler
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem('codecelix-token')
//     }
//     return Promise.reject(err)
//   }
// )

// export default api

import axios from 'axios'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || 'https://codecelix-backend.onrender.com/api'
})

console.log('API URL:', import.meta.env.VITE_API_URL)

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
