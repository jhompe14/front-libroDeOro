import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { ContrasenaRecoveredForm } from './ContrasenaRecoveredForm';
import { API_USUARIOS, HOST_URL_BACK} from '../../../util/constant';
import { useParams } from 'react-router-dom';
import { queryFetch } from "../../../helpers/queryFetch";
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageWarningFunction } from '../../../util/messages';

export const ContrasenaRecoveredScreen = () => {

    const { idRecovered }= useParams();
    const[usuario, setUsuario] = useState();
    const history= useHistory();

    useEffect(() => {
        getUsuarioRecovered();
    }, []);

    const getUsuarioRecovered = async() => {
      messageLoadingSwal();
      await queryFetch(`${HOST_URL_BACK}${API_USUARIOS}/recovered/contrasena/${idRecovered}`)            
            .then(data =>{
                messageCloseSwal();
                if(data != null && data != undefined ){
                    setUsuario(data.usuario)
                }            
            })
            .catch(err => {            
                err.text().then(msg => {
                    messageWarningFunction(msg, 
                    () => {
                        history.replace(`/auth/login`);
                    });                 
                });       
            });
    };

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Recuperar Contrase&ntilde;a</h1>
            <hr/>
            {
                usuario !=  undefined &&
                    <ContrasenaRecoveredForm usuario={usuario}/>
            }
            
        </div>
    )
}
