import React from 'react'

export const AnecdotaLibroRow = ({arrayAnecdotas}) => {
    return (
        <>
            <div className="row">
                {
                    arrayAnecdotas.map((anecdota, index) => 
                        <div key={ index+"-anecdota-card" } className="col-sm-3">
                            <div className="card h-100">
                                <div className="card-header">
                                    {
                                        anecdota.nombreSuceso != "" ? anecdota.nombreSuceso : "Anecdota"
                                    }
                                    <footer className="blockquote-footer">Codigo Anecdota: {anecdota.idAnecdota}</footer>
                                </div>
                                <div className="card-body" style={{height: "20.3em"}}>                                    
                                    <div className="h-75 text-justify text-truncate" style={{whiteSpace: "pre-line"}}>
                                        {anecdota.descripcionSuceso}
                                    </div>
                                    <br></br>
                                    <footer className="blockquote-footer">
                                        {anecdota.nombreUsuario} ({anecdota.usuario}) 
                                        {
                                        anecdota.fechaSuceso != "" &&
                                        <cite title="Source Title"> - {anecdota.fechaSuceso}</cite>  
                                        } 
                                    </footer>

                                </div>
                            </div>
                        </div>
                    )
                } 
            </div>
            <br></br>
        </>
         
    )
}
