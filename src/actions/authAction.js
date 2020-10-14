import { commandFetch } from "../helpers/commandFetch";
import { types } from "../types/types";
import { HOST_URL_BACK, API_AUTH, METHOD_POST } from '../util/constant';
import { StatusCodes } from 'http-status-codes';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageErrorSwal } from '../util/messages';

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
                    });
                }
            })
            .catch(error =>  {
                messageCloseSwal();
                messageErrorSwal(error);
            });
    }
}

export const setAuth = (auth) => ({
    type: types.login,
    payload: auth,
});