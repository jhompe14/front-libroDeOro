import React, { useState } from 'react'
import { RamaForm } from './RamaForm';
import { RamaTableForm } from './RamaTableForm';

export const RamaScreen = () => {

    const initialRama = {
        id: 0,
        nombre: '',
        edadMinima: 0,
        edadMaxima: 0,
        descripcion: '',
        idGrupo: 0,
        nombreGrupo: ''
    };
    const[ramas, setRamas] = useState([]);
    const[ramaActive, setRamaActive] = useState(initialRama);

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Ramas</h1>
            <hr/>
            <RamaForm 
                ramaActive = { ramaActive } 
                setRamaActive = {setRamaActive} 
                initialRama={initialRama} />
            <RamaTableForm 
                ramas = { ramas }  
                setRamas = { setRamas } 
                setRamaActive = { setRamaActive } />
        </div>
    )
}
