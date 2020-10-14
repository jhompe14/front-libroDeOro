import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
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
        messageErrorSwal, 
        messageSuccessSwal } from '../../util/messages';


export const CargoForm = ({ setCargos, cargoActive, setCargoActive, typecargo, typeId, initialCargo }) => {

    const history= useHistory();

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

    const handleSubmit = (e) =>{
        e.preventDefault();
        messageLoadingSwal();
        if(formValues.id === 0){
            createCargo();
        } else {
            updateCargo(formValues.id);
        }    
    }    

    const createCargo = () => {
        commandFetch(`${HOST_URL_BACK}${API_CARGOS}/type/${typecargo}/id/${typeId}`, METHOD_POST, formValues)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(cargo => {
                    setCargos(cargos => [cargo, ...cargos]);                   
                    messageCloseSwal();
                    messageSuccessSwal("Cargo creado con exito");
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

    const updateCargo = (id) => {
        commandFetch(`${HOST_URL_BACK}${API_CARGOS}/${id}`, METHOD_PUT, formValues)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(cargo => {
                    setCargos(cargos => [cargo, ...filterDropById(cargos, cargo.id)]);                    
                    messageCloseSwal();
                    messageSuccessSwal("Cargo actualizado con exito");
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

    const handleClean = (e) =>{
        e && e.preventDefault();
        setCargoActive(initialCargo);
        reset(initialCargo);        
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
            <div className="row mt-2">
                &nbsp;&nbsp;&nbsp;
                <button onClick={handleBack} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/> Volver</button>                
                &nbsp;&nbsp;
                <button onClick={handleClean} className="btn btn-primary"><FontAwesomeIcon icon={faHandSparkles}/> Limpiar</button>
                &nbsp;&nbsp;
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Guardar</button>   
            </div>
        </form>
    )
}
