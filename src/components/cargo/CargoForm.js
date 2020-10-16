import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { commandFetch } from '../../helpers/commandFetch';
import { StatusCodes } from 'http-status-codes';
import { filterDropById } from '../../util/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faSave, faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { HOST_URL_BACK, 
        API_CARGOS, 
        METHOD_POST, 
        METHOD_PUT,
        TYPE_CARGO_GRUPO,
        TYPE_CARGO_RAMA,
        TYPE_CARGO_SECCION } from '../../util/constant';
import { messageLoadingSwal, 
        messageCloseSwal, 
        messageSuccessSwal } from '../../util/messages';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';


export const CargoForm = ({ setCargos, cargoActive, setCargoActive, typecargo, typeId, initialCargo }) => {

    const history= useHistory();
    const dispatch = useDispatch();
    const { authReducer } = useSelector( state => state);
    const [formValues, handleInputChange, handleObjectChange, reset] = useForm(initialCargo);

    useEffect(() => {
        if(cargoActive.id){ 
            handleObjectChange(cargoActive);
        }
    }, [cargoActive]);

    const handleBack= () => {
        switch(typecargo){
            case TYPE_CARGO_GRUPO:
                history.replace(`/grupo`);   
                break;
            case TYPE_CARGO_RAMA:
                history.replace(`/rama`);
                break;
            case TYPE_CARGO_SECCION:
                history.replace(`/seccion`);
                break;
            default:
                break;
        }
    }

    const handleSubmit = () =>{
        messageLoadingSwal();
        if(formValues.id === 0){
            createCargo();
        } else {
            updateCargo(formValues.id);
        }    
    }    

    const createCargo = () => {
        commandFetch(`${HOST_URL_BACK}${API_CARGOS}/type/${typecargo}/id/${typeId}`, METHOD_POST, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(cargo => {
                    setCargos(cargos => [cargo, ...cargos]);                   
                    messageCloseSwal();
                    messageSuccessSwal("Cargo creado con exito");
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

    const updateCargo = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_CARGOS}/${id}`, METHOD_PUT, formValues, authReducer?.token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(cargo => {
                    setCargos(cargos => [cargo, ...filterDropById(cargos, cargo.id)]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Cargo actualizado con exito");
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

    const handleClean = () =>{
        setCargoActive(initialCargo);
        reset(initialCargo);        
    }


    return (
        <>
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
            <div className="row mt-2">
                &nbsp;&nbsp;&nbsp;
                <button onClick={handleBack} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/> Volver</button>                
                &nbsp;&nbsp;
                <button onClick={handleClean} className="btn btn-primary"><FontAwesomeIcon icon={faHandSparkles}/> Limpiar</button>
                &nbsp;&nbsp;
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>   
            </div>
        </>
    )
}
