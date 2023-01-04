import axios from 'axios'

export const API_URL = process.env.REACT_APP_PROXY

const API = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

API.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('userToken')}`
  return config
})

API.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${API_URL}/user/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('userToken', response.data.accessToken)
        return API.request(originalRequest)
      } catch (e: any) {
        throw new Error(e)
      }
    }
    throw error
  }
)
export default API
