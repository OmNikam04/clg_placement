import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8080' })

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        console.log('Inside api');
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('pofile')).token}`
    }

    return req
})

export const studentSignup = (formData) => API.post('/user/register-student', formData)
export const adminSignup = (formData) => API.post('/user/register-admin', formData)
export const companySignup = (formData) => API.post('/user/register-company', formData)

export const signIn = (formData) => API.post('/user/signup', formData)
