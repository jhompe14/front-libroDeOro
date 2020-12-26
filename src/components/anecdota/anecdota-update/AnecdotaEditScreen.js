import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { queryFetch } from '../../../helpers/queryFetch';
import { messageLoadingSwal, messageCloseSwal } from '../../../util/messages';
import { HOST_URL_BACK, API_ANECDOTA } from '../../../util/constant';
import { controlErrorFetch } from '../../../helpers/controlErrorFetch';
import { AnecdotaForm } from '../AnecdotaForm'
import { formatDateInput } from '../../../util/date';

export const AnecdotaEditScreen = () => {

    const { idAnecdota }= useParams();
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const[anecdota, setAnecdota] = useState();
    const[enlaces, setEnlaces] = useState();

    useEffect(() => {
        loadAnecdota();
        loadEnlacesAnecdota();     
    }, []);

    const loadAnecdota = async() => {
        messageLoadingSwal();
        await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}/${idAnecdota}`, authReducer?.token)
            .then(data =>{
                messageCloseSwal();
                if(data != null && data != undefined ){                    
                    setAnecdota(() => {
                        data.fecha = formatDateInput(data.fecha);
                        return data;
                    });
                }          
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    const loadEnlacesAnecdota = async() => {
        await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}/enlace/${idAnecdota}`, authReducer?.token)
            .then(data =>{
                if(data != null && data != undefined ){                    
                    setEnlaces(data); 
                }          
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    }

    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Modificar Anecdota</h1>
            <hr/>
            {
                anecdota != undefined &&  enlaces != null &&
                    <AnecdotaForm anecdotaEdit={anecdota} edit={true} enlaces={enlaces} setEnlaces={setEnlaces} />
            }            
        </div>
    )
}
