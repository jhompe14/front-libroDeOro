import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { TYPE_USUARIO_ADMINISTRADOR } from '../../util/constant';

export const AnecdotaListadoTableRow = ({anecdota}) => {

    const { authReducer } = useSelector( state => state);

    return (
        <tr>
            <td>{anecdota.nombreGrupo}</td>
            <td>{anecdota.nombreRama}</td>
            <td>{anecdota.nombreSeccion}</td>
            <td>{anecdota.nombreSuceso}</td>
            <td>{anecdota.fechaSuceso}</td>
            <td>{anecdota.usuarioRegistro}</td>
            <td>{anecdota.estado}</td>
            <td>{anecdota.usuarioGestion}</td>
            <td>
                <div className="row">
                    {
                        authReducer?.tipoUsuario == TYPE_USUARIO_ADMINISTRADOR && 
                            <div className="col-2" title="Administrar Anecdota"><FontAwesomeIcon icon={faTools}/></div>
                    }                    
                </div>
            </td>
        </tr>
    )
}
