import React, { useEffect } from 'react'
import { commandFetch } from '../../helpers/commandFetch';
import { useForm } from '../../hooks/useForm'
import { HOST_URL_BACK, API_GRUPOS, METHOD_POST, METHOD_PUT } from '../../util/constant';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, messageCloseSwal, messageErrorSwal, messageSuccessSwal } from '../../util/messages';
import { filterDropById } from '../../util/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { startLoadingGrupos } from '../../actions/grupoAction';

export const GrupoForm = ({ setGrupos, grupoActive, setGrupoActive, initialGrupo }) => {

    const dispatch = useDispatch();
    const [formValues, handleInputChange, handleObjectChange, reset] = useForm(initialGrupo);
    
    useEffect(() => {
        if(grupoActive.id){ 
            handleObjectChange(grupoActive);
        }
    }, [grupoActive]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        messageLoadingSwal();
        if(formValues.id === 0){
            createGrupo();
        } else {
            updateGrupo(formValues.id);
        }    
    }

    const createGrupo = () => {
        commandFetch(`${HOST_URL_BACK}${API_GRUPOS}`, METHOD_POST, formValues)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(grupo => {
                    setGrupos(grupos => [grupo, ...grupos]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Grupo creado con exito");
                    dispatch(startLoadingGrupos());
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

    const updateGrupo = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_GRUPOS}/${id}`, METHOD_PUT, formValues)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(grupo => {
                    setGrupos(grupos => [grupo, ...filterDropById(grupos, grupo.id)]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Grupo actualizado con exito");
                    dispatch(startLoadingGrupos());
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
        setGrupoActive(initialGrupo);
        reset(initialGrupo);
    }

    return (
        <form>
            <div className="form-group">
                
                <label>Nombre</label> 
                <input 
                    type="text" 
                    name="nombre" 
                    className="form-control"
                    value= {formValues.nombre} 
                    onChange={handleInputChange}/>  

                <label>Descripcion</label>  
                <textarea 
                    name="descripcion" 
                    className="form-control" 
                    value={formValues.descripcion}
                    onChange={handleInputChange}/>                           
            </div>
            <div className="mt-2">
                <button onClick={handleClean} className="btn btn-primary"><FontAwesomeIcon icon={faHandSparkles}/> Limpiar</button>
                &nbsp;&nbsp;
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>
            </div>
        </form>
    )
}
