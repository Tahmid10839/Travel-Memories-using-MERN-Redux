import * as api from '../api'
import { CREATE_PIN, DELETE, GET_ALL, UPDATE } from '../constants/actionTypes'

export const getPins = () => async (dispatch) => {
    try {
        const res = await api.fetchPins()
        dispatch({ type: GET_ALL, payload: res })
    } catch (error) {
        console.log(error.message);
    }
}

export const createPins = (newPin) => async (dispatch) => {
    try {
        const data = await api.createPin(newPin)
        dispatch({ type: CREATE_PIN, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const updatePin = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updatePin(id, formData)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

export const deletePin = (id) => async (dispatch) => {
    try {
        await api.deletePin(id)
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error.message);
    }
}

export const likePin = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePin(id)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}

