import React, {useState} from 'react';
import { UsuarioForm } from '../UsuarioForm';


export const UsuarioCreateScreen = () => {
     
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
        tipoUsuario: ""
    }  
    const[usuario, setUsuario] = useState(initialUsuario); 

    return (
        <div className="container mt-2">            
            <UsuarioForm 
                usuario={usuario} 
                setUsuario={setUsuario} />           
             
        </div>
    )
}
