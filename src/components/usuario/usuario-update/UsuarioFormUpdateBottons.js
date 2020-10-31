import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faForward } from '@fortawesome/free-solid-svg-icons';

export const UsuarioFormUpdateBottons = ({setWizard, setUsuario}) => {

    const changeWizard = () => {
        setWizard(2);
        setUsuario({
            ...formValues
        });
    }

    return (
        <>
          <button onClick={changeWizard} className="btn btn-primary">Siguiente <FontAwesomeIcon icon={faForward}/></button>  
        </>
    )
}
