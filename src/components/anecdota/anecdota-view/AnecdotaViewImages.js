import React from 'react';

export const AnecdotaViewImages = ({ arrayImages, handleViewEnlace }) => {

    return (
        <>
            <div className="row">  
                {      
                    arrayImages.map((image, index) => 
                        <div className="col-lg-4" style={{height: "110px", overflow: "hidden"}}>
                            <a href="#" onClick={() => handleViewEnlace(image.url)} className="thumbnail">
                                <img key={index+"-img"} src={image.url} alt="imagen" className="img-thumbnail" />
                            </a>
                        </div>
                    )
                }
            </div>
            <br></br>
        </>
    )
}
