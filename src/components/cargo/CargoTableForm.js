import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { HOST_URL_BACK, API_CARGOS } from '../../util/constant';
import { CargoTableRowForm } from './CargoTableRowForm';
import { queryFetch } from '../../helpers/queryFetch';
import { messageLoadingSwal, messageCloseSwal } from '../../util/messages';


export const CargoTableForm = ({ cargos, setCargos, setCargoActive, typecargo, typeId }) => {

    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);

    const loadCargos = async() => {
        messageLoadingSwal();
        await queryFetch(`${HOST_URL_BACK}${API_CARGOS}/type/${typecargo}/id/${typeId}`, authReducer?.token)
            .then(data =>{
                messageCloseSwal();
                if(data.length > 0){
                    setCargos(data);
                }          
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    useEffect(() => {
        loadCargos();
    }, []);    

    return (
        <div className="mt-3">
            <table className="table table-sm">
                <thead>
                    <tr className="background_libro_oro">
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripci&oacute;n</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       cargos && cargos.map(cargo => 
                            <CargoTableRowForm key={cargo.id} cargo={cargo} setCargos={setCargos} setCargoActive={setCargoActive} />)
                   }
                </tbody>
            </table>
        </div>
    )
}
