import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useHistory } from "react-router-dom";
import { commandFetch } from '../../helpers/commandFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatusCodes } from 'http-status-codes';
import { filterRamasByGrupo, filterSeccionesByRama } from '../../util/selectors';
import { faSave, faBackward } from '@fortawesome/free-solid-svg-icons';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { HOST_URL_BACK, 
    API_ANECDOTA, 
    METHOD_POST, 
    METHOD_PUT} from '../../util/constant';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageSuccessSwalWithFunction } from '../../util/messages';
import { formatDateCalendar } from '../../util/date';

export const AnecdotaForm = ({anecdotaEdit, edit}) => {

    const history= useHistory();
    const dispatch = useDispatch();
    const { grupoReducer:{grupos}, ramaReducer:{ramas}, 
                seccionReducer:{secciones}, authReducer:{usuario, token} } = useSelector( state => state);
                
    const[ramasFilter, setRamasFilter] = useState([]);
    const[seccionesFilter, setSeccionesFilter] = useState([]);
    const [formValues, handleInputChange] = useForm(anecdotaEdit);

    const goListadoAnecdotas = () => history.replace("/anecdota-listado");

    useEffect(() => {
        setRamasFilter(filterRamasByGrupo(ramas, formValues.idGrupo));
    }, [formValues.idGrupo]);

    useEffect(() => {
        setSeccionesFilter(filterSeccionesByRama(secciones, formValues.idRama));
    }, [formValues.idRama]);

    const handleSubmit = () => {
        if(edit){
            updateAnecdota();
        }else{
            saveAnecdota();
        }       
    }

    const saveAnecdota = () => {
        const objSendAnecdota ={
            ...formValues,
            fecha: formatDateCalendar(formValues.fecha),
            usuario: usuario,
        };

        messageLoadingSwal();
        commandFetch(`${HOST_URL_BACK}${API_ANECDOTA}`, METHOD_POST, objSendAnecdota, token)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Anecdota creada exitosamente. La anecdota entra en estado PENDIENTE DE APROBACION", 
                    () => {
                        history.replace(`/anecdota-listado`);
                    });                    
                })                
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    const updateAnecdota = () => {
        const objSendAnecdota ={
            ...formValues,
            fecha: formatDateCalendar(formValues.fecha),
        };
        commandFetch(`${HOST_URL_BACK}${API_ANECDOTA}/${objSendAnecdota.id}`, METHOD_PUT, objSendAnecdota, token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Anecdota modificada exitosamente.", 
                    () => {
                        history.replace(`/anecdota-listado`);
                    });                    
                })                
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    const getSelectedGrupo = (grupoId) =>  formValues && formValues.idGrupo === grupoId ? 'selected': '';
    const getSelectedRama = (ramaId) => formValues && formValues.idRama === ramaId ? 'selected': '';
    const getSelectedSeccion = (seccionId) => formValues && formValues.idSeccion === seccionId ? 'selected': '';

    return (
        <>
            <div className="form-group row">
                <div className="col-4">
                    <div>
                        <label>Grupo</label>
                        <select
                            name="idGrupo"  
                            className="form-control"
                            onChange={handleInputChange}>
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
                </div>
                <div className="col-4">
                    <div>               
                        <label>Rama</label>
                        <select                            
                            name="idRama"  
                            className="form-control"
                            onChange={handleInputChange}>
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
                <div className="col-4">
                    <div>               
                        <label>Seccion</label>
                        <select                            
                            name="idSeccion"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0" selected={getSelectedSeccion(0)}>Seleccione una seccion</option>
                            {                                
                                seccionesFilter && seccionesFilter.map(seccion => 
                                                        <option key={seccion.id} 
                                                                value={seccion.id} 
                                                                selected={getSelectedSeccion(seccion.id)}>
                                                                {seccion.nombre}
                                                        </option>)
                            }        
                        </select>
                    </div>
                </div>            
            </div>
            <div className="form-group row">
                <div className="col-6">
                    <label>Nombre</label> 
                    <input 
                        type="text" 
                        name="nombre" 
                        className="form-control"
                        value= {formValues.nombre} 
                        onChange={handleInputChange}/>

                    <label>Fecha</label> 
                    <input 
                        type="date" 
                        name="fecha" 
                        className="form-control"
                        value= {formValues.fecha} 
                        onChange={handleInputChange}/>   

                    <label>Descripcion</label>  
                    <textarea 
                        name="descripcion" 
                        className="form-control" 
                        value={formValues.descripcion}
                        onChange={handleInputChange}/>
                </div>
                <div className="col-6">
                </div>
            </div>
            <div className="mt-2">
                {
                    edit &&
                    <button onClick={goListadoAnecdotas} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Anecdotas</button>
                }
                &nbsp;&nbsp;&nbsp;<button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/>&nbsp;&nbsp;Guardar</button>                
            </div>
        </>
    )
}
