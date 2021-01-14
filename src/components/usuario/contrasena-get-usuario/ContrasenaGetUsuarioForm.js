import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { StatusCodes } from 'http-status-codes';
import { commandFetch } from '../../../helpers/commandFetch';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageSuccessSwalWithFunction } from '../../../util/messages';
import { API_USUARIOS, 
    HOST_URL_BACK,
    METHOD_POST } from '../../../util/constant';

export const ContrasenaGetUsuarioForm = () => {

    const history= useHistory();
    const dispatch = useDispatch();
    const [formValues, handleInputChange] = useForm();

    const handleRecoverContrasena = () => {
        messageLoadingSwal();        
        commandFetch(`${HOST_URL_BACK}${API_USUARIOS}/recovered/contrasena/${formValues.usuario}`, METHOD_POST)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                messageCloseSwal();
                messageSuccessSwalWithFunction("La petici\u00F3n de recuperar contrase\u00F1a se ha realizado con \u00E9xito. " 
                                                  +  "Revise por favor su correo", 
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
        <div className="row m-5 justify-content-center align-items-center">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
                <div className="form-group row">
                    <label>Digite su usuario</label> 
                    <input 
                        type="text" 
                        name="usuario" 
                        className="form-control"
                        value={formValues.usuario} 
                        onChange={handleInputChange}/>
                </div>                
                <div className="form-group row">
                    <button onClick={handleRecoverContrasena} className="btn btn-lg btn-primary btn-block"><FontAwesomeIcon icon={faKey}/>&nbsp;&nbsp;Recuperar </button>
                </div>
            </div>            
        </div>
    )
}
