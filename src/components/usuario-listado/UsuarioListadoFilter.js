import React from 'react';
import { useForm } from '../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const UsuarioListadoFilter = ({setAplicacionFiltros, setFiltros}) => {
    const [formValues, handleInputChange] = useForm({});

    const handleFilter = () =>{
        setAplicacionFiltros(true);
        setFiltros({
            ...formValues,
        });
    }

    return (
        <>
            <div className="form-group row">

                <div className="col-3">
                    <label>Usuario</label> 
                    <input 
                        type="text" 
                        name="usuario" 
                        className="form-control"
                        value= {formValues.usuario} 
                        onChange={handleInputChange}/>
                </div>

                <div className="col-3">
                    <label>Nombres</label> 
                    <input 
                        type="text" 
                        name="nombres" 
                        className="form-control"
                        value= {formValues.nombres} 
                        onChange={handleInputChange}/>
                </div>

                <div className="col-3">
                    <label>Apellidos</label> 
                    <input 
                        type="text" 
                        name="apellidos" 
                        className="form-control"
                        value= {formValues.apellidos} 
                        onChange={handleInputChange}/>
                </div>

                <div className="col-3">
                    <button onClick={handleFilter} className="btn btn-primary mt-4"><FontAwesomeIcon icon={faSearch}/>&nbsp;&nbsp;Buscar</button>
                </div>                            
            </div>
        </>
    )
}
