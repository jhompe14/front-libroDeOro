import React, {useState, useEffect} from 'react';
import { TYPE_ENLACE_IMAGEN, TYPE_ENLACE_VIDEO } from '../../../util/constant';
import { AnecdotaViewImages } from './AnecdotaViewImages';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export const AnecdotaView = ({ anecdota, enlaces }) => {    

    const GROUP_IMAGES_ROW = 3;
    const[images, setImages] = useState([]);    

    useEffect(() => {
        setImagesView();
    }, []);

    const handleViewEnlace = (url) => window.open(url);
    const setImagesView = () => {
        if(enlaces && enlaces.length > 0){
            const arrayImages= enlaces.filter(element => element.tipoEnlace === TYPE_ENLACE_IMAGEN);
            const roundsImages = Math.ceil(arrayImages.length / GROUP_IMAGES_ROW);
            var indexInferior= 0;
            var auxMatrizImages = new Array();
            for (var i=0; i < roundsImages; i++){
                auxMatrizImages.push(arrayImages.slice(indexInferior, (indexInferior + GROUP_IMAGES_ROW)));
                indexInferior = indexInferior + GROUP_IMAGES_ROW;      
            }
            setImages(auxMatrizImages);
        }
    }

    return (
        <div className="content animate__animated animate__slideInLeft">
            <div className="form-group row">
                <div className="col-6">
                    <div className="form-group row">
                        <div className="col-4">
                            <label><b>Grupo</b></label>
                            <p>{anecdota.nombreGrupo}</p>
                        </div>
                        <div className="col-4">
                            <label><b>Rama</b></label>
                            <p>{anecdota.nombreRama}</p>
                        </div>
                        <div className="col-4">
                            <label><b>Secci&oacute;n</b></label>
                            <p>{anecdota.nombreSeccion}</p>
                        </div>                       
                    </div>
                    <div className="form-group row">
                        <div className="col-4">
                            <label><b>Estado</b></label>
                            <p>{anecdota.descripcionEstado}</p>
                        </div>
                        <div className="col-4">
                            <label><b>Fecha</b></label>
                            <p>{anecdota.fecha}</p>
                        </div>
                        <div className="col-4">
                            <label><b>Creada Por</b></label>
                            <p>{anecdota.usuario}</p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-12">
                            <label><b>Descripci&oacute;n</b></label>
                            <p style={{maxHeight: "10.3em", overflowY: "auto", whiteSpace: "pre-line" , textAlign: "justify"}}>
                                {anecdota.descripcion}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Im&aacute;genes</a>
                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Videos</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">                        
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className="col-12 mt-2" style={{maxHeight: "20.3em", overflowY: "auto"}}>                      
                                {
                                    images.length > 0 && images.map(arrayImages =>                                        
                                        <AnecdotaViewImages arrayImages={arrayImages} handleViewEnlace={handleViewEnlace} />  
                                    )
                                }
                            </div>
                        </div>

                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <div className="mt-2">
                                <ul className="list-group list-group-flush" style={{maxHeight: "20.3em", overflowY: "auto"}}>
                                    {
                                        enlaces && enlaces.length > 0 && 
                                        enlaces.filter(element => element.tipoEnlace === TYPE_ENLACE_VIDEO)
                                        .map((element, index) => 
                                            <li key={index+"-enlace-video"} className="list-group-item" 
                                                style={{fontSize: "1.1em", padding: ".40em 1.1em", lineHeight: "1.1em"}}>
                                                <div className="row">
                                                    <div className="col-10">{element.nombre}</div>                                                
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faEye} title="ver video" onClick={() => handleViewEnlace(element.url)}/>
                                                    </div>
                                                </div>
                                            </li>
                                        )                           
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
