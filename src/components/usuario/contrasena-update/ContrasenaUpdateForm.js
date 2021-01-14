import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt } from '@fortawesome/free-solid-svg-icons';
import { StatusCodes } from 'http-status-codes';
import { commandFetch } from '../../../helpers/commandFetch';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { startLogoutUser } from '../../../actions/authAction';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageSuccessSwalWithFunction,
    messageConfirmSwal } from '../../../util/messages';
import { API_USUARIOS, 
    TYPE_CHANGE_CONTRASENA_MODIFICATION, 
    HOST_URL_BACK,
    METHOD_PUT } from '../../../util/constant';


export const ContrasenaUpdateForm = () => {

    const history= useHistory();
    const dispatch = useDispatch();
    const { authReducer:{usuario, token} } = useSelector( state => state);
    const [formValues, handleInputChange] = useForm();
    
    const handleUpdateContrasena = () => {
        messageConfirmSwal("¿Esta seguro?" , `Que desea cambiar su contrase\u00F1a?`, () =>{
            updateContrasena();
        });
    }

    const updateContrasena = () => {
        const objSendContrasena ={
            ...formValues,
            typeChangeContrasena: TYPE_CHANGE_CONTRASENA_MODIFICATION,
        };

        messageLoadingSwal();        
        commandFetch(`${HOST_URL_BACK}${API_USUARIOS}/contrasena/${usuario}`, METHOD_PUT, objSendContrasena, token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                messageCloseSwal();
                messageSuccessSwalWithFunction("La contrase\u00F1a ha sido modificada con \u00E9xito.", 
                () => {
                    dispatch(startLogoutUser());
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
                    <label>Contrase&ntilde;a Actual</label> 
                    <input 
                        type="password" 
                        name="actualContrasena" 
                        className="form-control"
                        value={formValues.actualContrasena} 
                        onChange={handleInputChange}/>
                </div>
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
