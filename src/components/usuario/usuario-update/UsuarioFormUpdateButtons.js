import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';
import { StatusCodes } from 'http-status-codes';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { commandFetch } from '../../../helpers/commandFetch';
import { useDispatch } from 'react-redux';
import { messageLoadingSwal, 
    messageCloseSwal } from '../../../util/messages';
import { HOST_URL_BACK, 
        API_USUARIOS, 
        METHOD_POST } from '../../../util/constant';
       
export const UsuarioFormUpdateButtons = ({setWizard, setUsuario, formValues, authReducer}) => {

    const dispatch = useDispatch();

    const changeWizard = () => {
        messageLoadingSwal();

        commandFetch(`${HOST_URL_BACK}${API_USUARIOS}/validate`, METHOD_POST, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.OK){
                response.json().then((data) => {
                    messageCloseSwal();
                    if(data.valid){
                        setWizard(2);
                        setUsuario({
                            ...formValues
                        });
                    }                
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
          <button onClick={changeWizard} className="btn btn-primary">Siguiente&nbsp;&nbsp;<FontAwesomeIcon icon={faForward}/></button>  
        </div>
    )
}
