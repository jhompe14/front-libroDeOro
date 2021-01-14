import React from 'react';
import { useForm } from '../../hooks/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { formatDateCalendar } from '../../util/date';

export const AnecdotaLibroFilter = ({setAplicacionFiltros, setFiltros }) => {

    const [formValues, handleInputChange] = useForm({});

    const handleFilter = () =>{
        setAplicacionFiltros(true);
        setFiltros({
            fechaInicioAnecdota: formatDateCalendar(formValues.fechaInicioAnecdota),
            fechaFinAnecdota: formatDateCalendar(formValues.fechaFinAnecdota),
        });
    }

    return (
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
            <div className="col-4">
                <button onClick={handleFilter} className="btn btn-primary mt-4"><FontAwesomeIcon icon={faSearch}/>&nbsp;&nbsp;Buscar</button>
            </div>            
        </div>
    )
}
