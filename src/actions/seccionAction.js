import { queryFetch } from "../helpers/queryFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_SECCIONES } from '../util/constant';
import { controlErrorFetch } from "../helpers/controlErrorFetch";

export const startLoadingSecciones = () => {
    return async(dispatch) => {
        const secciones = [];
        await queryFetch(`${HOST_URL_BACK}${API_SECCIONES}`)
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