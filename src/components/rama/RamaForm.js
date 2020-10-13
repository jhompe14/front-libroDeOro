import React, { useEffect } from 'react';
import { commandFetch } from '../../helpers/commandFetch';
import { useForm } from '../../hooks/useForm'
import { HOST_URL_BACK, METHOD_POST, METHOD_PUT, API_RAMAS } from '../../util/constant';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';
import { filterDropById } from '../../util/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingRamas } from '../../actions/ramaAction';

export const RamaForm = ({ setRamas, ramaActive, setRamaActive }) => {

    const dispatch = useDispatch();
    const grupos = useSelector( state => state)?.grupoReducer?.grupos;
    const [formValues, handleInputChange, handleObjectChange, reset] = useForm({
        id: 0,
        nombre: '',
        edadMinima: 0,
        edadMaxima: 0,
        descripcion: '',
        idGrupo: 0,
        nombreGrupo: ''
    });

    useEffect(() => {
        if(ramaActive.id){ 
            handleObjectChange(ramaActive);
        }
    }, [ramaActive]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        messageLoadingSwal();
        if(formValues.id === 0){
            createRama();
        } else {
            updateRama(formValues.id);
        }    
    }

    const createRama = () => {
        commandFetch(`${HOST_URL_BACK}${API_RAMAS}/grupo/${formValues.idGrupo}`, METHOD_POST, formValues)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(rama => {
                    setRamas(ramas => [rama, ...ramas]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Rama creada con exito");
                    dispatch(startLoadingRamas());
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

    const updateRama = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_RAMAS}/${id}`, METHOD_PUT, formValues)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(rama => {
                    setRamas(ramas => [rama, ...filterDropById(ramas, rama.id)]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Rama actualizada con exito");
                    dispatch(startLoadingRamas());
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
        setRamaActive({});
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
        </form>
    )
}
