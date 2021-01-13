import React from 'react'
import { UsuarioTrayectoriaTableRow } from './UsuarioTrayectoriaTableRow';

export const UsuarioTrayectoriaTable = ({ trayectorias, setTrayectorias }) => {
    return (
        <div className="mt-3">
            <table className="table table-sm">
                <thead>
                    <tr className="background_libro_oro">
                        <th scope="col">Grupo</th>
                        <th scope="col">Rama</th>
                        <th scope="col">Secci&oacute;n</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">A&ntilde;o Ingreso</th>
                        <th scope="col">A&ntilde;o Retiro</th>                        
                        <th scope="col">Retirar</th>
                    </tr>
                </thead>
                <tbody>
                {
                       trayectorias && trayectorias.map(trayectoria => 
                            <UsuarioTrayectoriaTableRow 
                                key={trayectoria.id} 
                                trayectoria={trayectoria} 
                                setTrayectorias={setTrayectorias} />)
                   }
                </tbody>
            </table>
        </div>
    )
}
