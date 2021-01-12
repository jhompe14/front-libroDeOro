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
        messageSuccessSwalWithFunction, 
        messageConfirmSwal} from '../../../util/messages';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { commandFetch } from '../../../helpers/commandFetch';

export const UsuarioFormCreateButtons = ({formValues}) => {

    const history= useHistory();
    const dispatch = useDispatch();
    const goLogin = () => history.replace("/auth/login");

    const handleFinalizarUsuario = () =>{
        messageConfirmSwal("CUIDADO!", `Verifique que todos los campos diligenciados esten correctos, al correo 
                                            <b>${formValues.correo}</b> se enviaran todas las notificaciones de 
                                            cambio de estado de anecdotas y recuperacion de contraseña`, () => {
            createUsuario();
        });
    }

    const createUsuario = () => {
        messageLoadingSwal();  
        
        commandFetch(`${HOST_URL_BACK}${API_USUARIOS}`, METHOD_POST, formValues)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Usuario creado con exito, intente ingresar desde la pantalla login.", () => {
                        goLogin();
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
            <button onClick={goLogin} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Login</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleFinalizarUsuario} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/>&nbsp;&nbsp;Guardar</button>
        </div>
    )
}
