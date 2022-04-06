import { LOGIN, LOG_OUT, REGISTER } from "../constants/actionTypes";

const initialState = {
    accessToken: sessionStorage.getItem('travel-access-token') ? sessionStorage.getItem('travel-access-token') : null,
    user: sessionStorage.getItem('travel-user') ? JSON.parse(sessionStorage.getItem('travel-user')) : null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
            }
        case LOGIN:
            return {
                ...state,
                accessToken: action.payload.data.token,
                user: action.payload.data.user
            }
        case LOG_OUT:
            return {
                ...state,
                accessToken: null,
                user: null
            }
        default:
            return state
    }
}