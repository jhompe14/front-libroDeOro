import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StatusCodes } from 'http-status-codes';
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
            .then(resp => {
                if(resp.status != StatusCodes.OK){
                    return new Promise((resolve, reject) => reject({status: resp.status}));
                }
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    return (
        <div>
        </div>
    )
}
