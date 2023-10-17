import Axios from 'axios'
import type { AxiosInstance } from 'axios'

const request = Axios.create({
  baseURL: __BASE_URL__,
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

request.interceptors.request.use(
  (conf) => {
    return conf
  },
  (err) => {
    return Promise.reject(err)
  }
)

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request
