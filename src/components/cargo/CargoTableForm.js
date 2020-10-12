import React from 'react'
import { useQueryFetch } from '../../hooks/useQueryFetch';
import { HOST_URL_BACK, API_CARGOS } from '../../util/constant';
import { CargoTableRowForm } from './CargoTableRowForm';


export const CargoTableForm = ({ cargos, setCargos, setCargoActive, typecargo, typeId }) => {

    useQueryFetch(`${HOST_URL_BACK}${API_CARGOS}/type/${typecargo}/id/${typeId}`, setCargos);

    return (
        <div className="mt-3">
            <table className="table table-sm">
                <thead>
                    <tr className="background_libro_oro">
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
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
