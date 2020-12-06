import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AnecdotaView } from './AnecdotaView';
import { useParams } from 'react-router-dom';
import { queryFetch } from '../../../helpers/queryFetch';
import { messageLoadingSwal, messageCloseSwal } from '../../../util/messages';
import { HOST_URL_BACK, API_ANECDOTA } from '../../../util/constant';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faTasks } from '@fortawesome/free-solid-svg-icons';
import { TYPE_USUARIO_ADMINISTRADOR } from '../../../util/constant';
import { AnecdotaViewGestion } from './AnecdotaViewGestion';

export const AnecdotaViewScreen = () => {

    const { idAnecdota }= useParams();
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const[anecdota, setAnecdota] = useState({});
    const[wizard, setWizard] = useState(1);

    const history= useHistory();
    const goListadoAnecdotas = () => history.replace("/anecdota-listado");

    useEffect(() => {
        loadAnecdota();     
    }, []);

    const loadAnecdota = async() => {
        messageLoadingSwal();
        await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}/${idAnecdota}`, authReducer?.token)
            .then(data =>{
                messageCloseSwal();
                if(data != null && data != undefined ){
                    setAnecdota(data);
                }          
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    return (
        <div className="content animate__animated animate__slideInLeft">
            {
                wizard===1 && anecdota != undefined &&
                    <>
                        <div className="row">
                            <div className="col-6">
                                <h1>Anecdota</h1>
                            </div>
                            <div className="col-6 d-flex">
                                <div className="ml-auto">
                                    <button onClick={goListadoAnecdotas} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Anecdotas</button>&nbsp;&nbsp;&nbsp;
                                    {
                                        authReducer?.tipoUsuario == TYPE_USUARIO_ADMINISTRADOR && 
                                            <button className="btn btn-primary" onClick={() => setWizard(2)}><FontAwesomeIcon icon={faTasks}/>&nbsp;&nbsp;Gestionar</button>
                                    }
                                </div>                    
                            </div>                     
                        </div>
                        <hr/>            
                        <AnecdotaView anecdota={anecdota} authReducer={authReducer} />
                    </> 
            }

            {
                wizard===2 && anecdota != undefined &&
                    <AnecdotaViewGestion anecdota={anecdota} />
            }
            
        </div>
    )
}
