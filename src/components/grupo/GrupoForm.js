import React from 'react'
import { commandFetch } from '../../helpers/CommandFetch';
import { useForm } from '../../hooks/useForm'
import { HOST_URL_BACK, API_GRUPOS, METHOD_POST } from '../../util/constant';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';

export const GrupoForm = ({ setGrupos }) => {

    const [formValues, handleInputChange, reset] = useForm({
        nombre: '',
        descripcion: ''
    });

    const {nombre, descripcion} = formValues;

    const handleSubmit = (e) =>{
        e.preventDefault();
        messageLoadingSwal();
        commandFetch(`${HOST_URL_BACK}${API_GRUPOS}`, METHOD_POST, formValues)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(grupo => {
                    setGrupos(grupos => [grupo, ...grupos]);
                    reset();
                    messageCloseSwal();
                    messageSuccessSwal("Grupo creado con exito");
                })                
            } else {
                response.text().then(msg => {
                    messageCloseSwal();
                    messageErrorSwal(msg);                                       
                });
                
            }
        })
        .catch(error => console.error(error));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                
                <label>Nombre</label> 
                <input 
                    type="text" 
                    name="nombre" 
                    className="form-control"
                    value= {nombre} 
                    onChange={handleInputChange}/>  

                <label>Descripcion</label>  
                <textarea 
                    name="descripcion" 
                    className="form-control" 
                    value={descripcion}
                    onChange={handleInputChange}/>                           
            </div>
            <div className="mt-2">
                <input type="submit" value="Guardar" className="btn btn-primary"/>
            </div>
        </form>
    )
}
