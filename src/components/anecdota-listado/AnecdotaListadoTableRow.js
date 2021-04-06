import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTools, faEye, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { TYPE_USUARIO_ADMINISTRADOR, 
    TYPE_USUARIO_INTEGRANTE,
    TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION,
    TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION 
} from '../../util/constant';

export const AnecdotaListadoTableRow = ({anecdota}) => {

    const history= useHistory();
    const { authReducer } = useSelector( state => state);

    const handleGoAnecdotaView = () => history.replace(`/anecdota/view/${anecdota.idAnecdota}/from/listado`);
    const handleGoAnecdotaEdit = () => history.replace(`/anecdota/edit/${anecdota.idAnecdota}`);   

    return (
        <tr>
            <td>{anecdota.idAnecdota}</td>
            <td>{anecdota.nombreGrupo}</td>
            <td>{anecdota.nombreRama}</td>
            <td>{anecdota.nombreSeccion}</td>
            <td>{anecdota.nombreSuceso}</td>
            <td>{anecdota.fechaSuceso}</td>
            <td>{anecdota.usuarioRegistro}</td>
            <td>{anecdota.descripcionEstado}</td>
            <td>{anecdota.usuarioGestion}</td>
            <td>
                <div className="row">
                    {
                        authReducer?.tipoUsuario == TYPE_USUARIO_ADMINISTRADOR &&
                            <> 
                                <div className="col-2" title="Administrar An&eacute;cdota" onClick={handleGoAnecdotaView}><FontAwesomeIcon icon={faTools}/></div>
                                <div className="col-2" title="Modificar An&eacute;cdota" onClick={handleGoAnecdotaEdit}><FontAwesomeIcon icon={faPenAlt}/></div>
                            </>
                    }
                    {
                        authReducer?.tipoUsuario == TYPE_USUARIO_INTEGRANTE &&
                            <div className="col-2" title="Ver An&eacute;cdota" onClick={handleGoAnecdotaView}><FontAwesomeIcon icon={faEye}/></div>
                    }
                    {
                        authReducer?.tipoUsuario == TYPE_USUARIO_INTEGRANTE && 
                            (anecdota.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION || 
                                (anecdota.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION && authReducer?.usuario == anecdota.usuarioGestion)) &&
                            <div className="col-2" title="Modificar An&eacute;cdota" onClick={handleGoAnecdotaEdit}><FontAwesomeIcon icon={faPenAlt}/></div>
                    }                    
                </div>
            </td>
        </tr>
    )
}
