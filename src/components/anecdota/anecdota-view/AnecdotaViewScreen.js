import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AnecdotaView } from './AnecdotaView';
import { useParams } from 'react-router-dom';
import { queryFetch } from '../../../helpers/queryFetch';
import { messageLoadingSwal, messageCloseSwal } from '../../../util/messages';
import { HOST_URL_BACK, API_ANECDOTA, TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION, TYPE_ESTADO_ANECDOTA_APROBADO } from '../../../util/constant';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faTasks } from '@fortawesome/free-solid-svg-icons';
import { TYPE_USUARIO_ADMINISTRADOR } from '../../../util/constant';
import { AnecdotaViewGestion } from './AnecdotaViewGestion';

export const AnecdotaViewScreen = () => {

    const { idAnecdota, from }= useParams();
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const[anecdota, setAnecdota] = useState({});
    const[enlaces, setEnlaces] = useState();
    const[wizard, setWizard] = useState(1);

    const history= useHistory();
    const goListadoAnecdotas = () => history.replace("/anecdota/listado");
    const goLibroOroAnecdotas = () => history.replace("/anecdota/libro")

    useEffect(() => {
        loadAnecdota();
        loadEnlacesAnecdota();     
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

    const loadEnlacesAnecdota = async() => {
        await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}/enlace/${idAnecdota}`, authReducer?.token)
            .then(data =>{
                if(data != null && data != undefined ){                    
                    setEnlaces(data); 
                }          
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    return (
        <div className="content mt-2">
            {
                wizard===1 && anecdota != undefined && enlaces != null &&
                    <>
                        <div className="row">
                            <div className="col-6">
                                <h1>
                                    {
                                        anecdota.nombre != undefined && anecdota.nombre != null && anecdota.nombre != "" && 
                                            anecdota.nombre
                                    }
                                    {
                                        anecdota.nombre == undefined || anecdota.nombre == null || anecdota.nombre == "" && 
                                            "An\u00E9cdota"
                                    }
                                </h1>
                            </div>
                            <div className="col-6 d-flex">
                                <div className="ml-auto">
                                    {
                                        from === "listado" &&
                                            <button onClick={goListadoAnecdotas} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;An&eacute;cdotas</button>
                                    }

                                    {
                                        from === "libro" &&
                                            <button onClick={goLibroOroAnecdotas} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Libro de oro</button>
                                    }

                                    &nbsp;&nbsp;&nbsp;
                                    {
                                        authReducer?.tipoUsuario == TYPE_USUARIO_ADMINISTRADOR && 
                                            (anecdota.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION || anecdota.estado == TYPE_ESTADO_ANECDOTA_APROBADO) &&
                                            <button className="btn btn-primary" onClick={() => setWizard(2)}><FontAwesomeIcon icon={faTasks}/>&nbsp;&nbsp;Gestionar</button>
                                    }
                                </div>                    
                            </div>                     
                        </div>
                        <hr/> 

                        <AnecdotaView anecdota={anecdota} authReducer={authReducer} enlaces={enlaces} />
                    </> 
            }

            {
                wizard===2 && anecdota != undefined &&
                    <AnecdotaViewGestion anecdota={anecdota} setWizard={setWizard} />
            }
            
        </div>
    )
}
