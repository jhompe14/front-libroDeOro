import React from 'react'
import { ContrasenaUpdateForm } from './ContrasenaUpdateForm';

export const ContrasenaUpdateScreen = () => {
    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Modificar Contrase&ntilde;a</h1>
            <hr/>
            <ContrasenaUpdateForm />
        </div>
    )
}
