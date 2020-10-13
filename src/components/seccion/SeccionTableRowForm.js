import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { commandFetch } from '../../helpers/commandFetch';
import { StatusCodes } from 'http-status-codes';
import { filterDropById } from '../../util/selectors';
import { useDispatch } from 'react-redux';
import { startLoadingSecciones } from '../../actions/seccionAction';
import { HOST_URL_BACK, 
        API_SECCIONES, 
        METHOD_DELETE,
        TYPE_CARGO_SECCION } from '../../util/constant';
import { messageLoadingSwal, 
        messageCloseSwal, 
        messageErrorSwal, 
        messageSuccessSwal, 
        messageConfirmSwal } from '../../util/messages';


export const SeccionTableRowForm = ({ seccion, setSecciones, setSeccionActive }) => {
    
    const dispatch = useDispatch();
    const history= useHistory();

    const handleSetSeccionActive = () => {
        setSeccionActive(seccion);
    };

    const handleDeleteSeccion = () => {
        messageConfirmSwal(`Quiere eliminar la seccion ${seccion.nombre}`, () =>{
            messageLoadingSwal();
            commandFetch(`${HOST_URL_BACK}${API_SECCIONES}/${seccion.id}`, METHOD_DELETE)
            .then(response => {
                if(response.status === StatusCodes.ACCEPTED){
                    setSecciones(secciones => filterDropById(secciones, seccion.id));
                    messageCloseSwal();
                    messageSuccessSwal("Seccion eliminada con exito");
                    dispatch(startLoadingSecciones());                              
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
        });
    }

    const handleGoCargos = () => {       
        history.replace(`/cargo/type/${TYPE_CARGO_SECCION}/id/${seccion.id}`);   
    }
    
    
    return (
        <tr>
            <td>{seccion.nombreGrupo}</td>
            <td>{seccion.nombreRama}</td>
            <td>{seccion.nombre}</td>
            <td>{seccion.descripcion}</td>
            <td>
                <div className="row">
                    <div className="col-2" onClick={ handleSetSeccionActive } title="Editar"><FontAwesomeIcon icon={faPenAlt}/></div>
                    <div className="col-2" onClick={ handleDeleteSeccion } title="Eliminar"><FontAwesomeIcon icon={faTrash}/></div>
                    <div className="col-2" onClick={ handleGoCargos } title="Ver cargos"><FontAwesomeIcon icon={faTruckLoading}/></div>
                </div>
            </td>
        </tr>
    )
}

SeccionTableRowForm.prototype = {
    seccion : PropTypes.object.isRequired,
    setSecciones: PropTypes.func.isRequired,
    setSeccionActive: PropTypes.func.isRequired,
}
