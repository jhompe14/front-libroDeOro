import React from 'react';
import { UsuarioTrayectoriaForm } from './UsuarioTrayectoriaForm';
import { UsuarioTrayectoriaTable } from './UsuarioTrayectoriaTable';

export const UsuarioTrayectoria = ({setWizard, trayectorias, setTrayectorias, usuario }) => {
        
    const changeWizard = () => {
        setWizard(1);
    }

    const initialTrayectoria = {
        id: 0,
        grupo: 0,
        nombreGrupo: "",
        rama: 0,
        nombreRama: "",
        seccion: 0,
        nombreSeccion: "",
        cargo: 0,
        nombreCargo: "",
        anioIngreso: 0,
        anioRetiro: 0
    };

    const handleFinalizarUsuario = () =>{
        console.log({
            ...usuario,
            trayectoria: trayectorias,
        });
    }
    
    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Trayectoria</h1>
            
            <UsuarioTrayectoriaForm 
                setTrayectorias = {setTrayectorias} 
                initialTrayectoria={initialTrayectoria} />
            
            <UsuarioTrayectoriaTable 
                trayectorias={trayectorias} 
                setTrayectorias = {setTrayectorias}/>

            <button onClick={changeWizard} className="btn btn-primary">Anterior</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleFinalizarUsuario} className="btn btn-primary">Finalizar</button>
        </div>
    )
}
