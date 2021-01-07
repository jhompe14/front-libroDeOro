import React, {useState, useEffect} from 'react';
import Pagination from "react-js-pagination";
import { useSelector, useDispatch } from 'react-redux';
import { AnecdotaLibroRow } from './AnecdotaLibroRow';
import { HOST_URL_BACK, API_ANECDOTA } from '../../util/constant';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { queryFetch } from '../../helpers/queryFetch';
import { messageLoadingSwal, messageCloseSwal } from '../../util/messages';

export const AnecdotaLibroScreen = () => {

    const PAGE_SIZE_CATALOG = 8;
    const GROUP_ANECDOTAS_ROW = 4;

    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);

    const[page, setPage] = useState(1);
    const[totalItems, setTotalItems] = useState(0);
    const[anecdotas, setAnecdotas] = useState([]);

    useEffect(() => {
        loadCatalogAnecdotas();
    }, [page]);

    const loadCatalogAnecdotas = async() => {
        messageLoadingSwal();
        await queryFetch(`${HOST_URL_BACK}${API_ANECDOTA}/catalog?usuario=${authReducer?.usuario}&page=${page}`, authReducer?.token)            
                .then(data =>{
                    messageCloseSwal();
                    setAnecdotasGroup(data.dataGrid);
                    setTotalItems(data.totalItems);         
                })
                .catch(err => {            
                    controlErrorFetch(err, dispatch);            
                });
    }

    const setAnecdotasGroup = (dataGrid) =>{
        if(dataGrid && dataGrid.length > 0){
            const roundsAnecdotas = Math.ceil(dataGrid.length / GROUP_ANECDOTAS_ROW);
            var indexInferior= 0;
            var auxMatrizAnecdotas = new Array();
            for (var i=0; i < roundsAnecdotas; i++){
                auxMatrizAnecdotas.push(dataGrid.slice(indexInferior, (indexInferior + GROUP_ANECDOTAS_ROW)));
                indexInferior = indexInferior + GROUP_ANECDOTAS_ROW;      
            }
            setAnecdotas(auxMatrizAnecdotas);
        }
    }

    const handlePageChange = (pageNumber) =>{
        console.log(pageNumber)
    }

    return (
        <div className="animate__animated animate__slideInLeft">
            <h1>Libro de Oro</h1>
            <hr/>

            {
                anecdotas.length > 0 && anecdotas.map((arrayAnecdotas, index) =>
                    <AnecdotaLibroRow key={index+"-row-anecdota"} arrayAnecdotas = {arrayAnecdotas} />
                )
            }            

            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={page}
                itemsCountPerPage={PAGE_SIZE_CATALOG}
                pageRangeDisplayed={PAGE_SIZE_CATALOG}
                totalItemsCount={totalItems}
                onChange={handlePageChange} />

        </div>
    )
}
