import React from 'react'

import { Link, NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark background_libro_oro">
            <Link 
                className="navbar-brand" 
                to="/">Libro de Oro Scouts</Link>            
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">                    
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Mestros
                        </a>
                        <div className="dropdown-menu background_libro_oro" aria-labelledby="navbarDropdownMenuLink">
                            <NavLink 
                                activeClassName="active"
                                className="nav-item nav-link" 
                                exact
                                to="grupo">
                                Grupos
                            </NavLink>
                            <NavLink 
                                activeClassName="active"
                                className="nav-item nav-link" 
                                exact
                                to="/rama">
                                Ramas
                            </NavLink>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">           

                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info"></span>

                    <button 
                        className="nav-item nav-link btn">
                        Cerrar Sesion
                    </button>
                </ul>
            </div>
        </nav>        
    )
}
