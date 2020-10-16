

import { types } from '../types/types';

const initialState = {
    grupos: []
}

export const grupoReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.gruposLoad:
            return {
                ...state,
                grupos: [ ...action.payload ]
            }

        case types.gruposRemove:
            return {}        

        default:
            return state
    }

}