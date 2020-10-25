import React from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import { startLoginUser } from '../../actions/authAction';

export const LoginForm = () => {

    const history= useHistory();
    const dispatch = useDispatch();
    const [formValues, handleInputChange] = useForm({
        usuario: '',
        contrasena: '',
    });

    const handleLogin = (e) =>{
        e.preventDefault();
        dispatch(startLoginUser(formValues.usuario, formValues.contrasena));
    }

    const handleRedirectUsuario = () => {
        history.replace("/usuario");
    }

    return (
        <div className="row m-5 justify-content-center align-items-center">
            <div className="col-sm-6 col-md-4 col-md-offset-4">                
                <div className="account-wall">
                    
                    <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"
                        alt=""/>
                    
                    <form className="form-signin">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Usuario"
                            name="usuario"
                            value= {formValues.usuario} 
                            onChange={handleInputChange} />
                        
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Contrase&ntilde;a"
                            name="contrasena"
                            value= {formValues.contrasena} 
                            onChange={handleInputChange} />
                        
                        <button onClick={handleLogin} className="btn btn-lg btn-primary btn-block"> Acceder </button>                        
                    </form>
                    
                    <a onClick={handleRedirectUsuario} className="text-center new-account">Crear un Usuario </a>
                
                </div>                
            </div>
        </div>
    )
}
