import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { commandFetch } from '../../helpers/CommandFetch';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';
import { filterDropById } from '../../util/selectors';
import { HOST_URL_BACK, 
        API_GRUPOS, 
        METHOD_DELETE,
        TYPE_CARGO_GRUPO } from '../../util/constant';

export const GrupoTableRowForm = ({grupo, setGrupos, setGrupoActive}) => {

    const history= useHistory();

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

    const handleGoCargos = () => {       
        history.replace(`/cargo/type/${TYPE_CARGO_GRUPO}/id/${grupo.id}`);   
    }


    return (
        <tr>
            <td>{grupo.nombre}</td>
            <td>{grupo.descripcion}</td>
            <td>
                <div className="row">
                    <div className="col-2" onClick={ handleSetGrupoActive } title="Editar"><FontAwesomeIcon icon={faPenAlt}/></div>
                    <div className="col-2" onClick={ handleDeleteGrupo } title="Eliminar"><FontAwesomeIcon icon={faTrash}/></div>
                    <div className="col-2" onClick={ handleGoCargos } title="Ver cargos"><FontAwesomeIcon icon={faTruckLoading}/></div>
                </div>
            </td>
        </tr>
    )
}

GrupoTableRowForm.prototype = {
    grupo : PropTypes.object.isRequired,
    setGrupoActive: PropTypes.func.isRequired,
}
