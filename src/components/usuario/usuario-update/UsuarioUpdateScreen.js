import React, {useState} from 'react';
import { UsuarioForm } from '../UsuarioForm';
import { UsuarioTrayectoria } from '../UsuarioTrayectoria';


export const UsuarioCreateScreen = () => {
       
    const[trayectorias, setTrayectorias] = useState([]);    
    const[wizard, setWizard] = useState(1);
    const initialUsuario = {
        usuario: "",
        contrasena: "",
        confirmContrasena: "",
        nombres: "",
        apellidos: "",
        tipoIntegrante: "",
        correo: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        tipoUsuario: "",
        trayectoria: trayectorias
    }  
    const[usuario, setUsuario] = useState(initialUsuario); 

    return (
        <div className="container mt-2">
            {
                wizard===1 && 
                    <UsuarioForm 
                        setWizard={setWizard} 
                        usuario={usuario} 
                        setUsuario={setUsuario} />
            }
            {
                 wizard===2 && 
                    <UsuarioTrayectoria 
                        setWizard={setWizard} 
                        trayectorias={trayectorias} 
                        setTrayectorias={setTrayectorias}
                        usuario={usuario} />
            }   
        </div>
    )
}
