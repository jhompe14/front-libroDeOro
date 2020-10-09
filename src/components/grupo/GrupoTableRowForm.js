import React from 'react';
import PropTypes from 'prop-types';

export const GrupoTableRowForm = ({grupo}) => {
    return (
        <tr>
            <td>{grupo.nombre}</td>
            <td>{grupo.descripcion}</td>
            <td></td>
        </tr>
    )
}

GrupoTableRowForm.prototype = {
    grupo : PropTypes.object.isRequired,
}
