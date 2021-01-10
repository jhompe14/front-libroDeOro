import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { useHistory } from "react-router-dom";
import { commandFetch, commandFetchFormData } from '../../helpers/commandFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatusCodes } from 'http-status-codes';
import { filterDropById, filterRamasByGrupo, filterSeccionesByRama } from '../../util/selectors';
import { faSave, faBackward, faCloudUploadAlt, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';
import { HOST_URL_BACK, 
    API_ANECDOTA, 
    METHOD_POST, 
    METHOD_PUT,
    METHOD_DELETE,
    TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION,
    SEPARATED_VIDEOS_ANECDOTA} from '../../util/constant';
import { messageLoadingSwal, 
    messageCloseSwal, 
    messageSuccessSwalWithFunction,
    messageConfirmSwal, 
    messageWarningSwal} from '../../util/messages';
import { formatDateCalendar } from '../../util/date';
import { isStringEmpty } from '../../util/general';

export const AnecdotaForm = ({ anecdotaEdit, edit, enlaces, setEnlaces }) => {

    const history= useHistory();
    const dispatch = useDispatch();
    const { grupoReducer:{grupos}, ramaReducer:{ramas}, 
                seccionReducer:{secciones}, authReducer:{usuario, token} } = useSelector( state => state);
                
    const[ramasFilter, setRamasFilter] = useState([]);
    const[seccionesFilter, setSeccionesFilter] = useState([]);
    const[attachedFiles, setAttachedFiles] = useState([]);
    const[videos, setVideos] = useState([]);

    const[formValues, handleInputChange] = useForm(anecdotaEdit);
    const[formVideos, handleInputVideosChange, _, resetVideos] = useForm({});  

    const goListadoAnecdotas = () => history.replace("/anecdota/listado");

    useEffect(() => {
        setRamasFilter(filterRamasByGrupo(ramas, formValues.idGrupo));
    }, [formValues.idGrupo]);

    useEffect(() => {
        setSeccionesFilter(filterSeccionesByRama(secciones, formValues.idRama));
    }, [formValues.idRama]);

    const handleSubmit = () => {       
        if(edit){
            if(formValues.estado == TYPE_ESTADO_ANECDOTA_PENDIENTE_MODIFICACION){
                messageConfirmSwal("Recuerde", `Al guardar los cambios la anecdota pasara a estado PENDIENTE APROBACI\u00D3N`, () =>{
                    updateAnecdota();
                });
            }else {
                updateAnecdota();
            }            
        }else{
            saveAnecdota();
        }       
    }

    const saveAnecdota = () => {
        messageLoadingSwal();
        const objSendAnecdota ={
            ...formValues,
            fecha: returnFechaFormValid(),
            usuario: usuario,
            videos: videosToString(),
        };
        
        commandFetchFormData(`${HOST_URL_BACK}${API_ANECDOTA}`, METHOD_POST, objSendAnecdota, attachedFiles, token)
        .then(response => {
            if(response.status === StatusCodes.CREATED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Anecdota creada exitosamente. La anecdota entra en estado PENDIENTE APROBACI\u00D3N", 
                    () => {
                        history.replace(`/anecdota/listado`);
                    });                    
                })                
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    const updateAnecdota = () => {
        messageLoadingSwal();
        const objSendAnecdota ={
            ...formValues,
            fecha: returnFechaFormValid(),
            videos: videosToString(),
        };
        commandFetchFormData(`${HOST_URL_BACK}${API_ANECDOTA}/${objSendAnecdota.id}`, METHOD_PUT, objSendAnecdota, attachedFiles, token)
        .then(response => {
            if(response.status === StatusCodes.ACCEPTED){
                response.json().then(() => {
                    messageCloseSwal();
                    messageSuccessSwalWithFunction("Anecdota modificada exitosamente.", 
                    () => {
                        history.replace(`/anecdota/listado`);
                    });                    
                })                
            } else {
                controlErrorFetch(response, dispatch);                
            }
        })
        .catch(error =>  {
            controlErrorFetch(error, dispatch);
        });
    }

    const returnFechaFormValid = () => {
        const fecha = formatDateCalendar(formValues.fecha);
        return fecha != undefined ? fecha : "";
    }

    //Selects
    const getSelectedGrupo = (grupoId) =>  formValues && formValues.idGrupo === grupoId ? 'selected': '';
    const getSelectedRama = (ramaId) => formValues && formValues.idRama === ramaId ? 'selected': '';
    const getSelectedSeccion = (seccionId) => formValues && formValues.idSeccion === seccionId ? 'selected': '';

    //Files    
    const activeNavImages = edit ? "": "active";
    const showActiveNavImages = edit ? "": "show active";
    const ariaSelectedNavImages = edit ? "false": "true";
    const handleFileChange = (e) => setAttachedFiles(e.target.files);    
    const handleAttachedFiles = () => {
        messageConfirmSwal("Recuerde", 
        "Que los archivos adjuntos solo se subir\u00E1n cuando guarde la informaci\u00F3n de la an\u00E9cdota", () =>{
            document.querySelector("#attachedFiles").click();
        });        
    }

    //Videos
    const removeVideo = (idVideo) => setVideos(videos => filterDropById(videos, idVideo)); 
    const addVideo = () => {
        if(!isStringEmpty(formVideos.nombreVideo) && !isStringEmpty(formVideos.urlVideo)){
            setVideos([...videos, {
                id: (videos.length + 1),
                nombreVideo: formVideos.nombreVideo.replaceAll(SEPARATED_VIDEOS_ANECDOTA, ""),
                urlVideo: formVideos.urlVideo.replaceAll(SEPARATED_VIDEOS_ANECDOTA, ""),
            }]);
            
            resetVideos({
                id: 0,
                nombreVideo: "",
                urlVideo: "",
            });

        }else {
            messageWarningSwal("El nombre y la url del video deben ser diligenciados");
        }        
    }
    
    //General Enlaces
    const handleViewEnlace = (url) => window.open(url);
    const videosToString = () => videos.map(video => video.nombreVideo+SEPARATED_VIDEOS_ANECDOTA+video.urlVideo);
    const handleDeleteEnlace = (enlace) => {
        messageConfirmSwal("¿Esta seguro?", 
        `Que desea eliminar el adjunto ${enlace.nombre}, recuerde que al aceptar la transacci\u00F3n se eliminara definitivamente de la an\u00E9cdota` , () =>{
            messageLoadingSwal();
            commandFetch(`${HOST_URL_BACK}${API_ANECDOTA}/enlace/${enlace.id}`, METHOD_DELETE, undefined, token)
            .then(response => {
                messageCloseSwal();
                if(response.status === StatusCodes.ACCEPTED){
                    messageSuccessSwalWithFunction("Adjunto eliminado correctamente.", 
                    () => {
                        setEnlaces(enlaces => filterDropById(enlaces, enlace.id));                           
                    });                    
                } else {
                    controlErrorFetch(response, dispatch);        
                }
            })
            .catch(error =>  {
                controlErrorFetch(error, dispatch);
            });
        });
    }
    
    return (
        <>
            <div className="form-group row">
                <div className="col-4">
                    <div>
                        <label>Grupo</label>
                        <select
                            name="idGrupo"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0" selected={getSelectedGrupo(0)}>Seleccione un grupo</option>
                            {                                
                                grupos && grupos.map(grupo => 
                                    <option key={grupo.id} 
                                            value={grupo.id}
                                            selected={getSelectedGrupo(grupo.id)}>
                                            {grupo.nombre}
                                    </option>)
                            }        
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div>               
                        <label>Rama</label>
                        <select                            
                            name="idRama"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0" selected={getSelectedRama(0)}>Seleccione una rama</option>
                            {                                
                                ramasFilter && ramasFilter.map(rama => 
                                                            <option key={rama.id} 
                                                                    value={rama.id} 
                                                                    selected={getSelectedRama(rama.id)}>
                                                                    {rama.nombre}
                                                            </option>)
                            }        
                        </select>
                    </div>
                </div>
                <div className="col-4">
                    <div>               
                        <label>Seccion</label>
                        <select                            
                            name="idSeccion"  
                            className="form-control"
                            onChange={handleInputChange}>
                            <option value="0" selected={getSelectedSeccion(0)}>Seleccione una seccion</option>
                            {                                
                                seccionesFilter && seccionesFilter.map(seccion => 
                                                        <option key={seccion.id} 
                                                                value={seccion.id} 
                                                                selected={getSelectedSeccion(seccion.id)}>
                                                                {seccion.nombre}
                                                        </option>)
                            }        
                        </select>
                    </div>
                </div>            
            </div>
            <div className="form-group row">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <label>Nombre</label> 
                            <input 
                                type="text" 
                                name="nombre" 
                                className="form-control"
                                value= {formValues.nombre} 
                                onChange={handleInputChange}/>
                        </div>
                        <div className="col-6">
                            <label>Fecha</label> 
                            <input 
                                type="date" 
                                name="fecha" 
                                className="form-control"
                                value= {formValues.fecha} 
                                onChange={handleInputChange}/>
                        </div>                        
                    </div> 

                    <label>Descripcion</label>  
                    <textarea 
                        name="descripcion" 
                        className="form-control"
                        rows="6" 
                        value={formValues.descripcion}
                        onChange={handleInputChange}/>
                </div>

                <div className="col-6">
                    <nav className="mt-2">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            {
                                edit && 
                                <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Enlaces Cargados</a>
                            }
                            <a className={"nav-item nav-link "+activeNavImages} id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected={ariaSelectedNavImages}>Cargar Imagenes</a>
                            <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Cargar Videos</a>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        {
                            edit && 
                            <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <div className="mt-2">
                                    <div>                     
                                        <ul className="list-group list-group-flush" style={{maxHeight: "13.3em", overflowY: "auto"}}>
                                        {
                                            enlaces && enlaces.length > 0 && enlaces.map((element, index) => 
                                                <li key={index+"-enlace"} className="list-group-item" 
                                                    style={{fontSize: "1.1em", 
                                                            padding: ".40em 1.1em",
                                                            lineHeight: "1.1em"}}>
                                                    <div className="row">
                                                        <div className="col-10">{element.nombre}</div>                                                
                                                        <div className="col-2">
                                                            <FontAwesomeIcon icon={faEye} title="ver enlace" onClick={() => handleViewEnlace(element.url)}/>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                                            <FontAwesomeIcon icon={faTrash} title="eliminar enlace" onClick={() => handleDeleteEnlace(element)}/></div>
                                                    </div>
                                                </li>
                                            )                           
                                        }
                                        </ul>
                                    </div>   
                                </div>
                            </div>
                        }
                        
                        <div className={"tab-pane fade "+showActiveNavImages} id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                            <button type="button" onClick={handleAttachedFiles} className="btn btn-success mt-2"><FontAwesomeIcon icon={faCloudUploadAlt}/>&nbsp;&nbsp;Adjuntos</button> 
                            <input type="file" onChange={handleFileChange} id="attachedFiles" name="attachedFiles" accept="image/x-png,image/jpeg,image/jpg" style={{display:'none'}} multiple/>                    
                            <div className="mt-2">                        
                                <ul className="list-group list-group-flush" style={{maxHeight: "9.3em", overflowY: "auto"}}>
                                {
                                    attachedFiles && attachedFiles.length > 0 && Array.from(attachedFiles).map((element, index) => 
                                        <li key={index+"-attached-image"} className="list-group-item" 
                                            style={{fontSize: "1.1em", 
                                                    padding: ".40em 1.1em",
                                                    lineHeight: "1.1em"}}>{element.name}</li>
                                    )                           
                                }
                                </ul>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                            <div className="mt-2">
                                <div className="form-group row">
                                    <div className="col-4">
                                        <input 
                                            type="text" 
                                            placeholder="Nombre" 
                                            className="form-control" 
                                            name="nombreVideo"
                                            value={formVideos.nombreVideo}
                                            onChange={handleInputVideosChange}/>
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon3">http</span>
                                            </div>
                                            <input 
                                                type="text" 
                                                placeholder="URL" 
                                                className="form-control" 
                                                name="urlVideo"
                                                value={formVideos.urlVideo}
                                                onChange={handleInputVideosChange}/>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <button type="button" onClick={addVideo} className="btn btn-success"><FontAwesomeIcon icon={faPlus}/></button>
                                    </div>
                                </div>
                                <div>                        
                                    <ul className="list-group list-group-flush" style={{maxHeight: "9.3em", overflowY: "auto"}}>
                                    {
                                        videos && videos.length > 0 && videos.map((element, index) => 
                                            <li key={index+"-videos"} className="list-group-item"
                                                style={{fontSize: "1.1em", 
                                                    padding: ".40em 1.1em",
                                                    lineHeight: "1.1em"}}>
                                                <div className="row">
                                                    <div className="col-10">{element.nombreVideo}</div>                                                
                                                    <div className="col-2">
                                                        <FontAwesomeIcon icon={faEye} title="ver video" onClick={() => handleViewEnlace(element.urlVideo)}/>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                        <FontAwesomeIcon icon={faTrash} title="eliminar video" onClick={() => removeVideo(element.id)}/></div>
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
            <div className="mt-2">
                {
                    edit &&
                    <button onClick={goListadoAnecdotas} className="btn btn-primary"><FontAwesomeIcon icon={faBackward}/>&nbsp;&nbsp;Anecdotas</button>
                }
                &nbsp;&nbsp;&nbsp;
                <button onClick={handleSubmit} className="btn btn-primary"><FontAwesomeIcon icon={faSave}/>&nbsp;&nbsp;Guardar</button>                
            </div>
        </>
    )
}
