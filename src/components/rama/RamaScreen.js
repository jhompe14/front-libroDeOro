import React, { useState } from 'react'
import { RamaForm } from './RamaForm';
import { RamaTableForm } from './RamaTableForm';

export const RamaScreen = () => {

    const[ramas, setRamas] = useState([]);
    const[ramaActive, setRamaActive] = useState({});

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Ramas</h1>
            <hr/>
            <RamaForm setRamas = { setRamas } ramaActive = { ramaActive } setRamaActive = {setRamaActive} />
            <RamaTableForm ramas = { ramas }  setRamas = { setRamas } setRamaActive = { setRamaActive } />
        </div>
    )
}
