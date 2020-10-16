import { queryFetch } from "../helpers/queryFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_RAMAS } from '../util/constant';
import { StatusCodes } from 'http-status-codes';
import { controlErrorFetch } from "../helpers/controlErrorFetch";


export const startLoadingRamas = (authReducer) => {
    return async(dispatch) => {
        const ramas = [];

        await queryFetch(`${HOST_URL_BACK}${API_RAMAS}`, authReducer?.token)
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
                        ramas.push({
                            id: elemnt.id,
                            nombre: elemnt.nombre,
                            edadMinima: elemnt.edadMinima,
                            edadMaxima: elemnt.edadMaxima,
                            descripcion: elemnt.descripcion,
                            idGrupo: elemnt.grupo?.id,
                            nombreGrupo: elemnt.grupo?.nombre,
                        });
                    });
                }
            }).catch(err => {
                controlErrorFetch(err, dispatch);
            });

        dispatch(setRamas(ramas));
    }
};

export const setRamas = (ramas) => ({
    type: types.ramasLoad,
    payload: ramas,
});

export const startRemoveRamas = () => ({
    type: types.ramasRemove,
});