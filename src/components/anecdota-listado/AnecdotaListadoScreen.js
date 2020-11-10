import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnecdotaListadoTable } from './AnecdotaListadoTable';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { StatusCodes } from 'http-status-codes';
import { queryFetch } from '../../helpers/queryFetch';
import { HOST_URL_BACK, API_ANECDOTA } from '../../util/constant';
import { messageLoadingSwal, messageCloseSwal } from '../../util/messages';
import { AnecdotaListadoFilter } from './AnecdotaListadoFilter';


export const AnecdotaListadoScreen = () => {
  
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);

    const[page, setPage] = useState(1);
    const[totalItems, setTotalItems] = useState(0);
    const[anecdotas, setAnecdotas] = useState([]);
    const[filtros, setFiltros] = useState({});
    const[aplicacionFiltros, setAplicacionFiltros] = useState(false);

    useEffect(() => {
      loadAnecdotas();
    }, [page]);

    useEffect(() => {
      if(aplicacionFiltros){        
        loadAnecdotas();
        setAplicacionFiltros(false);
      }      
    }, [aplicacionFiltros]);


    const buildPathFilter = () =>{
      let path = `?usuarioOwner=${authReducer?.usuario}&typeUsuarioOwner=${authReducer?.tipoUsuario}&page=${page}`;
      console.log(filtros);
      filtros.idGrupo &&
                  path.concat("&idGrupo="+filtros.idGrupo);
      filtros.idRama && 
                  path.concat("&idRama="+filtros.idRama);
      filtros.idSeccion && 
                  path.concat("&idSeccion="+filtros.idRama);
      filtros.fechaInicioAnecdota && 
                  path.concat("&fechaInicioAnecdota="+filtros.fechaInicioAnecdota);
      filtros.fechaFinAnecdota && 
                  path.concat("&fechaFinAnecdota="+filtros.fechaFinAnecdota);
      if(filtros.estado) 
        path+="&estado="+filtros.estado;
      filtros.usuarioFilter && 
                  path.concat("&usuarioFilter="+filtros.usuarioFilter); 
                  
      console.log(filtros.estado);
      console.log(path);

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
                setAnecdotas(data.dataGrid);
                setTotalItems(data.totalItems);         
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    };

    
    return (
      <div className="content animate__animated animate__slideInLeft">
        <h1>Listado de Anecdotas</h1>
        <hr/>

        <AnecdotaListadoFilter 
            setAplicacionFiltros={setAplicacionFiltros}
            setFiltros={setFiltros}/>

        <AnecdotaListadoTable 
            page={page}
            setPage={setPage} 
            totalItems={totalItems} 
            anecdotas={anecdotas}/>           
      </div>
    );
}
