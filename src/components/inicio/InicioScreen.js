import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HOST_URL_BACK, API_AUTH } from '../../util/constant';
import { queryFetch } from '../../helpers/queryFetch';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';

export const InicioScreen = () => {

    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);

    useEffect(() => {
        pingAuth();
    }, []);

    const pingAuth = async() => {
        await queryFetch(`${HOST_URL_BACK}${API_AUTH}`, authReducer?.token)
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    return (
        
        <img src="escudo_scouts.jpg" className="imagen_centrada"/>
        
    )
}
