import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { HOST_URL_BACK, API_GRUPOS, METHOD_DELETE } from '../../util/constant';
import { commandFetch } from '../../helpers/CommandFetch';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';
import { filterDropById } from '../../util/selectors';

export const GrupoTableRowForm = ({grupo, setGrupos, setGrupoActive}) => {

    const handleSetGrupoActive = () => {
        setGrupoActive(grupo);
    };

    const handleDeleteGrupo = () => {
        messageLoadingSwal();
        commandFetch(`${HOST_URL_BACK}${API_GRUPOS}/${grupo.id}`, METHOD_DELETE)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                setGrupos(grupos => filterDropById(grupos, grupo.id));
                messageCloseSwal();
                messageSuccessSwal("Grupo eliminado con exito");                              
            } else {
                response.text().then(msg => {
                    messageCloseSwal();
                    messageErrorSwal(msg);                                       
                });                
            }
        })
        .catch(error =>  {
            messageCloseSwal();
            messageErrorSwal(error);
        });
    }

    return (
        <tr>
            <td>{grupo.nombre}</td>
            <td>{grupo.descripcion}</td>
            <td>
                <div className="row">
                    <div className="col-3" onClick={ handleSetGrupoActive }><FontAwesomeIcon icon={faPenAlt}/></div>
                    <div className="col-3" onClick={ handleDeleteGrupo }><FontAwesomeIcon icon={faTrash}/></div>
                </div>
            </td>
        </tr>
    )
}

GrupoTableRowForm.prototype = {
    grupo : PropTypes.object.isRequired,
    setGrupoActive: PropTypes.func.isRequired,
}
