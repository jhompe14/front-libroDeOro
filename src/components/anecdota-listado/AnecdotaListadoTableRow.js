import React from 'react'

export const AnecdotaListadoTableRow = ({anecdota}) => {
    return (
        <tr>
            <td>{anecdota.nombreGrupo}</td>
            <td>{anecdota.nombreRama}</td>
            <td>{anecdota.nombreGrupo}</td>
            <td>{anecdota.nombreSeccion}</td>
            <td>{anecdota.fechaSuceso}</td>
            <td>{anecdota.usuarioRegistro}</td>
            <td>{anecdota.estado}</td>
            <td>{anecdota.usuarioGestion}</td>
            <td></td>
        </tr>
    )
}
