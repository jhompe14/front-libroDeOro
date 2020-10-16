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
            messageWarningFunction("La session ha expirado, por favor vuelva a iniciar sesion", 
                () => {
                    dispatch(startLogoutUser());
                    setInactiveWarningFunc();
                });
        }else if(err.status){
            err.text().then(msg => {
                messageErrorSwal(msg);
                setInactiveWarningFunc();                                       
            });
        } else {
            messageErrorSwal(err);
            setInactiveWarningFunc();
        }
    } 
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


