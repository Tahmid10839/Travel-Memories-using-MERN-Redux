import * as api from '../api'
import { LOGIN, LOG_OUT, REGISTER } from '../constants/actionTypes';

export const createUsers = (newUser, setIsLoading, setSuccess, setError) => async (dispatch) => {
    setIsLoading(true)
    try {
        const res = await api.createUser(newUser)
        // console.log(res);
        dispatch({ type: REGISTER, payload: res })
        setError('')
        setSuccess('Registration Successful! You can Login now')
    } catch (error) {
        // console.log(error.response);
        setSuccess('')
        setError(error.response.data.error)
    }
    setIsLoading(false)
}

export const loginUsers = (formData, setIsLoading, setSuccess, setError, setShowLogin, setShowRegister) => async (dispatch) => {
    setIsLoading(true)
    try {
        const res = await api.loginUser(formData)
        sessionStorage.setItem('travel-access-token', res.data.token)
        sessionStorage.setItem('travel-user', JSON.stringify(res.data.user))
        dispatch({ type: LOGIN, payload: res })
        setError('')
        setSuccess('Login Successful!')
        setShowLogin(false)
        setShowRegister(false)
    } catch (error) {
        setSuccess('')
        setError(error.response.data.error)
    }
    setIsLoading(false)
}

export const logOut = () => async (dispatch) => {
    dispatch({
        type: LOG_OUT,
    })
    sessionStorage.removeItem("travel-access-token")
    sessionStorage.removeItem("travel-user")
}