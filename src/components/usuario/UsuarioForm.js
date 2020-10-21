import React from 'react';
import { useForm } from '../../hooks/useForm';
import { TYPE_INTEGRANTE_ACTIVO, TYPE_INTEGRANTE_EX_INTEGRANTE } from '../../util/constant';

export const UsuarioForm = ({setWizard, usuario, setUsuario}) => {
        
    const [formValues, handleInputChange] = useForm(usuario);

    const changeWizard = () => {
        setWizard(2);
        setUsuario({
            ...formValues
        });
    }

    const checkedTipoIntegrante = (tipoIntegrante) =>  formValues.tipoIntegrante === tipoIntegrante ? true : false;
    
    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Informacion General</h1>
            <hr/>
            <div className="form-group row">
                <div className="col-6">
                    <div  className="mt-2">               
                        <label>Nombres</label> 
                        <input 
                            type="text" 
                            name="nombres" 
                            className="form-control"
                            value= {formValues.nombres} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">               
                        <label>Apellidos</label> 
                        <input 
                            type="text" 
                            name="apellidos" 
                            className="form-control"
                            value= {formValues.apellidos} 
                            onChange={handleInputChange}/>
                    </div>                   
                    <div  className="mt-2">               
                        <label>Correo</label> 
                        <input 
                            type="text" 
                            name="correo" 
                            className="form-control"
                            value= {formValues.correo} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">               
                        <label>Telefono</label> 
                        <input 
                            type="text" 
                            name="telefono" 
                            className="form-control"
                            value= {formValues.telefono} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">
                        <label>Tipo Integrante</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="tipoIntegrante" 
                                    value={TYPE_INTEGRANTE_ACTIVO}
                                    onChange={handleInputChange}
                                    checked={checkedTipoIntegrante(TYPE_INTEGRANTE_ACTIVO)} />
                                <label className="form-check-label">Activo</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="tipoIntegrante" 
                                    value={TYPE_INTEGRANTE_EX_INTEGRANTE}
                                    onChange={handleInputChange}
                                    checked={checkedTipoIntegrante(TYPE_INTEGRANTE_EX_INTEGRANTE)} />
                                <label className="form-check-label">Ex-integrante</label>
                            </div>
                        </div>                        
                    </div>
                </div>
                <div className="col-6">
                    <div  className="mt-2">               
                        <label>Direccion</label> 
                        <input 
                            type="text" 
                            name="direccion" 
                            className="form-control"
                            value= {formValues.direccion} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">               
                        <label>Ciudad</label> 
                        <input 
                            type="text" 
                            name="ciudad" 
                            className="form-control"
                            value= {formValues.ciudad} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">               
                        <label>Usuario</label> 
                        <input 
                            type="text" 
                            name="usuario" 
                            className="form-control"
                            value= {formValues.usuario} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">               
                        <label>Contraseña</label> 
                        <input 
                            type="password" 
                            name="contrasena" 
                            className="form-control"
                            value= {formValues.contrasena} 
                            onChange={handleInputChange}/>
                    </div>
                    <div  className="mt-2">               
                        <label>Confirmar Contraseña</label> 
                        <input 
                            type="password" 
                            name="confirmContrasena" 
                            className="form-control"
                            value= {formValues.confirmContrasena} 
                            onChange={handleInputChange}/>
                    </div>
                </div>
            </div>
            <button onClick={changeWizard} className="btn btn-primary">Siguiente</button>
        </div>
    )
}
