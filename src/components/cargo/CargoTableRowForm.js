import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDropById } from '../../util/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { commandFetch } from '../../helpers/commandFetch';
import { StatusCodes } from 'http-status-codes';
import { HOST_URL_BACK, 
    API_CARGOS, 
    METHOD_DELETE } from '../../util/constant';
import { messageLoadingSwal,
        messageCloseSwal, 
        messageSuccessSwal,
        messageConfirmSwal } from '../../util/messages';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';


export const CargoTableRowForm = ({ cargo, setCargos, setCargoActive }) => {
    
    const dispatch = useDispatch();
    const { authReducer } = useSelector( state => state);

    const handleSetCargoActive = () => {
        setCargoActive(cargo);
    };

    const handleDeleteGrupo = () => {
        messageConfirmSwal("¿Esta seguro?", `Quiere eliminar el cargo ${cargo.nombre}`, () =>{
            messageLoadingSwal();
            commandFetch(`${HOST_URL_BACK}${API_CARGOS}/${cargo.id}`, METHOD_DELETE, undefined, authReducer?.token)
            .then(response => {
                if(response.status === StatusCodes.ACCEPTED){
                    setCargos(cargos => filterDropById(cargos, cargo.id));
                    messageCloseSwal();
                    messageSuccessSwal("Cargo eliminado con exito");                              
                } else {
                    controlErrorFetch(response, dispatch);                
                }
            })
            .catch(error =>  {
                controlErrorFetch(error, dispatch);
            });
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
