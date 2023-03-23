import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { logger } from './logger'

// Set the base URL for your API
const instance = axios.create()
instance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL

export interface ApiResponse<T> {
  data?: T
  ok: boolean
  error: { message: string }
  status: number
}

// Add a response interceptor to handle errors
instance.interceptors.response.use(
  (response) => {
    return { ...response, ok: true, error: { message: '' } }
  },
  (error: AxiosError) => {
    logger.error(error, 'Axios Request Failed')
    if (error.response) {
      return {
        data: undefined,
        ok: false,
        error: { message: error.response.data },
        status: error.response.status,
      }
    }
    return {
      data: undefined,
      ok: false,
      error: { message: error.message },
      status: error.status,
    }
  },
)

const axiosInstance = <T>(config: AxiosRequestConfig) =>
  instance.request<T, ApiResponse<T>>(config)

export { axiosInstance }
