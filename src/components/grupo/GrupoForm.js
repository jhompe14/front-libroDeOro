import React, { useEffect } from 'react'
import { commandFetch } from '../../helpers/commandFetch';
import { useForm } from '../../hooks/useForm'
import { HOST_URL_BACK, API_GRUPOS, METHOD_POST, METHOD_PUT } from '../../util/constant';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { startLoadingGrupos } from '../../actions/grupoAction';

export const GrupoForm = ({ grupoActive, setGrupoActive, initialGrupo }) => {

    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const [formValues, handleInputChange, handleObjectChange, reset] = useForm(initialGrupo);
    
    useEffect(() => {
        if(grupoActive.id){ 
            handleObjectChange(grupoActive);
        }
    }, [grupoActive]);

    const handleSubmit = () =>{
        messageLoadingSwal();
        if(formValues.id === 0){
            createGrupo();
        } else {
            updateGrupo(formValues.id);
        }    
    }

    const createGrupo = () => {
        commandFetch(`${HOST_URL_BACK}${API_GRUPOS}`, METHOD_POST, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {                  
                    messageCloseSwal();
                    messageSuccessSwal("Grupo creado con exito");
                    dispatch(startLoadingGrupos());
                    handleClean();
                })                
            } else {
                controlErrorFetch(response, dispatch);            
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    const updateGrupo = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_GRUPOS}/${id}`, METHOD_PUT, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(grupo => {                   
                    messageCloseSwal();
                    messageSuccessSwal("Grupo actualizado con exito");
                    dispatch(startLoadingGrupos());
                    handleClean();
                });                
            } else {
                controlErrorFetch(response, dispatch);              
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    const handleClean = () =>{
        setGrupoActive(initialGrupo);
        reset(initialGrupo);
    }

    return (
        <>
            <div className="form-group">
                
                <label>Nombre</label> 
                <input 
                    type="text" 
                    name="nombre" 
                    className="form-control"
                    value= {formValues.nombre} 
                    onChange={handleInputChange}/>  

                <label>Descripcion</label>  
                <textarea 
                    name="descripcion" 
                    className="form-control" 
                    value={formValues.descripcion}
                    onChange={handleInputChange}/>                           
            </div>
            <div className="mt-2">
                <button onClick={handleClean} className="btn btn-primary"><FontAwesomeIcon icon={faHandSparkles}/> Limpiar</button>
                &nbsp;&nbsp;
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>
            </div>
        </>
    )
}
