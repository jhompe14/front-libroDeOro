import React from 'react'

export const AboutScreen = () => {
    return (
        <div className="content animate__animated animate__slideInLeft">
            <div className="row m-5 justify-content-center align-items-center">
                <div className="col-6">
                    <h1>ACERCA DE</h1>
                    <br/>
                    <p>
                        Desarrollado por Jhon Edison Rivera Hincapie <br/>
                        Asesorado por Luis Fernando Gonzales Alvaran <br/>
                        en el POLITECNICO COLOMBIANO JAIME ISAZA CADAVID
                    </p>
                    <br/>
                    <p><a href="Manual de usuario.pdf" target="_blank">Manual de usuario</a></p>
                </div>
                <div className="col-6">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/eLAB7UMdymw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>               
            </div>
            <hr/>
            <img src="escudo_scouts.jpg" className="imagen_centrada_about" />           
        </div>
    )
}
