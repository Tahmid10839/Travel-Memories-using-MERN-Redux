import { combineReducers } from 'redux';
import authReducers from './authReducers';
import pinsReducers from './pinsReducers';

export default combineReducers({
    pins: pinsReducers,
    auth: authReducers
})