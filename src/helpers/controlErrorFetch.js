import { StatusCodes } from 'http-status-codes';
import { startLogoutUser } from '../actions/authAction';
import { messageWarningFunction, 
    messageCloseSwal, 
    messageErrorSwal } from '../util/messages';

export const controlErrorFetch = (err, dispatch) => {
    if(validateExecControlErrorFetch()){ 
        setActiveWarningFunc();   
        messageCloseSwal();
        if(err.status && err.status===StatusCodes.FORBIDDEN){
            messageWarningFunction("La sesi\u00F3n ha expirado, por favor vuelva a iniciar sesi\u00F3n", 
                () => {
                    dispatch(startLogoutUser());
                    setInactiveWarningFunc();
                });
        }else if(err.status != undefined && err.status != StatusCodes.INTERNAL_SERVER_ERROR){
            err.text().then(msg => {
                messageErrorFetch(msg);                                     
            });            
        } else {
            messageErrorFetch("Ha ocurrido un error interno por favor comun\u00EDquese con el administrador");
        }
    } 
}

const messageErrorFetch = (msg) => {
    messageErrorSwal(msg);
    setInactiveWarningFunc();
}

const validateExecControlErrorFetch = () =>{
    const activeWarningFunc = localStorage.getItem("activeWarningFunc");
    return activeWarningFunc=== null || activeWarningFunc==="I";
}

const setActiveWarningFunc = () => {
    localStorage.setItem("activeWarningFunc", "A");
}

export const setInactiveWarningFunc = () => {
    localStorage.setItem("activeWarningFunc", "I");
}


