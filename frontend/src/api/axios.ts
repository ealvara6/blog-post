import axios from 'axios'

const LOCAL_STORAGE_KEY = 'token'

const api = axios.create({
  baseURL: 'https://blog-post-production-cb9e.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default api
