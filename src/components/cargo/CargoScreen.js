import React, { useState } from 'react'
import { TYPE_CARGO_GRUPO, TYPE_CARGO_RAMA, TYPE_CARGO_SECCION } from '../../util/constant';
import { useParams } from 'react-router-dom'
import { CargoForm } from './CargoForm';
import { CargoTableForm } from './CargoTableForm';

export const CargoScreen = () => {

    const[cargos, setCargos] = useState([]);
    const[cargoActive, setCargoActive] = useState({});

    const { typecargo, typeId }= useParams();
    
    const descripcionCargos = () => {
        switch(typecargo){
            case TYPE_CARGO_GRUPO:
                return "CARGOS del GRUPO: ";
                break;
            case TYPE_CARGO_RAMA:
                return "CARGOS de la RAMA: ";
                break;
            case TYPE_CARGO_SECCION:
                return "CARGOS de la SECCION: ";
                break;
            default:
                break;
        }
    }

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>
               {descripcionCargos()}
            </h1>
            <hr/>
            
            <CargoForm 
                setCargos = { setCargos } 
                cargoActive = { cargoActive } 
                typecargo={typecargo} 
                typeId={typeId} />
            
            <CargoTableForm 
                cargos = { cargos }  
                setCargos = { setCargos } 
                setCargoActive = { setCargoActive } 
                typecargo={typecargo} 
                typeId={typeId} />
        </div>
    )
}
