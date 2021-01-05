import React from 'react';
import { AnecdotaLibroRow } from './AnecdotaLibroRow';
import Pagination from "react-js-pagination";

export const AnecdotaLibroScreen = () => {

    const handlePageChange = (pageNumber) =>{
        console.log(pageNumber)
    }

    return (
        <div className="animate__animated animate__slideInLeft">
            <h1>Libro de Oro</h1>
            <hr/>
            
            <AnecdotaLibroRow />

            <div className="row" style={{height: "15px"}}></div>

            <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={1}
                        itemsCountPerPage={6}
                        pageRangeDisplayed={6}
                        totalItemsCount={12}
                        onChange={handlePageChange} />

        </div>
    )
}
