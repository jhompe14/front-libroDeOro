import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { filterDropById } from '../../../util/selectors';

export const UsuarioTrayectoriaTableRow = ({ trayectoria, setTrayectorias }) => {

    const handleDeleteTrayectoria = () => {
        setTrayectorias(trayectorias => filterDropById(trayectorias, trayectoria.id));
    }

    return (
        <tr>
            <td>{trayectoria.nombreGrupo}</td>
            <td>{trayectoria.nombreRama}</td>
            <td>{trayectoria.nombreSeccion}</td>
            <td>{trayectoria.nombreCargo}</td>
            <td>{trayectoria.anioIngreso}</td>
            <td>{trayectoria.anioRetiro}</td>
            <td>
                <div className="row">
                    <div onClick={handleDeleteTrayectoria} className="col-2" title="Eliminar"><FontAwesomeIcon icon={faTrash}/></div>
                </div>
            </td>
        </tr>
    )
}
