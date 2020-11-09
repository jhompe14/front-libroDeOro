import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnecdotaListadoTable } from './AnecdotaListadoTable';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { StatusCodes } from 'http-status-codes';
import { queryFetch } from '../../helpers/queryFetch';
import { HOST_URL_BACK, API_ANECDOTA } from '../../util/constant';
import { messageLoadingSwal, messageCloseSwal } from '../../util/messages';


export const AnecdotaListadoScreen = () => {
  
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);

    const[page, setPage] = useState(1);
    const[totalItems, setTotalItems] = useState(0);
    const[anecdotas, setAnecdotas] = useState([]);

    useEffect(() => {
      loadAnecdotas();
    }, [page]);


    const buildPathFilter = () =>{
      let path = `?usuarioOwner=${authReducer?.usuario}&typeUsuarioOwner=${authReducer?.tipoUsuario}&page=${page}`;
      return path;
    }

    const loadAnecdotas = async() => {
      messageLoadingSwal();
      await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}${buildPathFilter()}`, authReducer?.token)
            .then(resp => {
                if(resp.status === StatusCodes.OK){
                    return resp.json()
                }else{
                    return new Promise((resolve, reject) => reject({status: resp.status}));
                }
            })
            .then(data =>{
                messageCloseSwal();
                if(data.totalItems > 0){
                  setAnecdotas(data.dataGrid);
                  setTotalItems(data.totalItems);
                }          
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    };

    
    return (
      <div className="content animate__animated animate__slideInLeft">
        <h1>Listado de Anecdotas</h1>
        <hr/>
        <AnecdotaListadoTable 
            page={page}
            setPage={setPage} 
            totalItems={totalItems} 
            anecdotas={anecdotas}/>           
      </div>
    );
}
