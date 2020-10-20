import React, {useState} from 'react';
import { UsuarioForm } from './UsuarioForm';
import { UsuarioTableTrayectoria } from './UsuarioTableTrayectoria';


export const UsuarioScreen = () => {
      
    const[wizard, setWizard] = useState(1);

    return (
        <div className="container mt-2">
            {
                wizard===1 && <UsuarioForm setWizard={setWizard} />
            }
            {
                 wizard===2 && <UsuarioTableTrayectoria setWizard={setWizard} />
            }   
        </div>
    )
}
