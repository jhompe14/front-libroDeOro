import React from 'react'

export const UsuarioTableTrayectoria = ({setWizard}) => {
    
    const changeWizard = () => {
        setWizard(1);
    }
    
    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Trayectoria</h1>
            <button onClick={changeWizard} className="btn btn-primary">Anterior</button>
        </div>
    )
}
