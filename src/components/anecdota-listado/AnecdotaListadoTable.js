import React from 'react';
import Pagination from "react-js-pagination";
import { AnecdotaListadoTableRow } from './AnecdotaListadoTableRow';


export const AnecdotaListadoTable = ({page, setPage, totalItems, anecdotas}) => {
    
    const PAGE_SIZE = 6;

    const handlePageChange = (pageNumber) =>{
        setPage(pageNumber);
    }

    return (
        <div className="mt-3">
             <table className="table table-sm">
                <thead>
                    <tr className="background_libro_oro">
                        <th scope="col">Grupo</th>
                        <th scope="col">Rama</th>
                        <th scope="col">Seccion</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha Suceso</th>
                        <th scope="col">Usuario Registro</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Usuario Gestion</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       anecdotas && anecdotas.map(anecdota => 
                            <AnecdotaListadoTableRow key={anecdota.idAnecdota} anecdota={anecdota} />)
                    }
                </tbody>
            </table>
            <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={page}
                itemsCountPerPage={PAGE_SIZE}
                pageRangeDisplayed={PAGE_SIZE}
                totalItemsCount={totalItems}
                onChange={handlePageChange} />
        </div>
    )
}
