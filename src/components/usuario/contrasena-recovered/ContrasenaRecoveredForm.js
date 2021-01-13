import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { StatusCodes } from 'http-status-codes';
import { commandFetch } from '../../../helpers/commandFetch';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageSuccessSwalWithFunction } from '../../../util/messages';
import { API_USUARIOS, 
    HOST_URL_BACK,
    METHOD_PUT, 
    TYPE_CHANGE_CONTRASENA_RECOVERED} from '../../../util/constant';

export const ContrasenaRecoveredForm = ({usuario}) => {

    const dispatch = useDispatch();
    const [formValues, handleInputChange] = useForm();
    const history= useHistory();
    
    const handleUpdateContrasena = () => {
        const objSendContrasena ={
            ...formValues,
            typeChangeContrasena: TYPE_CHANGE_CONTRASENA_RECOVERED,
        };

        messageLoadingSwal();        
        commandFetch(`${HOST_URL_BACK}${API_USUARIOS}/recovered/contrasena/${usuario}`, METHOD_PUT, objSendContrasena)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                messageCloseSwal();
                messageSuccessSwalWithFunction("La contrase\u00F1a ha sido modificada con \u00E9xito.", 
                () => {
                    history.replace(`/auth/login`);
                });               
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    return (
        <div className="row m-15 justify-content-center align-items-center">
            <div className="col-sm-6 col-md-4 col-md-offset-4">               
                <div className="form-group row">
                    <label>Nueva Contrase&ntilde;a</label> 
                    <input 
                        type="password" 
                        name="newContrasena" 
                        className="form-control"
                        value={formValues.newContrasena} 
                        onChange={handleInputChange}/>
                </div>
                <div className="form-group row">
                    <label>Confirmar Contrase&ntilde;a</label> 
                    <input 
                        type="password" 
                        name="confirmContrasena" 
                        className="form-control"
                        value= {formValues.confirmContrasena} 
                        onChange={handleInputChange}/>
                </div>
                <div className="form-group row">
                    <button onClick={handleUpdateContrasena} className="btn btn-lg btn-primary btn-block"><FontAwesomeIcon icon={faPenAlt}/>&nbsp;&nbsp;Actualizar </button>
                </div>
            </div>            
        </div>
    )
}
