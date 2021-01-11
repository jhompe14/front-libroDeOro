import React from 'react';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPlus } from '@fortawesome/free-solid-svg-icons';

export const AnecdotaLibroRow = ({arrayAnecdotas}) => {

    const history= useHistory();
    const handleGoAnecdotaView = (idAnecdota) => history.replace(`/anecdota/view/${idAnecdota}/from/libro`);

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
                                                <div title="Solicitar Modificaci&oacute;n"><FontAwesomeIcon icon={faEnvelope}/></div>
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
