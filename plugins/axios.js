export default ({ $axios, redirect, error }, inject) => {
  const axios = $axios.create({
    baseURL: process.env.BASE_URL || 'https://e-shop.ndc.uz/api/admin',
  })

  axios.interceptors.response.use(
    (response) => response,
    (err) => {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        redirect('/login')
      }
      return Promise.reject(err)
    }
  )

  axios.interceptors.request.use((config) => {
    config.headers.common['Authorization'] = `Bearer ${process.server ? '' : localStorage.getItem('token') ? localStorage.getItem('token') : ''}`
    return config
  })

  inject('axios', axios)
}