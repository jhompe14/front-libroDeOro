import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import { commandFetch } from '../../helpers/commandFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatusCodes } from 'http-status-codes';
import { filterRamasByGrupo, filterSeccionesByRama } from '../../util/selectors';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { HOST_URL_BACK, 
    API_ANECDOTA, 
    METHOD_POST } from '../../util/constant';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageSuccessSwalWithFunction } from '../../util/messages';

export const AnecdotaForm = () => {

    const history= useHistory();
    const dispatch = useDispatch();
    const { grupoReducer:{grupos}, ramaReducer:{ramas}, 
                seccionReducer:{secciones}, authReducer:{usuario, token} } = useSelector( state => state);
    const[ramasFilter, setRamasFilter] = useState([]);
    const[seccionesFilter, setSeccionesFilter] = useState([]);
    const [formValues, handleInputChange, reset] = useForm({});

    useEffect(() => {
        setRamasFilter(filterRamasByGrupo(ramas, formValues.grupo));
    }, [formValues.grupo]);

    useEffect(() => {
        setSeccionesFilter(filterSeccionesByRama(secciones, formValues.rama));
    }, [formValues.rama]);

    const handleSubmit = () => {
        messageLoadingSwal();
        const objSendAnecdota ={
            ...formValues,
            fecha: moment(formValues.fecha).format("DD/MM/YYYY"),
            usuario: usuario,
        };
        
        commandFetch(`${HOST_URL_BACK}${API_ANECDOTA}`, METHOD_POST, objSendAnecdota, token)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Anecdota creada exitosamente. La anecdota entra en estado <b>PENDIENTE DE APROBACION</b>", 
                    () => {
                        history.replace(`/`);
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

    const getSelectedGrupo = (grupoId) =>  formValues && formValues.grupo === grupoId ? 'selected': '';

    return (
        <>
            <div className="form-group row">
                <div className="col-4">
                    <div>
                        <label>Grupo</label>
                        <select
                            name="grupo"  
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
                            name="rama"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione una rama</option>
                            {                                
                                ramasFilter && ramasFilter.map(rama => 
                                                            <option key={rama.id} 
                                                                    value={rama.id} >
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
                            name="seccion"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione una seccion</option>
                            {                                
                                seccionesFilter && seccionesFilter.map(seccion => 
                                                        <option key={seccion.id} 
                                                                value={seccion.id} >
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
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>
            </div>
        </>
    )
}
