import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { SeccionTableRowForm } from './SeccionTableRowForm';

export const SeccionTableForm = ({ secciones, setSecciones, setSeccionActive }) => {
    
    const seccionReducer= useSelector( state => state)?.seccionReducer;

    useEffect(() => {
        setSecciones(seccionReducer?.secciones);
    }, [seccionReducer]);
    
    return (
        <div className="mt-3">
            <table className="table table-sm">
                <thead>
                    <tr className="background_libro_oro">
                        <th scope="col">Grupo</th>                        
                        <th scope="col">Rama</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       secciones && secciones.map(seccion => 
                            <SeccionTableRowForm 
                                key={seccion.id} 
                                seccion={seccion} 
                                setSecciones={setSecciones} 
                                setSeccionActive={setSeccionActive} />)
                   }
                </tbody>
            </table>
        </div>
    )
}
