import React from 'react'

export const AnecdotaLibroRow = ({arrayAnecdotas}) => {
    return (

        arrayAnecdotas.map(anecdota => 
            <div class="col-sm-4">
                <div class="card">
                    <div class="card-header">
                        {
                            anecdota.nombreSuceso != undefined && anecdota.nombreSuceso != null ?
                                anecdota.nombreSuceso : "Anecdota"
                        }
                        <footer class="blockquote-footer">
                            {anecdota.nombreUsuario} ({anecdota.usuario}) 
                            {
                              anecdota.fechaSuceso != "" &&
                              <cite title="Source Title"> - {anecdota.fechaSuceso}</cite>  
                            } 
                        </footer>
                    </div>
                    <div class="card-body">
                        <p>{anecdota.descripcionSuceso}</p>
                        <footer class="blockquote-footer">Codigo Anecdota: {anecdota.idAnecdota}</footer>
                    </div>
                </div>
            </div>
        ) 
         
    )
}
