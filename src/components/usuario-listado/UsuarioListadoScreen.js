import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { queryFetch } from '../../helpers/queryFetch';
import { HOST_URL_BACK, API_USUARIOS } from '../../util/constant';
import { messageLoadingSwal, messageCloseSwal } from '../../util/messages';
import { UsuarioListadoFilter } from './UsuarioListadoFilter';
import { UsuarioListadoTable } from './UsuarioListadoTable';

export const UsuarioListadoScreen = () => {
    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);

    const[page, setPage] = useState(1);
    const[totalItems, setTotalItems] = useState(0);
    const[usuarios, setUsuarios] = useState([]);
    const[filtros, setFiltros] = useState({});
    const[aplicacionFiltros, setAplicacionFiltros] = useState(false);

    useEffect(() => {
        loadUsuarios();
    }, [page]);

    useEffect(() => {
      if(aplicacionFiltros){        
        loadUsuarios();
        setAplicacionFiltros(false);
      }      
    }, [aplicacionFiltros]);


    const buildPathFilter = () =>{
        let path = `?page=${page}`;
      
        if(filtros.usuario)
            path+="&usuario="+filtros.usuario; 
        if(filtros.nombres)
            path+="&nombres="+filtros.nombres;
        if(filtros.apellidos)
            path+="&apellidos="+filtros.apellidos;
                  
        return path;
    }

    const loadUsuarios = async() => {
      messageLoadingSwal();
      await queryFetch(`${HOST_URL_BACK}${API_USUARIOS}${buildPathFilter()}`, authReducer?.token)            
            .then(data =>{
                messageCloseSwal();
                setUsuarios(data.dataGrid);
                setTotalItems(data.totalItems);         
            })
            .catch(err => {            
                controlErrorFetch(err, dispatch);            
            });
    };

    
    return (
      <div className="animate__animated animate__slideInLeft">
        <h1>Listado de Usuarios</h1>
        <hr/>

        <UsuarioListadoFilter 
            setAplicacionFiltros={setAplicacionFiltros}
            setFiltros={setFiltros} />

        <UsuarioListadoTable 
            page={page}
            setPage={setPage} 
            totalItems={totalItems} 
            usuarios={usuarios}/>        
                   
      </div>      
    );
}
