import React, { useState } from 'react'
import { SeccionForm } from './SeccionForm';
import { SeccionTableForm } from './SeccionTableForm';

export const SeccionScreen = () => {
    const[secciones, setSecciones] = useState([]);
    const[seccionActive, setSeccionActive] = useState({});

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Secciones</h1>
            <hr/>
            <SeccionForm setSecciones = { setSecciones } seccionActive = { seccionActive } setSeccionActive = {setSeccionActive} />
            <SeccionTableForm secciones = { secciones }  setSecciones = { setSecciones } setSeccionActive = { setSeccionActive } />
        </div>
    )
}
