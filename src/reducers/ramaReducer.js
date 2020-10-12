import { types } from '../types/types';

const initialState = {
    ramas: []
}

export const ramaReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.ramasLoad:
            return {
                ...state,
                ramas: [ ...action.payload ]
            }

        default:
            return state
    }

};