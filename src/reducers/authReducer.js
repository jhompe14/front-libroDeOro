
import { types } from '../types/types';

export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.login:
            return {
                usuario: action.payload.usuario,
                token: action.payload.token,
                tipoUsuario: action.payload.tipoUsuario 
            }
        case types.logout:
                return { }
    
        default:
            return state;
    }

}