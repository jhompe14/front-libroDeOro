import React, { useState } from 'react'
import { SeccionForm } from './SeccionForm';
import { SeccionTableForm } from './SeccionTableForm';

export const SeccionScreen = () => {

    const initialSeccion = {
        id: 0,
        nombre: '',
        descripcion: '',
        idRama: 0,
        nombreRama: '',
        idGrupo: 0,
        nombreGrupo: ''
    }
    const[secciones, setSecciones] = useState([]);
    const[seccionActive, setSeccionActive] = useState({});

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Secciones</h1>
            <hr/>
            <SeccionForm 
                setSecciones = { setSecciones } 
                seccionActive = { seccionActive } 
                setSeccionActive = {setSeccionActive}
                initialSeccion = { initialSeccion } />
            <SeccionTableForm 
                secciones = { secciones }  
                setSecciones = { setSecciones } 
                setSeccionActive = { setSeccionActive } />
        </div>
    )
}
