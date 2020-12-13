import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnecdotaListadoTable } from './AnecdotaListadoTable';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { queryFetch } from '../../helpers/queryFetch';
import { HOST_URL_BACK, API_ANECDOTA, TYPE_USUARIO_INTEGRANTE } from '../../util/constant';
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
      let path = `?page=${page}&usuarioOwner=${authReducer?.usuario}&typeUsuarioOwner=${authReducer?.tipoUsuario}`;

      if(filtros.idGrupo && filtros.idGrupo != 0)
            path+="&idGrupo="+filtros.idGrupo;
      if(filtros.idRama && filtros.idRama != 0) 
            path+="&idRama="+filtros.idRama;
      if(filtros.idSeccion && filtros.idSeccion != 0) 
            path+="&idSeccion="+filtros.idSeccion;
      if(filtros.fechaInicioAnecdota) 
            path+="&fechaInicioAnecdota="+filtros.fechaInicioAnecdota;
      if(filtros.fechaFinAnecdota)
            path+="&fechaFinAnecdota="+filtros.fechaFinAnecdota;
      if(filtros.estado && filtros.estado != 0) 
            path+="&estado="+filtros.estado;
      if(filtros.usuarioFilter)
            path+="&usuarioFilter="+filtros.usuarioFilter; 
      if(filtros.codigoAnecdota)
            path+="&codigoAnecdota="+filtros.codigoAnecdota;
                  
      return path;
    }

    const loadAnecdotas = async() => {
      messageLoadingSwal();
      await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}${buildPathFilter()}`, authReducer?.token)            
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
      <div className="animate__animated animate__slideInLeft">
        <h1>Listado de Anecdotas</h1>
        <hr/>

        <AnecdotaListadoFilter 
            setAplicacionFiltros={setAplicacionFiltros}
            setFiltros={setFiltros} 
            authReducer={authReducer} />

        <AnecdotaListadoTable 
            page={page}
            setPage={setPage} 
            totalItems={totalItems} 
            anecdotas={anecdotas}/>
                   
      </div>      
    );
}
