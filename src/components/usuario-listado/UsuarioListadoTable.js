import React from 'react'
import Pagination from "react-js-pagination";
import { UsuarioListadoTableRow } from './UsuarioListadoTableRow';

export const UsuarioListadoTable = ({page, setPage, totalItems, usuarios}) => {
    const PAGE_SIZE = 8;

    const handlePageChange = (pageNumber) =>{
        setPage(pageNumber);
    }

    return (
        <div className="mt-3">
             <table className="table table-sm">
                <thead>
                    <tr className="background_libro_oro">
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Tipo Integrante</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Telefono</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       usuarios && usuarios.map(usuario => 
                            <UsuarioListadoTableRow key={usuario.usuario} usuario={usuario} />)
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
