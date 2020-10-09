import React, {useState} from 'react'
import { GrupoForm } from './GrupoForm'
import { GrupoTableForm } from './GrupoTableForm'

export const GrupoScreen = () => {

    const[grupos, setGrupos] = useState([]);
    const[grupoActive, setGrupoActive] = useState({});

    return (
        <div className="content">
            <h1>Grupos</h1>
            <hr/>
            <GrupoForm setGrupos = { setGrupos } grupoActive = { grupoActive } />
            <GrupoTableForm grupos = { grupos }  setGrupos = { setGrupos } setGrupoActive = { setGrupoActive } />
        </div>
    )
}
