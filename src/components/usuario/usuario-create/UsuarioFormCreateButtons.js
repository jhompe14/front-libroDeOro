import React from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { StatusCodes } from 'http-status-codes';
import { HOST_URL_BACK, 
    API_USUARIOS, 
    METHOD_POST } from '../../../util/constant';
import { messageLoadingSwal, 
        messageCloseSwal, 
        messageSuccessSwalWithFunction } from '../../../util/messages';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { commandFetch } from '../../../helpers/commandFetch';

export const UsuarioFormCreateButtons = ({formValues}) => {

    const history= useHistory();
    const dispatch = useDispatch();
    const goLogin = () => history.replace("/auth/login");

    const handleFinalizarUsuario = () =>{
        messageLoadingSwal();  
        
        commandFetch(`${HOST_URL_BACK}${API_USUARIOS}`, METHOD_POST, formValues)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Usuario creado con exito, intente ingresar desde la pantalla login.", () => {
                        history.replace(`/auth/login`);
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
            <button onClick={goLogin} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/> Login</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleFinalizarUsuario} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>
        </div>
    )
}
