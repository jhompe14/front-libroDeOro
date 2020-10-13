import React, { useEffect, useState } from 'react';
import { commandFetch } from '../../helpers/commandFetch';
import { useForm } from '../../hooks/useForm'
import { HOST_URL_BACK, METHOD_POST, METHOD_PUT, API_SECCIONES } from '../../util/constant';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';
import { filterDropById, filterRamasByGrupo } from '../../util/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingSecciones } from '../../actions/seccionAction';

export const SeccionForm = ({setSecciones, seccionActive, setSeccionActive}) => {

    const dispatch = useDispatch();
    const grupos = useSelector( state => state)?.grupoReducer?.grupos;
    const ramas = useSelector(state => state)?.ramaReducer?.ramas;    
    const[ramasFilter, setRamasFilter] = useState([]);
    const [formValues, handleInputChange, handleObjectChange, reset] = useForm({
        id: 0,
        nombre: '',
        descripcion: '',
        idRama: 0,
        nombreRama: '',
        idGrupo: 0,
        nombreGrupo: ''
    });
    
    useEffect(() => {
        setRamasFilter(filterRamasByGrupo(ramas, formValues.idGrupo));
    }, [formValues.idGrupo])
       
    useEffect(() => {
        if(seccionActive.id){ 
            handleObjectChange(seccionActive);
        }
    }, [seccionActive]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        messageLoadingSwal();
        if(formValues.id === 0){
            createSeccion();
        } else {
            updateSeccion(formValues.id);
        }    
    }

    const createSeccion = () => {
        commandFetch(`${HOST_URL_BACK}${API_SECCIONES}/rama/${formValues.idRama}`, METHOD_POST, formValues)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(seccion => {
                    setSecciones(secciones => [seccion, ...secciones]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Seccion creada con exito");
                    dispatch(startLoadingSecciones());
                    handleClean();
                })                
            } else {
                response.text().then(msg => {
                    messageCloseSwal();
                    messageErrorSwal(msg);                                       
                });
                
            }
        })
        .catch(error =>  {
            messageCloseSwal();
            messageErrorSwal(error);
        });
    }

    const updateSeccion = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_SECCIONES}/${id}`, METHOD_PUT, formValues)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(seccion => {
                    setSecciones(secciones => [seccion, ...filterDropById(secciones, seccion.id)]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Seccion actualizada con exito");
                    dispatch(startLoadingSecciones());
                    handleClean();
                });                
            } else {
                response.text().then(msg => {
                    messageCloseSwal();
                    messageErrorSwal(msg);                                       
                });                
            }
        })
        .catch(error =>  {
            messageCloseSwal();
            messageErrorSwal(error);
        });
    }

    const handleClean = (e) =>{
        e && e.preventDefault();
        setSeccionActive({});
        reset();
    }

    return (
        <form>
            <div className="form-group row">
                <div className="col-6">
                    <div>
                        <label>Grupo</label>
                        <select
                            name="idGrupo"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione un grupo</option>
                            {                                
                                grupos && grupos.map(grupo => 
                                                        <option key={grupo.id} 
                                                                value={grupo.id} 
                                                                selected={formValues && formValues.idGrupo === grupo.id ? "selected": ""}>
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
                            onChange={handleInputChange}>
                            <option value="0">Seleccione una rama</option>
                            {                                
                                ramasFilter && ramasFilter.map(rama => 
                                                        <option key={rama.id} 
                                                                value={rama.id} 
                                                                selected={formValues && formValues.idRama === rama.id ? "selected": ""}>
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
        </form>
    )
}
