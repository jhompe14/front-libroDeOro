import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { GrupoTableRowForm } from './GrupoTableRowForm';

export const GrupoTableForm = ({ grupos, setGrupos, setGrupoActive }) => {

    const grupoReducer= useSelector( state => state)?.grupoReducer;

    useEffect(() => {
        setGrupos(grupoReducer?.grupos);
    }, [grupoReducer]);

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
