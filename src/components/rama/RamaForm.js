import React, { useEffect } from 'react';
import { commandFetch } from '../../helpers/commandFetch';
import { useForm } from '../../hooks/useForm'
import { HOST_URL_BACK, METHOD_POST, METHOD_PUT, API_RAMAS } from '../../util/constant';
import { StatusCodes } from 'http-status-codes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingRamas } from '../../actions/ramaAction';
import { messageLoadingSwal, 
        messageCloseSwal,
        messageSuccessSwal } from '../../util/messages';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';

export const RamaForm = ({ ramaActive, setRamaActive, initialRama }) => {
   
    const dispatch = useDispatch();
    const { grupoReducer:{grupos}, authReducer } = useSelector( state => state);
    const [formValues, handleInputChange, handleObjectChange, reset] = useForm(initialRama);

    useEffect(() => {
        if(ramaActive.id){
            handleObjectChange(ramaActive);
        }
    }, [ramaActive]);

    const handleSubmit = () =>{
        messageLoadingSwal();
        if(formValues.id === 0){
            createRama();
        } else {
            updateRama(formValues.id);
        }    
    }

    const createRama = () => {
        commandFetch(`${HOST_URL_BACK}${API_RAMAS}/grupo/${formValues.idGrupo}`, METHOD_POST, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwal("Rama creada con exito");
                    dispatch(startLoadingRamas(authReducer));
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

    const updateRama = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_RAMAS}/${id}`, METHOD_PUT, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwal("Rama actualizada con exito");
                    dispatch(startLoadingRamas(authReducer));
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
        setRamaActive(initialRama);
        reset(initialRama);
    }

    const getSelectedGrupo = (grupoId) =>  formValues && formValues.idGrupo === grupoId ? 'selected': '';

    
    return (
        <>
            <div className="form-group row">
                <div className="col-6">
                    <div>
                        <label>Grupo</label>
                        <select                            
                            name="idGrupo"  
                            className="form-control"
                            onChange={handleInputChange}>
                            { (<option value="0" selected={getSelectedGrupo(0)}>Seleccione un grupo</option>) }
                            {
                                                                
                                grupos && grupos.map(grupo => 
                                                        <option key={grupo.id} 
                                                                value={grupo.id} 
                                                                selected={getSelectedGrupo(grupo.id)}>
                                                            {grupo.nombre}
                                                        </option>)
                            }        
                        </select>  
                    </div>                    
                    <div  className="mt-2">               
                        <label>Nombre</label> 
                        <input 
                            type="text" 
                            name="nombre" 
                            className="form-control"
                            value= {formValues.nombre} 
                            onChange={handleInputChange}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-3">
                            <label>Edad Minima</label> 
                            <input 
                                type="number" 
                                name="edadMinima" 
                                className="form-control"
                                value= {formValues.edadMinima} 
                                onChange={handleInputChange}/>
                        </div>
                        <div className="col-3">
                            <label>Edad Maxima</label> 
                            <input 
                                type="number" 
                                name="edadMaxima" 
                                className="form-control"
                                value= {formValues.edadMaxima} 
                                onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="mt-2">
                        <label>Descripcion</label>  
                        <textarea 
                            name="descripcion" 
                            className="form-control" 
                            value={formValues.descripcion}
                            onChange={handleInputChange}/>
                    </div>
                </div>                          
            </div>
            <div className="row mt-2">
                &nbsp;&nbsp;&nbsp;
                <button onClick={handleClean} className="btn btn-primary"><FontAwesomeIcon icon={faHandSparkles}/> Limpiar</button>
                &nbsp;&nbsp;
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>
            </div>            
        </>
    )
}
