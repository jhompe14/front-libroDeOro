import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { RamaTableRowForm } from './RamaTableRowForm';

export const RamaTableForm = ({ramas, setRamas, setRamaActive}) => {

    const { ramaReducer } = useSelector( state => state);

    useEffect(() => {
        setRamas(ramaReducer?.ramas);
    }, [ramaReducer]);

    return (
        <div className="mt-3">
            <table className="table table-sm">
                <thead>
                    <tr className="background_libro_oro">
                        <th scope="col">Grupo</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Edad Minima</th>
                        <th scope="col">Edad Maxima</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       ramas && ramas.map(rama => 
                            <RamaTableRowForm key={rama.id} rama={rama} setRamas={setRamas} setRamaActive={setRamaActive} />)
                   }
                </tbody>
            </table>
        </div>
    )
}
