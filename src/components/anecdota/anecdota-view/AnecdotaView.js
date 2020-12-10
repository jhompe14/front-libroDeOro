import React from 'react';

export const AnecdotaView = ({ anecdota }) => {    

    return (
        <div className="content animate__animated animate__slideInLeft">
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
        </div>
    )
}
