import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const AnecdotaViewImages = ({ arrayImages, handleViewEnlace }) => {

    return (        
        arrayImages.map((image, index) => 
            <div className="col-4" style={{height: "110px", overflow: "hidden"}}>
                <div style={{width:"100%"}} align="center">
                    <FontAwesomeIcon icon={faEye} title={image.nombre} onClick={() => handleViewEnlace(image.url)}/>
                </div>
                <img key={index+"-img"} src={image.url} alt="imagen" style={{width:"100%", height: "auto"}}/>
            </div>
        )
    )
}
