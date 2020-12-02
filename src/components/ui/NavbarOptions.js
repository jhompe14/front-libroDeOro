import React from 'react';
import { NavLink } from 'react-router-dom';
import { TYPE_USUARIO_ADMINISTRADOR, TYPE_USUARIO_INTEGRANTE } from '../../util/constant';

export const NavbarOptions = ({authReducer}) => {
    return (
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                { 
                    authReducer.tipoUsuario === TYPE_USUARIO_ADMINISTRADOR &&                   
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Mestros
                            </a>
                            <div className="dropdown-menu background_libro_oro" aria-labelledby="navbarDropdownMenuLink">
                                <NavLink 
                                    activeClassName="active"
                                    className="nav-item nav-link" 
                                    exact
                                    to="/grupo">
                                        Grupos
                                </NavLink>
                                <NavLink 
                                    activeClassName="active"
                                    className="nav-item nav-link" 
                                    exact
                                    to="/rama">
                                        Ramas
                                </NavLink>
                                <NavLink 
                                    activeClassName="active"
                                    className="nav-item nav-link" 
                                    exact
                                    to="/seccion">
                                        Seccion
                                </NavLink>
                            </div>
                        </li>
                }

                {
                    authReducer.tipoUsuario === TYPE_USUARIO_INTEGRANTE &&
                    <>                   
                        <li className="nav-item dropdown">
                            <NavLink 
                                className="nav-item nav-link"
                                exact
                                to="/usuario-update">
                                   Usuario
                            </NavLink>
                        </li> 
                    </>                  
                }

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Administracion de Anecdotas
                    </a>
                    <div className="dropdown-menu background_libro_oro" aria-labelledby="navbarDropdownMenuLink">
                        {
                           authReducer.tipoUsuario === TYPE_USUARIO_INTEGRANTE &&
                           <NavLink 
                                activeClassName="active"
                                className="nav-item nav-link" 
                                exact
                                to="/anecdota/create">
                                    Creacion de Anecdotas
                            </NavLink>
                        }

                        <NavLink 
                            activeClassName="active"
                            className="nav-item nav-link" 
                            exact
                            to="/anecdota-listado">
                            Listado de Anecdotas
                        </NavLink>
                                                            
                    </div>
                </li>
            </ul>
        </div>
    )
}
