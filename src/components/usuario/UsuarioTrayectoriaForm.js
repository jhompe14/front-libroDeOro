import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { filterRamasByGrupo, 
        filterSeccionesByRama, 
        filterCargosByGrupoRamaSeccion,
        filterById } from '../../util/selectors';

export const UsuarioTrayectoriaForm = ({ setTrayectorias, initialTrayectoria }) => {

    const { grupoReducer:{grupos}, ramaReducer:{ramas}, 
            seccionReducer:{secciones}, cargoReducer:{cargos} } = useSelector( state => state);
    const[ramasFilter, setRamasFilter] = useState([]);
    const[seccionesFilter, setSeccionesFilter] = useState([]);
    const[cargosFilter, setCargosFilter] = useState([]);
    const [formValues, handleInputChange, reset] = useForm(initialTrayectoria);

    useEffect(() => {
        setRamasFilter(filterRamasByGrupo(ramas, formValues.grupo));
        setCargosFilter(filterCargosByGrupoRamaSeccion(cargos, formValues.grupo, formValues.rama, formValues.seccion));
    }, [formValues.grupo]);

    useEffect(() => {
        setSeccionesFilter(filterSeccionesByRama(secciones, formValues.rama));
        setCargosFilter(filterCargosByGrupoRamaSeccion(cargos, formValues.grupo, formValues.rama, formValues.seccion));
    }, [formValues.rama]);

    useEffect(() => {
        setCargosFilter(filterCargosByGrupoRamaSeccion(cargos, formValues.grupo, formValues.rama, formValues.seccion));
    }, [formValues.seccion]);

    const handleAddTrayectoria = () => {
        setTrayectorias(trayectorias => [
             {
                ...formValues,
                id: (trayectorias.length + 1),
                nombreGrupo: filterById(grupos, formValues.grupo)[0]?.nombre,
                nombreRama: filterById(ramas, formValues.rama)[0]?.nombre,
                nombreSeccion: filterById(secciones, formValues.seccion)[0]?.nombre,
                nombreCargo: filterById(cargos, formValues.cargo)[0]?.nombre,
            }, 
            ...trayectorias]);
        reset(initialTrayectoria);
    };

    const getSelectedGrupo = (grupoId) =>  formValues && formValues.grupo === grupoId ? 'selected': '';

    return (
        <>
            <div className="form-group row">
                <div className="col-6">
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
                    <div  className="mt-2">               
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
                    <div  className="mt-2">               
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
                <div className="col-6">
                    <div>
                        <label>Cargo</label>
                        <select
                            name="cargo"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0">Seleccione un grupo</option>
                            {                                
                                cargosFilter && cargosFilter.map(cargo => 
                                        <option key={cargo.id} 
                                                value={cargo.id}>
                                                {cargo.nombre}
                                        </option>)
                            }        
                        </select>
                    </div>
                    <div  className="mt-2">               
                        <label>A&ntilde;o Ingreso</label> 
                        <input 
                            type="number" 
                            name="anioIngreso" 
                            className="form-control"
                            value= {formValues.anioIngreso} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">               
                        <label>A&ntilde;o Retiro</label> 
                        <input 
                            type="number" 
                            name="anioRetiro" 
                            className="form-control"
                            value= {formValues.anioRetiro}  
                            onChange={handleInputChange}/>
                    </div>    
                </div>
            </div>
            <div className="row mt-2">
                &nbsp;&nbsp;&nbsp;
                <button onClick={handleAddTrayectoria} className="btn btn-primary"><FontAwesomeIcon icon={faPlusSquare}/> Agregar</button>   
            </div>
        </>
    )
}
