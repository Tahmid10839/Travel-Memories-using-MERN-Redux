import axios from 'axios'

const API = axios.create({
    baseURL: "https://nit-travel-memories.herokuapp.com/api",
})

API.interceptors.request.use((req) => {
    if (sessionStorage.getItem('travel-access-token')) {
        req.headers.Authorization = `Bearer ${(sessionStorage.getItem('travel-access-token'))}`
    }
    return req
})

export const fetchPins = () => API.get('/pins')
export const createPin = (newPin) => API.post('/pins', newPin)
export const updatePin = (id, formData) => API.patch(`/pins/${id}`, formData)
export const deletePin = (id) => API.delete(`/pins/${id}`)
export const likePin = (id) => API.patch(`/pins/${id}/likePin`)
export const createUser = (newUser) => API.post('/user/register', newUser)
export const loginUser = (formData) => API.post('/user/login', formData)