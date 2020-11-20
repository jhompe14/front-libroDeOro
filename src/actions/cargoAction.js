import { queryFetch } from "../helpers/queryFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_CARGOS } from '../util/constant';
import { StatusCodes } from 'http-status-codes';
import { controlErrorFetch } from "../helpers/controlErrorFetch";

export const startLoadingCargos = () => {
    return async(dispatch) => {
        const cargos = [];

        await queryFetch(`${HOST_URL_BACK}${API_CARGOS}`)
            .then(data =>{
                if(data.length > 0){
                    data.forEach(elemnt => {
                        cargos.push({
                            id: elemnt.id,
                            nombre: elemnt.nombre,
                            descripcion: elemnt.descripcion,
                            idGrupo: elemnt.grupo?.id,
                            idRama: elemnt.rama?.id,
                            idSeccion: elemnt.seccion?.id,
                        });
                    });
                }
            }).catch(err => {
                controlErrorFetch(err, dispatch);
            });
        
        dispatch(startSetCargos(cargos));
    }
};

export const startSetCargos = (cargos) => ({
    type: types.cargosLoad,
    payload: cargos,
});

export const startRemoveCargos = () => ({
    type: types.cargosRemove,
});