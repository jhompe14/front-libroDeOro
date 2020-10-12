import { queryFetch } from "../helpers/queryFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_RAMAS } from '../util/constant';


export const startLoadingRamas = () => {
    return async(dispatch) => {
        const ramas = [];

        await queryFetch(`${HOST_URL_BACK}${API_RAMAS}`)
            .then(resp => resp.json())
            .then(data =>{
                if(data.length > 0){
                    data.forEach(elemnt => {
                        ramas.push({
                            id: elemnt.id,
                            nombre: elemnt.nombre,
                            idgrupo: elemnt.grupo?.id,
                        });
                    });
                }
            });

        dispatch(setRamas(ramas));
    }
};

export const setRamas = (ramas) => ({
    type: types.ramasLoad,
    payload: ramas,
});