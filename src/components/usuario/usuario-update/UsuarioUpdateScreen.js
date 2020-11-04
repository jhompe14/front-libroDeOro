import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TYPE_FORM_UPDATE } from '../../../util/constant';
import { UsuarioForm } from '../UsuarioForm';
import { UsuarioTrayectoria } from './UsuarioTrayectoria';
import { HOST_URL_BACK, API_USUARIOS } from '../../../util/constant';
import { queryFetch } from '../../../helpers/queryFetch';
import { StatusCodes } from 'http-status-codes';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { messageLoadingSwal, messageCloseSwal } from '../../../util/messages';

export const UsuarioUpdateScreen = () => {
       
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const[trayectorias, setTrayectorias] = useState([]);    
    const[wizard, setWizard] = useState(1);      
    const[usuario, setUsuario] = useState();
    
    useEffect(() => {
        loadUsuario();
    }, []);

    const loadUsuario = async() => {
        messageLoadingSwal();
        await queryFetch(`${HOST_URL_BACK}${API_USUARIOS}/${authReducer?.usuario}`, authReducer?.token)
            .then(resp => {
                messageCloseSwal();
                if(resp.status === StatusCodes.OK){
                    return resp.json()
                }else{
                    return new Promise((resolve, reject) => reject({status: resp.status}));
                }
            })
            .then(data => {
                if(data != undefined ){
                    setUsuario(data);
                    setTrayectorias(data.trayectoria);
                }
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    return (
        <div className="container mt-2">
            {
                wizard===1 && usuario != undefined && 
                    <UsuarioForm 
                        setWizard={setWizard} 
                        usuario={usuario} 
                        setUsuario={setUsuario}
                        formType={TYPE_FORM_UPDATE}
                        authReducer={authReducer} />
            }
            {
                 wizard===2 && usuario != undefined && 
                    <UsuarioTrayectoria 
                        setWizard={setWizard} 
                        trayectorias={trayectorias} 
                        setTrayectorias={setTrayectorias}
                        usuario={usuario}
                        authReducer={authReducer} />
            }   
        </div>
    )
}
