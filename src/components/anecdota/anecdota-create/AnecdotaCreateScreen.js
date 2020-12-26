import React from 'react'
import { AnecdotaForm } from '../AnecdotaForm'

export const AnecdotaCreateScreen = () => {
    return (
        <div className="content animate__animated animate__slideInLeft">
            <h1>Anecdota</h1>
            <hr/>
            <AnecdotaForm anecdotaEdit={{}} edit={false} enlaces={[]} />
        </div>
    )
}
