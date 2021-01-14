import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CargoForm } from './CargoForm';
import { CargoTableForm } from './CargoTableForm';
import { filterById } from '../../util/selectors';
import { TYPE_CARGO_GRUPO, TYPE_CARGO_RAMA, TYPE_CARGO_SECCION } from '../../util/constant';

export const CargoScreen = () => {

    const initialCargo = {
        id: 0,
        nombre: '',
        descripcion: ''
    };
    const[cargos, setCargos] = useState([]);
    const[cargoActive, setCargoActive] = useState({});

    const[headDescripTypeCargo, setHeadDescriptTypeCargo] = useState("");
    const[descripTypeCargo, setDescripTypeCargo] = useState({});
    
    const { typecargo, typeId }= useParams();

    const grupoReducer = useSelector( state => state)?.grupoReducer;
    const ramasReducer = useSelector( state => state)?.ramaReducer;
    const seccionesReducer = useSelector( state => state)?.seccionReducer;

    useEffect(() => {
        const grupos = grupoReducer?.grupos
        if(grupos?.length > 0 && typecargo===TYPE_CARGO_GRUPO){
            setHeadDescriptTypeCargo("Cargos del grupo: ");
            setDescripTypeCargo(filterById(grupos, typeId)[0]);
        }        
    }, [grupoReducer]);

    useEffect(() => {
        const ramas = ramasReducer?.ramas;
        if(ramas?.length > 0 && typecargo===TYPE_CARGO_RAMA){
            setHeadDescriptTypeCargo("Cargos de la rama: ");
            setDescripTypeCargo(filterById(ramas, typeId)[0]);
        }
    }, [ramasReducer])

    useEffect(() => {
        const secciones = seccionesReducer?.secciones
        if(secciones?.length > 0 && typecargo===TYPE_CARGO_SECCION){
            setHeadDescriptTypeCargo("Cargos de la secci\u00F3n: ");
            setDescripTypeCargo(filterById(secciones, typeId)[0]);
        }
    }, [seccionesReducer])
    
    return (
        <div className="content animate__animated animate__slideInLeft">
            <p style={{fontSize: "37px"}}><b>{headDescripTypeCargo}</b> {descripTypeCargo.nombre}</p>
            <hr/>
            
            <CargoForm 
                setCargos = { setCargos } 
                cargoActive = { cargoActive }
                setCargoActive = { setCargoActive } 
                typecargo= { typecargo } 
                typeId= { typeId }
                initialCargo= { initialCargo } />
            
            <CargoTableForm 
                cargos = { cargos }  
                setCargos = { setCargos } 
                setCargoActive = { setCargoActive } 
                typecargo={typecargo} 
                typeId={typeId} />
        </div>
    )
}
