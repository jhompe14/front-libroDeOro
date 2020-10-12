import { types } from '../types/types';

const initialState = {
    secciones: []
}

export const seccionReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.seccionesLoad:
            return {
                ...state,
                secciones: [ ...action.payload ]
            }

        default:
            return state
    }

};