import React from 'react';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';
import { filterDropById } from '../../util/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { commandFetch } from '../../helpers/CommandFetch';
import { StatusCodes } from 'http-status-codes';
import { HOST_URL_BACK, 
    API_CARGOS, 
    METHOD_DELETE } from '../../util/constant';


export const CargoTableRowForm = ({ cargo, setCargos, setCargoActive }) => {
    
    const handleSetCargoActive = () => {
        setCargoActive(cargo);
    };

    const handleDeleteGrupo = () => {
        messageLoadingSwal();
        commandFetch(`${HOST_URL_BACK}${API_CARGOS}/${cargo.id}`, METHOD_DELETE)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                setCargos(cargos => filterDropById(cargos, cargo.id));
                messageCloseSwal();
                messageSuccessSwal("Cargo eliminado con exito");                              
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
            <td>{cargo.nombre}</td>
            <td>{cargo.descripcion}</td>
            <td>
                <div className="row">
                    <div className="col-2" onClick={ handleSetCargoActive } title="Editar"><FontAwesomeIcon icon={faPenAlt}/></div>
                    <div className="col-2" onClick={ handleDeleteGrupo } title="Eliminar"><FontAwesomeIcon icon={faTrash}/></div>
                </div>
            </td>
        </tr>
    )
}
