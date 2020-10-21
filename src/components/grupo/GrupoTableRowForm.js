import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenAlt, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { commandFetch } from '../../helpers/commandFetch';
import { StatusCodes } from 'http-status-codes';
import { filterDropById } from '../../util/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingGrupos } from '../../actions/grupoAction';
import { HOST_URL_BACK, 
        API_GRUPOS, 
        METHOD_DELETE,
        TYPE_CARGO_GRUPO } from '../../util/constant';
import { messageLoadingSwal, 
        messageCloseSwal,
        messageSuccessSwal, 
        messageConfirmSwal } from '../../util/messages';
import { controlErrorFetch } from '../../helpers/controlErrorFetch';

export const GrupoTableRowForm = ({grupo, setGrupos, setGrupoActive}) => {

    const dispatch = useDispatch();
    const { authReducer }= useSelector( state => state);
    const history= useHistory();

    const handleSetGrupoActive = () => {
        setGrupoActive(grupo);
    };

    const handleDeleteGrupo = () => {
        messageConfirmSwal(`Quiere eliminar el grupo ${grupo.nombre}`, () =>{
            messageLoadingSwal();
            commandFetch(`${HOST_URL_BACK}${API_GRUPOS}/${grupo.id}`, METHOD_DELETE, undefined, authReducer?.token)
            .then(response => {
                if(response.status === StatusCodes.ACCEPTED){
                    setGrupos(grupos => filterDropById(grupos, grupo.id));
                    messageCloseSwal();
                    messageSuccessSwal("Grupo eliminado con exito");
                    dispatch(startLoadingGrupos());                              
                } else {
                    controlErrorFetch(response, dispatch);        
                }
            })
            .catch(error =>  {
                controlErrorFetch(error, dispatch);
            });
        });       
    }

    const handleGoCargos = () => {       
        history.replace(`/cargo/type/${TYPE_CARGO_GRUPO}/id/${grupo.id}`);   
    }


    return (
        <tr>
            <td>{grupo.nombre}</td>
            <td>{grupo.descripcion}</td>
            <td>
                <div className="row">
                    <div className="col-2" onClick={ handleSetGrupoActive } title="Editar"><FontAwesomeIcon icon={faPenAlt}/></div>
                    <div className="col-2" onClick={ handleDeleteGrupo } title="Eliminar"><FontAwesomeIcon icon={faTrash}/></div>
                    <div className="col-2" onClick={ handleGoCargos } title="Ver cargos"><FontAwesomeIcon icon={faTruckLoading}/></div>
                </div>
            </td>
        </tr>
    )
}

GrupoTableRowForm.prototype = {
    grupo : PropTypes.object.isRequired,
    setGrupos: PropTypes.func.isRequired,
    setGrupoActive: PropTypes.func.isRequired,
}
