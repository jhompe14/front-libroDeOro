import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faBackward } from '@fortawesome/free-solid-svg-icons';
import { useForm } from '../../../hooks/useForm';
import { StatusCodes } from 'http-status-codes';
import { commandFetch } from '../../../helpers/commandFetch';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { useHistory } from "react-router-dom";
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageSuccessSwalWithFunction } from '../../../util/messages';
import { 
    TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION,
    TYPE_ESTADO_ANECDOTA_APROBADO,
    TYPE_ESTADO_ANECDOTA_RECHAZADO,
    TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION,
    TYPE_VISUALIZACION_PUBLICO,
    TYPE_VISUALIZACION_PRIVADO,
    HOST_URL_BACK,
    API_ANECDOTA,
    METHOD_PUT
} from '../../../util/constant';

export const AnecdotaViewGestion = ({ anecdota }) => {

    const [formValues, handleInputChange] = useForm({
        estado: anecdota.estado,
        usuarioModificacion: undefined,
        visualizacion: anecdota.visualizacion,
    });
    const { authReducer:{token} } = useSelector( state => state);
    const dispatch = useDispatch();
    const history= useHistory();
    
    const getSelectedVisualizacion = (visualizacionId) =>  formValues && formValues.visualizacion === visualizacionId ? 'selected': '';

    const handleEstadoAnecdota = () => {
        messageLoadingSwal();        
        commandFetch(`${HOST_URL_BACK}${API_ANECDOTA}/estado/${anecdota.id}`, METHOD_PUT, formValues, token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("El estado de la anecdota ha sido modificado con exito.", 
                    () => {
                        history.replace(`/anecdota-listado`);
                    });                    
                })                
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }


    return (
        <div>
            <h1>Gestion Anecdota</h1>
            <hr/>
            <div className="row m-15 justify-content-center align-items-center">
                <div className="col-sm-6 col-md-4 col-md-offset-4">
                    <div className="form-group row">
                        <label>Estado Actual: {anecdota.descripcionEstado}</label>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label>Estado Anecdota</label> 
                        <select                            
                            name="estado"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione un estado</option>
                            {
                                anecdota.estado != TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION &&
                                    <option value={TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION}>Pendiente de aprobaci&oacute;n</option>
                            }

                            {
                                anecdota.estado != TYPE_ESTADO_ANECDOTA_APROBADO &&
                                    <option value={TYPE_ESTADO_ANECDOTA_APROBADO}>Aprobada</option>
                            }

                            {
                                anecdota.estado != TYPE_ESTADO_ANECDOTA_RECHAZADO &&
                                    <option value={TYPE_ESTADO_ANECDOTA_RECHAZADO}>Rechazada</option>
                            }
                            
                            {
                                anecdota.estado != TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION &&
                                    <option value={TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION}>Pendiente de modificaci&oacute;n</option>
                            }      
                        </select>
                                           
                    </div> 


                    {
                        formValues.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION &&
                            <div className="form-group row">
                                <label>Usuario</label> 
                                <input 
                                    type="text" 
                                    name="usuarioModificacion" 
                                    className="form-control"
                                    value={formValues.usuarioModificacion}
                                    onChange={handleInputChange}/>
                            </div>
                    }                     
                    
                    <hr/>

                    <div className="form-group row">
                        <label>Visualizaci&oacute;n</label> 
                        <select                            
                            name="visualizacion"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione una visualizaci&oacute;n</option>
                            <option 
                                value={TYPE_VISUALIZACION_PUBLICO}
                                selected={getSelectedVisualizacion(TYPE_VISUALIZACION_PUBLICO)}>
                                    P&uacute;blico
                            </option>
                            <option 
                                value={TYPE_VISUALIZACION_PRIVADO}
                                selected={getSelectedVisualizacion(TYPE_VISUALIZACION_PRIVADO)}>
                                    Privado
                            </option>
                        </select>
                    </div>

                    <div className="form-group row">                        
                        <button onClick="" className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Volver </button>
                        &nbsp;&nbsp;&nbsp;                        
                        <button onClick={handleEstadoAnecdota} className="btn btn-primary"><FontAwesomeIcon icon={faTasks} />&nbsp;&nbsp;Actualizar </button>
                    </div> 
                </div>
            </div>
        </div>
    )
}
