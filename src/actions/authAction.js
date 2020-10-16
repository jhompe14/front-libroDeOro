import { commandFetch } from "../helpers/commandFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_AUTH, METHOD_POST } from '../util/constant';
import { StatusCodes } from 'http-status-codes';
import { startRemoveGrupos } from "./grupoAction";
import { startRemoveRamas } from "./ramaAction";
import { startRemoveSecciones } from "./seccionAction";
import { controlErrorFetch } from "../helpers/controlErrorFetch";
import { messageLoadingSwal, 
    messageCloseSwal } from '../util/messages';

export const startLoginUser = (usuario, contrasena) =>{
    return async(dispatch) => {
        messageLoadingSwal();
        await commandFetch(`${HOST_URL_BACK}${API_AUTH}`, METHOD_POST, {
                 usuario: usuario,
                 contrasena: contrasena     
            })
            .then(response => {
                if(response.status === StatusCodes.OK){
                    response.json().then(auth => {
                        messageCloseSwal();
                        dispatch(setAuth(auth));
                        setLocalStorageFromAuth(auth);
                    });
                } else {
                    controlErrorFetch(response, dispatch);
                }
            })
            .catch(error =>  {
                controlErrorFetch(error, dispatch);
            });
    }
}

export const setAuthFromLocalStorage = () => ({
    type: types.login,
    payload: {
        usuario: localStorage.getItem('usuario'),
        token: localStorage.getItem('token'),
        tipoUsuario: localStorage.getItem('tipoUsuario'),
    },    
});

export const validateLocalStorageAuth = () => {
    return localStorage.getItem('usuario') && 
            localStorage.getItem('token') &&
            localStorage.getItem('tipoUsuario')
}

export const startLogoutUser = () => {
    return async(dispatch) => {
        dispatch(startRemoveGrupos());
        dispatch(startRemoveRamas());
        dispatch(startRemoveSecciones());
        dispatch(setLogoutAuth());
        removeLocalStorageFromAuth();
    }
}

const setLogoutAuth = () => ({    
    type: types.logout,    
}); 

const setAuth = (auth) => ({
    type: types.login,
    payload: auth,
});

const setLocalStorageFromAuth = (auth) => {
    localStorage.setItem('usuario', auth.usuario);
    localStorage.setItem('token', auth.token);
    localStorage.setItem('tipoUsuario', auth.tipoUsuario);
};

const removeLocalStorageFromAuth = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
}


