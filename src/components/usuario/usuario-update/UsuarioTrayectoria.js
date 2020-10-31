import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { StatusCodes } from 'http-status-codes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faSave } from '@fortawesome/free-solid-svg-icons';
import { UsuarioTrayectoriaForm } from './UsuarioTrayectoriaForm';
import { UsuarioTrayectoriaTable } from './UsuarioTrayectoriaTable';
import { commandFetch } from '../../../helpers/commandFetch';
import { HOST_URL_BACK, 
    API_USUARIOS, 
    METHOD_POST,
    TYPE_USUARIO_INTEGRANTE } from '../../../util/constant';
import { messageLoadingSwal, 
        messageCloseSwal, 
        messageSuccessSwalWithFunction } from '../../../util/messages';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';

export const UsuarioTrayectoria = ({setWizard, trayectorias, setTrayectorias, usuario }) => {
        
    const history= useHistory();
    const dispatch = useDispatch();
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
        messageLoadingSwal();
        
        const objSendUsuario ={
            ...usuario,
            tipoUsuario: TYPE_USUARIO_INTEGRANTE,
            trayectoria: trayectorias,
        };        

        commandFetch(`${HOST_URL_BACK}${API_USUARIOS}`, METHOD_POST, objSendUsuario)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Usuario creado con exito, intente ingresar desde la pantalla login.", () => {
                        history.replace(`/auth/login`);
                    });                    
                })                
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
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

            <button onClick={changeWizard} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/> Anterior</button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleFinalizarUsuario} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/> Finalizar</button>
        </div>
    )
}
