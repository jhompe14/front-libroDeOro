import React from 'react';

export const UsuarioListadoTableRow = ({usuario}) => {   
    return (
        <tr>
            <td>{usuario.nombres}</td>
            <td>{usuario.apellidos}</td>
            <td>{usuario.tipoIntegrante}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.direccion}</td>
            <td>{usuario.ciudad}</td>
            <td>{usuario.usuario}</td>
        </tr>
    )
}
