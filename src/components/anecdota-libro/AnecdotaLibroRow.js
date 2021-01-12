import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';
import { commandFetch } from '../../helpers/commandFetch';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { StatusCodes } from 'http-status-codes';
import { HOST_URL_BACK, 
    API_ANECDOTA, 
    METHOD_POST} from '../../util/constant';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageConfirmSwal, 
    messageSuccessSwal } from '../../util/messages';

export const AnecdotaLibroRow = ({arrayAnecdotas}) => {

    const history= useHistory();
    const dispatch = useDispatch();
    const { authReducer:{ usuario, token } } = useSelector( state => state);

    const handleGoAnecdotaView = (idAnecdota) => history.replace(`/anecdota/view/${idAnecdota}/from/libro`);
    const handleModificationRequest = (anecdota) =>{
        messageConfirmSwal("¿Esta seguro?", `De solicitar la modificacion de la anecdota <br><br>${anecdota.idAnecdota}
                                - ${anecdota.nombreSuceso != "" ? anecdota.nombreSuceso : "Anecdota"}`, () =>{            
            sendNotification(anecdota.idAnecdota);
        });
    }

    const sendNotification = (idAnecdota) => {
        messageLoadingSwal();
        const sendObject = {
            idAnecdota: idAnecdota,
            usuario: usuario,
        }
        commandFetch(`${HOST_URL_BACK}${API_ANECDOTA}/notification/estado`, METHOD_POST, sendObject, token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                messageCloseSwal();
                messageSuccessSwal("La solicitud ha sido enviada correctamente al administrador, espere la respuesta en los proximos dias.");        
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    return (
        <>
            <div className="row">
                {
                    arrayAnecdotas.map((anecdota, index) => 
                        <div key={ index+"-anecdota-card" } className="col-sm-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-10">
                                            {
                                                anecdota.nombreSuceso != "" ? anecdota.nombreSuceso : "Anecdota"
                                            }
                                            <footer className="blockquote-footer">Codigo Anecdota: {anecdota.idAnecdota}</footer>
                                        </div>
                                        <div className="col-2">
                                            <div className="row">
                                                <div onClick = {() => handleModificationRequest(anecdota)} title="Solicitar Modificaci&oacute;n"><FontAwesomeIcon icon={faEnvelope}/></div>
                                                &nbsp;&nbsp;&nbsp;
                                                <div onClick={() => handleGoAnecdotaView(anecdota.idAnecdota)} title="Ver Anecdota"><FontAwesomeIcon icon={faPlus}/></div>
                                            </div>
                                        </div>
                                    </div>                                   
                                </div>
                                <div className="card-body" style={{height: "20.3em"}}>                                    
                                    <div className="h-75 text-justify text-truncate" style={{whiteSpace: "pre-line"}}>
                                        {anecdota.descripcionSuceso}
                                    </div>
                                    <br></br>
                                    <footer className="blockquote-footer">
                                        {anecdota.nombreUsuario} ({anecdota.usuario}) 
                                        {
                                        anecdota.fechaSuceso != "" &&
                                        <cite title="Source Title"> - {anecdota.fechaSuceso}</cite>  
                                        } 
                                    </footer>

                                </div>
                            </div>
                        </div>
                    )
                } 
            </div>
            <br></br>
        </>
         
    )
}
