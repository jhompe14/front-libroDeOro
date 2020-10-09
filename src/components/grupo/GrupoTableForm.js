import React from 'react'
import { useFetchQuery } from '../../hooks/useFetchQuery';
import {HOST_URL_BACK, API_GRUPOS} from '../../util/constant';
import { GrupoTableRowForm } from './GrupoTableRowForm';

export const GrupoTableForm = ({ grupos, setGrupos }) => {

    const { loading } = useFetchQuery(`${HOST_URL_BACK}${API_GRUPOS}`, setGrupos);

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
                       grupos && grupos.map(grupo => <GrupoTableRowForm key={grupo.id} grupo={grupo}/>)
                   }
                </tbody>
            </table>
        </div>
    )
}
