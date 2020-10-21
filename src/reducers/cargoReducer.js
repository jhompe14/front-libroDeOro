
import { types } from '../types/types';

const initialState = {
    cargos: []
}

export const cargoReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.cargosLoad:
            return {
                ...state,
                cargos: [ ...action.payload ]
            }
        
        case types.cargosRemove:
            return {}

        default:
            return state
    }

};