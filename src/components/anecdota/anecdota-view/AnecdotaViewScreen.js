import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnecdotaView } from './AnecdotaView';
import { useParams } from 'react-router-dom';
import { queryFetch } from '../../../helpers/queryFetch';
import { messageLoadingSwal, messageCloseSwal } from '../../../util/messages';
import { HOST_URL_BACK, API_ANECDOTA } from '../../../util/constant';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';

export const AnecdotaViewScreen = () => {

    const { idAnecdota }= useParams();
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const[anecdota, setAnecdota] = useState({});

    useEffect(() => {
        loadAnecdota();     
    }, []);

    const loadAnecdota = async() => {
        messageLoadingSwal();
        await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}/${idAnecdota}`, authReducer?.token)
            .then(data =>{
                messageCloseSwal();
                if(data != null && data != undefined ){
                    setAnecdota(data);
                }          
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Anecdota</h1>
            <hr/>
            <AnecdotaView anecdota={anecdota} authReducer={authReducer} />
        </div>
    )
}
