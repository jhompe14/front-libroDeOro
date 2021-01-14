import React, { useEffect, useState } from 'react';
import { commandFetch } from '../../helpers/commandFetch';
import { useForm } from '../../hooks/useForm';
import { HOST_URL_BACK, METHOD_POST, METHOD_PUT, API_SECCIONES } from '../../util/constant';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageSuccessSwal } from '../../util/messages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingSecciones } from '../../actions/seccionAction';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { filterRamasByGrupo } from '../../util/selectors';

export const SeccionForm = ({ seccionActive, setSeccionActive, initialSeccion}) => {

    const dispatch = useDispatch();
    const { grupoReducer:{grupos}, ramaReducer:{ramas}, authReducer } = useSelector( state => state);  
    const [ramasFilter, setRamasFilter] = useState([]);
    const [formValues, handleInputChange, handleObjectChange, reset] = useForm(initialSeccion);
    const [disabledForm, setDisabledForm] = useState(false); 
    
    useEffect(() => {
        setRamasFilter(filterRamasByGrupo(ramas, formValues.idGrupo));
    }, [formValues.idGrupo])
       
    useEffect(() => {
        if(seccionActive.id){ 
            handleObjectChange(seccionActive);
            setDisabledForm(true);
        }
    }, [seccionActive]);

    const handleSubmit = () =>{
        messageLoadingSwal();
        if(formValues.id === 0){
            createSeccion();
        } else {
            updateSeccion(formValues.id);
        }    
    }

    const createSeccion = () => {
        commandFetch(`${HOST_URL_BACK}${API_SECCIONES}/rama/${formValues.idRama}`, METHOD_POST, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {                  
                    messageCloseSwal();
                    messageSuccessSwal("Secci\u00F3n creada con \u00E9xito");
                    dispatch(startLoadingSecciones());
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

    const updateSeccion = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_SECCIONES}/${id}`, METHOD_PUT, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(() => {                   
                    messageCloseSwal();
                    messageSuccessSwal("Secci\u00F3n actualizada con \u00E9xito");
                    dispatch(startLoadingSecciones());
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
        setSeccionActive(initialSeccion);
        reset(initialSeccion);
        setDisabledForm(false);
    }

    const getSelectedGrupo = (grupoId) =>  formValues && formValues.idGrupo === grupoId ? 'selected': '';
    const getSelectedRama = (ramaId) =>  formValues && formValues.idRama === ramaId ? 'selected': '';


    return (
        <>
            <div className="form-group row">
                <div className="col-6">
                    <div>
                        <label>Grupo</label>
                        <select
                            name="idGrupo"  
                            className="form-control"
                            onChange={handleInputChange}
                            disabled={disabledForm}>
                            <option value="0" selected={getSelectedGrupo(0)}>Seleccione un grupo</option>
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
                        <label>Rama</label>
                        <select                            
                            name="idRama"  
                            className="form-control"
                            onChange={handleInputChange}
                            disabled={disabledForm}>
                            <option value="0" selected={getSelectedRama(0)}>Seleccione una rama</option>
                            {                                
                                ramasFilter && ramasFilter.map(rama => 
                                                        <option key={rama.id} 
                                                                value={rama.id} 
                                                                selected={getSelectedRama(rama.id)}>
                                                            {rama.nombre}
                                                        </option>)
                            }        
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div>
                        <label>Nombre</label> 
                        <input 
                            type="text" 
                            name="nombre" 
                            className="form-control"
                            value= {formValues.nombre} 
                            onChange={handleInputChange}/>
                    </div>
                    <div className="mt-2">
                        <label>Descripci&oacute;n</label>  
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
                <button onClick={handleClean} className="btn btn-primary"><FontAwesomeIcon icon={faHandSparkles}/>&nbsp;&nbsp;Limpiar</button>
                &nbsp;&nbsp;
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/>&nbsp;&nbsp;Guardar</button>
            </div>            
        </>
    )
}
