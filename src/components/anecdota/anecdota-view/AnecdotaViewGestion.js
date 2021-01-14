import React, {useState, useEffect} from 'react';
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

export const AnecdotaViewGestion = ({ anecdota, setWizard }) => {

    const { authReducer:{usuario, token} } = useSelector( state => state);
    const dispatch = useDispatch();
    const history= useHistory();
    const [formValues, handleInputChange] = useForm({
        estado: "",
        usuarioModificacion: "",
        visualizacion: anecdota.visualizacion,
    });

    useEffect(() => {
        validEstadoActual();
    }, []);
    
    const[validAprobado, setValidAprobado] = useState(false);
    const[validPendienteModificacion, setValidPendienteModificacion] = useState(false);
    const[validRechazado, setValidRechazado] = useState(false);
    
    const validEstadoActual = () => {
        if(anecdota.estado != TYPE_ESTADO_ANECDOTA_APROBADO && 
            anecdota.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION) {
                setValidAprobado(true);
        }

        if(anecdota.estado != TYPE_ESTADO_ANECDOTA_RECHAZADO && 
            anecdota.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION) {
                setValidRechazado(true);
        }

        if(anecdota.estado != TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION &&
            anecdota.estado == TYPE_ESTADO_ANECDOTA_APROBADO){
                setValidPendienteModificacion(true);
        }
    }

    const handleEstadoAnecdota = () => {
        const objSendEstadoVisualizacion ={
            ...formValues,
            usuario: usuario,
        };

        messageLoadingSwal();        
        commandFetch(`${HOST_URL_BACK}${API_ANECDOTA}/estado/visualizacion/${anecdota.id}`, METHOD_PUT, objSendEstadoVisualizacion, token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("El estado de la an\u00E9cdota ha sido modificado con \u00E9xito.", 
                    () => {
                        history.replace(`/anecdota/listado`);
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

    const goAnecdotaView = () => setWizard(1);
    const getSelectedVisualizacion = (visualizacionId) =>  formValues && formValues.visualizacion === visualizacionId ? 'selected': '';

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Gesti&oacute;n An&eacute;cdota</h1>
            <hr/>
            <div className="row m-15 justify-content-center align-items-center">
                <div className="col-sm-6 col-md-4 col-md-offset-4">
                    <div className="form-group row">
                        <label>Estado Actual: {anecdota.descripcionEstado}</label>
                    </div>

                    <hr/>

                    <div className="form-group row">
                        <label>Estado An&eacute;cdota</label> 
                        <select                            
                            name="estado"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione un estado</option>
                            
                            {
                                validAprobado &&
                                    <option value={TYPE_ESTADO_ANECDOTA_APROBADO}>Aprobada</option>
                            }

                            {
                                validRechazado &&
                                    <option value={TYPE_ESTADO_ANECDOTA_RECHAZADO}>Rechazado</option>
                            }
                            
                            {
                                validPendienteModificacion &&
                                    <option value={TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION}>Pendiente modificaci&oacute;n</option>
                            }      
                        </select>
                                           
                    </div> 


                    {
                        formValues.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION &&
                            <div className="form-group row">
                                <label>Usuario a modificar</label> 
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
                        <button onClick={goAnecdotaView} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Volver </button>
                        &nbsp;&nbsp;&nbsp;                        
                        <button onClick={handleEstadoAnecdota} className="btn btn-primary"><FontAwesomeIcon icon={faTasks} />&nbsp;&nbsp;Actualizar </button>
                    </div> 
                </div>
            </div>
        </div>
    )
}
