import { queryFetch } from "../helpers/queryFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_SECCIONES } from '../util/constant';
import { StatusCodes } from 'http-status-codes';
import { controlErrorFetch } from "../helpers/controlErrorFetch";

export const startLoadingSecciones = (authReducer) => {
    return async(dispatch) => {
        const secciones = [];
        await queryFetch(`${HOST_URL_BACK}${API_SECCIONES}`, authReducer?.token)
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
                        secciones.push({
                            id: elemnt.id,
                            nombre: elemnt.nombre,
                            descripcion: elemnt.descripcion,
                            idRama: elemnt.rama?.id,
                            nombreRama: elemnt.rama?.nombre,
                            idGrupo: elemnt.rama?.grupo?.id,
                            nombreGrupo: elemnt.rama?.grupo?.nombre,
                        });
                    });
                }
            }).catch(err => {
                controlErrorFetch(err, dispatch);
            });

        dispatch(setSecciones(secciones));
    }
};

export const setSecciones = (secciones) => ({
    type: types.seccionesLoad,
    payload: secciones,
});

export const startRemoveSecciones = () => ({
    type: types.seccionesRemove,
});