import React from 'react';
import { TYPE_BUTTONS_CREATE, TYPE_FORM_CREATE } from '../../../util/constant';
import { UsuarioForm } from '../UsuarioForm';
import { TYPE_USUARIO_INTEGRANTE } from '../../../util/constant';

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
        tipoUsuario: TYPE_USUARIO_INTEGRANTE
    }  

    return (
        <div className="container mt-2">            
            <UsuarioForm 
                usuario={initialUsuario} 
                formType={TYPE_FORM_CREATE} />
        </div>
    )
}
