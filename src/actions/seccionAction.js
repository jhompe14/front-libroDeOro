import { queryFetch } from "../helpers/queryFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_SECCIONES } from '../util/constant';


export const startLoadingSecciones = () => {
    return async(dispatch) => {
        const secciones = [];

        await queryFetch(`${HOST_URL_BACK}${API_SECCIONES}`)
            .then(resp => resp.json())
            .then(data =>{
                if(data.length > 0){
                    data.forEach(elemnt => {
                        secciones.push({
                            id: elemnt.id,
                            nombre: elemnt.nombre,
                            idrama: elemnt.rama?.id,
                        });
                    });
                }
            });

        dispatch(setSecciones(secciones));
    }
};

export const setSecciones = (secciones) => ({
    type: types.seccionesLoad,
    payload: secciones,
});