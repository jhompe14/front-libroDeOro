import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { commandFetch } from '../../helpers/commandFetch';
import { StatusCodes } from 'http-status-codes';
import { filterDropById } from '../../util/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingRamas } from '../../actions/ramaAction';
import { HOST_URL_BACK, 
        API_RAMAS, 
        METHOD_DELETE,
        TYPE_CARGO_RAMA } from '../../util/constant';
import { messageLoadingSwal,
        messageCloseSwal, 
        messageSuccessSwal,
        messageConfirmSwal } from '../../util/messages';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';

export const RamaTableRowForm = ({ rama, setRamas, setRamaActive }) => {
    
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const history= useHistory();

    const handleSetRamaActive = () => {
        setRamaActive(rama);
    };

    const handleDeleteRama = () => {
        messageConfirmSwal(`Quiere eliminar la rama ${rama.nombre}`, () =>{
            messageLoadingSwal();
            commandFetch(`${HOST_URL_BACK}${API_RAMAS}/${rama.id}`, METHOD_DELETE, undefined, authReducer?.token)
            .then(response => {
                if(response.status === StatusCodes.ACCEPTED){
                    setRamas(ramas => filterDropById(ramas, rama.id));
                    messageCloseSwal();
                    messageSuccessSwal("Rama eliminada con exito");
                    dispatch(startLoadingRamas(authReducer));                              
                } else {
                    controlErrorFetch(response, dispatch);               
                }
            })
            .catch(error =>  {
                controlErrorFetch(error, dispatch);
            });
        });
    }

    const handleGoCargos = () => {       
        history.replace(`/cargo/type/${TYPE_CARGO_RAMA}/id/${rama.id}`);   
    }
    
    return (
        <tr>
            <td>{rama.nombreGrupo}</td>
            <td>{rama.nombre}</td>
            <td>{rama.edadMinima}</td>
            <td>{rama.edadMaxima}</td>
            <td>{rama.descripcion}</td>
            <td>
                <div className="row">
                    <div className="col-2" onClick={ handleSetRamaActive } title="Editar"><FontAwesomeIcon icon={faPenAlt}/></div>
                    <div className="col-2" onClick={ handleDeleteRama } title="Eliminar"><FontAwesomeIcon icon={faTrash}/></div>
                    <div className="col-2" onClick={ handleGoCargos } title="Ver cargos"><FontAwesomeIcon icon={faTruckLoading}/></div>
                </div>
            </td>
        </tr>
    )
}

RamaTableRowForm.prototype = {
    rama : PropTypes.object.isRequired,
    setRamas: PropTypes.func.isRequired,
    setRamaActive: PropTypes.func.isRequired,
}
