import React from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faTasks } from '@fortawesome/free-solid-svg-icons';
import { TYPE_USUARIO_ADMINISTRADOR } from '../../../util/constant';

export const AnecdotaView = ({ anecdota, authReducer }) => {

    const history= useHistory();
    const goListadoAnecdotas = () => history.replace("/anecdota-listado");

    return (
        <>
            <div className="form-group row">
                <div className="col-3">
                    <label><b>Grupo</b></label>
                    <p>{anecdota.nombreGrupo}</p>
                </div>
                <div className="col-3">
                    <label><b>Rama</b></label>
                    <p>{anecdota.nombreRama}</p>
                </div>
                <div className="col-3">
                    <label><b>Seccion</b></label>
                    <p>{anecdota.nombreSeccion}</p>
                </div>
                <div className="col-3">
                    <label><b>Estado</b></label>
                    <p>{anecdota.descripcionEstado}</p>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-3">
                    <label><b>Nombre</b></label>
                    <p>{anecdota.nombre}</p>
                </div>
                <div className="col-3">
                    <label><b>Fecha</b></label>
                    <p>{anecdota.fecha}</p>
                </div>
                <div className="col-3">
                    <label><b>Creada Por</b></label>
                    <p>{anecdota.usuario}</p>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-6">
                    <label><b>Descripcion</b></label>
                    <p>{anecdota.descripcion}</p>
                </div>
            </div>
            <div>
                <button onClick={goListadoAnecdotas} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Listado Anecdotas</button>
                &nbsp;&nbsp;&nbsp;
                {
                    authReducer?.tipoUsuario == TYPE_USUARIO_ADMINISTRADOR && 
                        <button className="btn btn-primary"><FontAwesomeIcon icon={faTasks}/>&nbsp;&nbsp;Gestionar</button>
                }
                
            </div>  
        </>
    )
}
