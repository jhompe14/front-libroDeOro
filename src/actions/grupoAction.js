import { queryFetch } from "../helpers/queryFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_GRUPOS } from '../util/constant';
import { StatusCodes } from 'http-status-codes';
import { controlErrorFetch } from "../helpers/controlErrorFetch";

export const startLoadingGrupos = () => {
    return async(dispatch) => {
        const grupos = [];

        await queryFetch(`${HOST_URL_BACK}${API_GRUPOS}`)
            .then(resp => {
                if(resp.status === StatusCodes.OK){
                    return resp.json()
                }else{
                    return new Promise((resolve, reject) => reject({status: resp.status}));
                }
            })
            .then(data =>{
                if(data.length > 0){
                    data.forEach(elemnt => {
                        grupos.push({
                            id: elemnt.id,
                            nombre: elemnt.nombre,
                            descripcion: elemnt.descripcion,
                        });
                    });
                }
            }).catch(err => {
                controlErrorFetch(err, dispatch);
            });
        
        dispatch(startSetGrupos(grupos));
    }
};

export const startSetGrupos = (grupos) => ({
    type: types.gruposLoad,
    payload: grupos,
});

export const startRemoveGrupos = () => ({
    type: types.gruposRemove,
});