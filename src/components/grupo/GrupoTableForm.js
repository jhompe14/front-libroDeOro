import React from 'react'
import { useQueryFetch } from '../../hooks/useQueryFetch';
import { HOST_URL_BACK, API_GRUPOS } from '../../util/constant';
import { GrupoTableRowForm } from './GrupoTableRowForm';

export const GrupoTableForm = ({ grupos, setGrupos, setGrupoActive }) => {

    useQueryFetch(`${HOST_URL_BACK}${API_GRUPOS}`, setGrupos);

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
                       grupos && grupos.map(grupo => 
                            <GrupoTableRowForm key={grupo.id} grupo={grupo} setGrupos={setGrupos} setGrupoActive={setGrupoActive} />)
                   }
                </tbody>
            </table>
        </div>
    )
}
