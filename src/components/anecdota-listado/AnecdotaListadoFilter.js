import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { TYPE_ESTADO_ANECDOTA_APROBADO, 
    TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION, 
    TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION, 
    TYPE_ESTADO_ANECDOTA_RECHAZADO, 
    TYPE_USUARIO_ADMINISTRADOR } from '../../util/constant';
import { filterRamasByGrupo, filterSeccionesByRama } from '../../util/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { formatDateCalendar } from '../../util/date';

export const AnecdotaListadoFilter = ({setAplicacionFiltros, setFiltros, authReducer}) => {

    const { grupoReducer:{grupos}, ramaReducer:{ramas}, seccionReducer:{secciones} } = useSelector( state => state);
    const[ramasFilter, setRamasFilter] = useState([]);
    const[seccionesFilter, setSeccionesFilter] = useState([]);
    const [formValues, handleInputChange] = useForm({});

    useEffect(() => {
        setRamasFilter(filterRamasByGrupo(ramas, formValues.idGrupo));
    }, [formValues.idGrupo]);

    useEffect(() => {
        setSeccionesFilter(filterSeccionesByRama(secciones, formValues.idRama));
    }, [formValues.idRama]);

    const handleFilter = () =>{
        setAplicacionFiltros(true);
        setFiltros({
            ...formValues,
            fechaInicioAnecdota: formatDateCalendar(formValues.fechaInicioAnecdota),
            fechaFinAnecdota: formatDateCalendar(formValues.fechaFinAnecdota),
        });
    }

    return (
        <>
            <div className="form-group row">
                <div className="col-3">
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
                                            value={grupo.id}>
                                            {grupo.nombre}
                                    </option>)
                            }        
                        </select>
                    </div>
                </div>
                <div className="col-3">
                    <div>               
                        <label>Rama</label>
                        <select                            
                            name="idRama"  
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
                <div className="col-3">
                    <div>               
                        <label>Secci&oacute;n</label>
                        <select                            
                            name="idSeccion"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione una secci&oacute;n</option>
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
                <div className="col-3">
                    <label>Estado An&eacute;cdota</label>
                    <select                            
                        name="estado"  
                        className="form-control"
                        onChange={handleInputChange}>
                        <option value="0">Seleccione un estado</option>
                        <option value={TYPE_ESTADO_ANECDOTA_PENDIENTE_APROBACION}>Pendiente aprobaci&oacute;n</option>
                        <option value={TYPE_ESTADO_ANECDOTA_APROBADO}>Aprobado</option>
                        <option value={TYPE_ESTADO_ANECDOTA_RECHAZADO}>Rechazado</option>
                        <option value={TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION}>Pendiente de modificaci&oacute;n</option>       
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-4">
                    <div className="form-group row">
                        <div className="col-6">
                            <label>Fecha Inicio</label> 
                            <input 
                                type="date" 
                                name="fechaInicioAnecdota" 
                                className="form-control"
                                value= {formValues.fechaInicioAnecdota} 
                                onChange={handleInputChange}/>
                        </div>
                        <div className="col-6">
                            <label>Fecha Fin</label> 
                                <input 
                                    type="date" 
                                    name="fechaFinAnecdota" 
                                    className="form-control"
                                    value= {formValues.fechaFinAnecdota} 
                                    onChange={handleInputChange}/>
                        </div>
                    </div>
                </div> 
                
                {
                    authReducer?.tipoUsuario == TYPE_USUARIO_ADMINISTRADOR &&                                    
                        <div className="col-3">
                            <label>Usuario</label> 
                            <input 
                                type="text" 
                                name="usuarioFilter" 
                                className="form-control"
                                value= {formValues.usuarioFilter} 
                                onChange={handleInputChange}/>
                        </div>
                                                                     
                }                

                <div className="col-4">
                    <div className="form-group row">
                        <div className="col-6">
                            <label>C&oacute;digo</label> 
                            <input 
                                type="number" 
                                name="codigoAnecdota" 
                                className="form-control"
                                value= {formValues.codigoAnecdota} 
                                onChange={handleInputChange}/>
                        </div>                        
                        <div className="col-6">
                            <button onClick={handleFilter} className="btn btn-primary mt-4"><FontAwesomeIcon icon={faSearch}/>&nbsp;&nbsp;Buscar</button>
                        </div> 
                    </div>
                </div>                              
            </div>
        </>
    )
}
