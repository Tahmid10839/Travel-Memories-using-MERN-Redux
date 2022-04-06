
import { GET_ALL, CREATE_PIN, DELETE, UPDATE } from '../constants/actionTypes'

export default (state = { pins: [] }, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                pins: action.payload.data
            }
        case CREATE_PIN:
            return {
                ...state,
                pins: [...state.pins, action.payload.data]
            }
        case UPDATE:
            return {
                ...state,
                pins: state.pins.map((pin) => pin._id === action.payload._id ? action.payload : pin)
            }
        case DELETE:
            return {
                ...state,
                pins: state.pins.filter((pin) => pin._id !== action.payload)
            }
        default:
            return state
    }
}